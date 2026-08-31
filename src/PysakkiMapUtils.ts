import type { Position, Feature, GeoJsonProperties, LineString } from 'geojson';
import * as turf from '@turf/turf'
import { PysakkiSettings } from './PysakkiSettings';
import type { MapRef, LngLatBoundsLike } from '@vis.gl/react-maplibre';
// @ts-expect-error - no types
import polyline from '@mapbox/polyline'

import { useState, useEffect } from 'react';

import type { FeatureCollection } from 'geojson';
import { type QueryParentQuery$data } from './__generated__/QueryParentQuery.graphql';

const viewAreaoffsetInKms = PysakkiSettings.distanceFromStop // arbitrary number in kilometers to clamp longer routes into

export const filterOutsideViewArea = (coords: Position, startingPoint: Position): Boolean => {

    const bbox = turf.bbox( turf.buffer( turf.point( startingPoint ), viewAreaoffsetInKms)! )
    const viewAreaBounds = turf.bboxPolygon( bbox );

    const stop = turf.point([coords[0], coords[1]])
    
    return turf.booleanContains(viewAreaBounds, stop)
}

export const clampedToViewArea = (coords: Position): {
    value: number;
    outside?: boolean;
}[] => {
    if(!coords) return [{value: 0,}, {value: 0}]
    return [{value: coords[0]}, {value: coords[1]}]
} 

const proximityOfPoints = (p1: Position, p2: Position, threshold: number): Boolean => {
    return Math.floor( p1[0]*threshold ) == Math.floor( p2[0]*threshold ) && Math.floor( p1[1]*threshold ) == Math.floor( p2[1]*threshold )
} 
export type Stop = {
    readonly geometries: {
        readonly geoJson: {
            readonly type: "Point",
            readonly coordinates: Position
        }
    }
}

export type RouteGeometry = {
    shortName: string, 
    geojson: Feature,
    stops: Position[]  
}
export type EndPointCoordinate = {
    labels: string[],
    coords: Position,
    properties?: GeoJsonProperties
}

// same kind of function declared twice for two different applications,
// maybe some day abstract into one core function with different overloads
// other one deals with a singe geojson feature, other one with array of points
export const clampRouteStopsFromStop = (stops: Stop[], startingPoint: Position): Stop[] => {
    // i seriously couldn't figure out a better way

    const routeStopsFromStop: Stop[] = []

    for(const stop of stops.toReversed())
    {
        // if outside specific area, discard and mark geometry as cropped
        if(!filterOutsideViewArea(stop.geometries.geoJson.coordinates, startingPoint)) {
            continue;
        }
        routeStopsFromStop.push(stop)
        if(proximityOfPoints(stop.geometries.geoJson.coordinates, startingPoint, 490 /* completely arbitrary number but only this really does the thing*/)) break;
    }
    return routeStopsFromStop.toReversed()
}

export const clampCoordsFromStop = (route: Feature<LineString, GeoJsonProperties>, startingPoint: Position): Feature<LineString, GeoJsonProperties> => {

    // travel on geojson linestring route until stop coords are reached
    // i seriously couldn't figure out a better way
    const routeFromStop: Position[] = []
    let isCropped = false;

    for(const point of route.geometry.coordinates.toReversed())
    {
        // if outside specific area, discard and mark geometry as cropped
        if(!filterOutsideViewArea(point, startingPoint)) {
            isCropped = true;
            continue;
        }
        routeFromStop.push(point)
        if(proximityOfPoints(point, startingPoint, 490 /* completely arbitrary number but only this really does the thing*/)) break;
    }
    /// ////


    return {
        ...route,
        geometry: {      
            ...route.geometry!,
            coordinates: routeFromStop.toReversed(),
        },
        properties: {
            ...route.properties,
            isCropped: isCropped,
        }
    };
}
let nominalStyleIndex = 0;

// @ts-expect-error // unused for bw screen
const xx_routeNominalColorPalette: string[] = [
'#fff7ec',
'#fee8c8',
'#fdd49e',
'#fdbb84',
'#fc8d59',
'#ef6548',
'#d7301f',
'#b30000',
'#7f0000']

// @ts-expect-error unused color palette for visual route separation
const x_routeNominalColorPalette: string[] = [
"rgba(141, 211, 199, 0.4)",
"rgba(255, 255, 179, 0.4)",
"rgba(190, 186, 218, 0.4)",
"rgba(251, 128, 114, 0.4)",
"rgba(128, 177, 211, 0.4)",
"rgba(253, 180, 98, 0.4)",
"rgba(179, 222, 105, 0.4)",
"rgba(252, 205, 229, 0.4)",
"rgba(217, 217, 217, 0.4)",
"rgba(188, 128, 189, 0.4)",
"rgba(204, 235, 197, 0.4)",
"rgba(255, 237, 111, 0.4)"
]

const routeNominalStyle: {color: string, width: number}[] = [
{
    color: "rgb(0, 0, 0)",
    width: 1,
},
{
    color: "rgb(139, 139, 139)",
    width: 3,
}
]

export const getNextNominalColor = (): {
    color: string,
    index: number,
    width: number,
} => {
    nominalStyleIndex = nominalStyleIndex+1 >= routeNominalStyle.length ? 0 : nominalStyleIndex + 1;

    return {
        color: routeNominalStyle[nominalStyleIndex].color,
        width: routeNominalStyle[nominalStyleIndex].width,
        index: nominalStyleIndex,
    };
}

export const updateMapBounds = (mapRef: MapRef, routeGeometries: RouteGeometry[], endPointCoordinates: Map<string, EndPointCoordinate>, stopPosition: Feature ): void => {
  
    if(!routeGeometries) return
    if(!mapRef) return

    const marginAroundFeature = 0.015 // arbitrary number to create space around the outmost end stop marker so it won't be cropped
    // bbox object from routes
    const routeBounds = turf.bbox(turf.lineString([
      ...routeGeometries.reduce<Position[]>((rglist, rg) => {rglist.push(...(rg.geojson.geometry as LineString).coordinates);return rglist}, []),
      ...Array.from( endPointCoordinates ).flatMap(([, value]) => {return value.properties!.isCropped ? [[value.coords[1], value.coords[0]], [value.coords[1], value.coords[0]]] : [[value.coords[1], value.coords[0]], [value.coords[1], value.coords[0]+marginAroundFeature]]}),
    ]))
    // bbox from stop coords with 2km buffer around it
    const stopBounds = turf.bbox(turf.buffer(( stopPosition /*data!.stop!.geometries!.geoJson!*/), 2, {steps: 8, units: "kilometers"})!)

    /// combine these into one bbox to which map will be zoomed
    const displayedBounds = turf.bbox(turf.combine(turf.featureCollection([turf.bboxPolygon(stopBounds), turf.bboxPolygon(routeBounds)])))

    /*mapRefState*/ 
    mapRef.fitBounds(displayedBounds as LngLatBoundsLike, {linear: true, animate: false} )
}


// create an object/map key from rounded coords
// so overlapping/nearby coords are grouped under same key
export const roundedCoordsAsKey = ([lng, lat]: Position): string => `${Math.ceil( lng*100 )}${Math.ceil( lat*100 )}`

// @ts-ignore -- unused at the moment
export const GeoJSONfromPolylines = (polylineString: string): Feature => {
    const { color, width, index } = getNextNominalColor()

    const FeatureObj: Feature = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: [
            ...polyline.decode(polylineString)
            .map((( [lat, lon]: [number,number] ) => ( [lon, lat] ) 
            /* lat/lng needs to be flipped or LSL will be driving around Pakistan*/)) 
            ],
        },
        properties: {
        routeIndex: index,
        routeColor: color,
        routeLineWidth: width,
        }
    }

    return FeatureObj;
} 
export const useRouteData = (queryData: QueryParentQuery$data) => {
    const [routeDataState, setRouteDataState] = useState<FeatureCollection>();
    const [routeGeometriesState, setRouteGeometriesState] = useState<RouteGeometry[]>()
    useEffect(() => {
        const routePaths: RouteGeometry[] = [];
        const routeData: FeatureCollection = {
            type: 'FeatureCollection',
            features: [], 
        }
        if(queryData!.stop!.maprows!) queryData.stop?.maprows.forEach(route => {
 
        const { color, width, index } = getNextNominalColor()
                
        const routeStops: Position[] = clampRouteStopsFromStop((route!.trip!.stops! as Stop[]), queryData.stop!.geometries?.geoJson.coordinates)
        .map(stop => [stop.geometries?.geoJson.coordinates[1], stop.geometries?.geoJson.coordinates[0]]) // flip lat/lng, otherwise stops exist somewhere over Pakistan
        
        routePaths.push( {
            shortName: (route!.trip?.routeShortName as string),
            geojson: clampCoordsFromStop({
            type: 'Feature',
            geometry: { 
                type: 'LineString',
                coordinates: [...(route!.trip!.geometry! as Position[])],
            },
            properties: {
                routeIndex: index,
                routeColor: color,
                routeLineWidth: width,
            }
            }, queryData.stop!.geometries?.geoJson.coordinates),
            stops: routeStops
        })

        routePaths.forEach((routeGeometry) => {
            routeData.features.push(routeGeometry.geojson)
        })

            setRouteDataState(routeData)
            setRouteGeometriesState(routePaths)
        }
    )
    }, [queryData])

    return {routeDataState, routeGeometriesState};
}