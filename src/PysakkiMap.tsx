import { 
  Map as MapLibreMap,
  Marker,
  Source,
  Layer,
  useMap,
  type MapRef,
  type LayerProps,
  type StyleSpecification,
  type LngLatBoundsLike
} from '@vis.gl/react-maplibre';

import * as turf from '@turf/turf'

import 'maplibre-gl/dist/maplibre-gl.css'; // See notes below
import mapstyle from "./Map/pysakki_mapstyle.json"

import { clampedToViewArea, getNextNominalColor, clampCoordsFromStop, clampRouteStopsFromStop, type Stop } from './PysakkiMapUtils'

import { PysakkiSettings } from './PysakkiSettings';
import RentalsMarkers from './RentalsMarkers'
import {
  SubscribeToRoutePositions,
  UnSubscribeAll,
  VehiclePositionsWS 
} from './VehiclePositions'

import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import PysakkiMapStyle from './PysakkiMap.module.css'

import pieniBussi from "./assets/bussi.svg"
import phks from './assets/PHKS.svg'

// @ts-expect-error - no types
import polyline from '@mapbox/polyline'

import type {
  Feature,
  FeatureCollection,
  LineString,
  Position,
  GeoJsonProperties,
  Geometry,
} from 'geojson';

import { type ReactElement, useEffect, useState } from 'react';

import type { QueryParentQuery$data } from './__generated__/QueryParentQuery.graphql';

const MapUnavailable = () => {
  return (
    <div className="mapContainer error">
      <h1>Stop not found</h1>
    </div>    
  )
}

const VehicleMarkersLayer = ({ vehiclePositions }: { vehiclePositions: VehiclePositionItem[] }) => {
  const { current: map } = useMap();

  const [mapBearing, setMapBearing] = useState(0);

  useEffect(() => {
    if (!map) return;
    
    const updateViewState = () => {
      setMapBearing(map.getBearing());
    };

    // Initialize
    updateViewState();

    // Only this tiny component updates on map movement
    map.on('zoom', updateViewState);
    map.on('rotate', updateViewState);

    return () => {
      map.off('zoom', updateViewState);
      map.off('rotate', updateViewState);
    };
  }, [map]);

  return (
    <>
      {vehiclePositions.map((vehicleposition, idx) => (
        <Marker key={`vehicle-${idx}`} latitude={vehicleposition.position[0]} longitude={vehicleposition.position[1]}>
          <div className={PysakkiMapStyle.vehicle}>
            <div className={PysakkiMapStyle.bussi}>
              <img 
                src={pieniBussi} 
                alt="Bussi" 
                className={vehicleposition.bearing - 180 < mapBearing ? "" : PysakkiMapStyle.flipped}
              />
            </div>
            <div className={PysakkiMapStyle.vehicleLabel}>
              {routeIdToShortName.hasOwnProperty( vehicleposition.routeId ) ? routeIdToShortName[vehicleposition.routeId] : "?"}
            </div>
          </div>
        </Marker>
      ))}
    </>
  );
};

const poisGeoJson: FeatureCollection<Geometry, GeoJsonProperties> = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: { title: 'Hello MapLibre' },
        geometry: { type: 'Point', coordinates: [25,50] },
      }]
}

// how often render fresh realtime position
let realtimeRenderCooldown = PysakkiSettings.refreshRateSec // 30 seconds
let lastRealtimeRender = 0

type VehiclePositionItem = {
    position: [number, number];
    bearing: number;
    routeId: string;
}

const layerStyle: LayerProps = {
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
        'line-join': 'round',
        'line-cap': 'round'
    },
    paint: {
        'line-color': ["get", "routeColor"],
        'line-width': ["get", "routeLineWidth"],
        "line-offset": ["*", ["get", "routeIndex"], 2]
    }
};
const PoiLayerStyle: LayerProps = {
    id: 'pois',
    type: 'symbol',
    source: 'pois',
    layout: {
      'text-field': ['get', 'title'],
      'text-font': ["Barlow Semi Condensed"]
    }

    
};

  let routeEndStopMarkers: ReactElement[] = []

  // rounded coords as a key to group overlapping/nearby coords
  let endPointCoordinates = new Map<string, {labels: string[], coords: Position, properties?: GeoJsonProperties}>()
  let VehiclePositionsData = {} as {[vId: number]: VehiclePositionItem}

  // no "shortName" (eg. '1K', '23' etc) available in position data
  // only routeId, so let's map them together into a lookup table
  const routeIdToShortName: {
    [routeId: string]: string
  } = {} 

  type RouteGeometry = {
    shortName: string, 
    geojson: Feature,
    stops: Position[]  
  }

  type Props = {
    queryData: QueryParentQuery$data | null | undefined;
  }
export default function PysakkiMap({queryData}: Props) {

  // state definitions 
  const [VehiclePositionsState, setVehiclePositionsState] = useState<VehiclePositionItem[]>([]);
  const [routeStopsPosState, setRouteStopsPosState] = useState<Position[]>([])
  const [mapRefState, setMapRef] = useState<MapRef | null>();
  const [mapGeoJsonDataState, setMapGeoJsonDataState] = useState<FeatureCollection>({  
    type: 'FeatureCollection',
    features: []
  })

  const routeGeometries: RouteGeometry[] = []

  const mapGeoJsonData: FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  }
  
  if(!queryData) return <MapUnavailable />

  const data = queryData

  // if stop doesn't exist
  if( !data || !data.stop ) return MapUnavailable()

  // haetaan 2 seuraavaa lähtöä ja kirjataan ne taulukkoon
  const routeDirectionIdsFromThisStop = {} as {[shortName: string]: number}
  
  if(data!.stop!.maprows!) data!.stop!.maprows.forEach(
    stop => routeDirectionIdsFromThisStop[(stop!.trip!.routeShortName! as string)] = stop?.trip!.directionId!
  )
  useEffect(() => {
    VehiclePositionsWS(
      PositionMessageCallback
    )
  }, [])

  useEffect(() => {
    
    if(data!.stop!.maprows) data.stop?.maprows.forEach(route => 
    {
        
        const { color, width, index } = getNextNominalColor()

        const routeStops: Position[] = clampRouteStopsFromStop((route!.trip!.stops! as Stop[]), data.stop!.geometries?.geoJson.coordinates)
        .map(stop => [stop.geometries?.geoJson.coordinates[1], stop.geometries?.geoJson.coordinates[0]]) // flip lat/lng, otherwise stops exist somewhere over Pakistan

        routeGeometries.push( {
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
          }, data.stop!.geometries?.geoJson.coordinates),
          stops: routeStops
        })

        const routeId: string = route!.trip!.route!.gtfsId.split(":")[1]
        // lookup for position data to get shortname (eg. "1K", not available in pos. data) via route id
        Object.assign(routeIdToShortName, {
          [routeId]: route!.trip!.routeShortName,
        })

        // push routes associated to this stop to mqtt topics to listen position
        VehiclePositionsData = {};
        // un-listen other routes (if present)
        UnSubscribeAll();

        // only subscribe if included in routes we're showing on map
        if( Object.keys(routeDirectionIdsFromThisStop).includes(route!.trip!.routeShortName!) ) SubscribeToRoutePositions(`/gtfsrt/vp/Lahti/+/+/BUS/${routeId}/#`)

        // clear old endpoints
        endPointCoordinates.clear()

        routeGeometries.forEach((routeGeometry) => {
 
        mapGeoJsonData.features.push(routeGeometry.geojson)

        const [destLng, destLat] = clampedToViewArea ( (routeGeometry.geojson.geometry as LineString).coordinates.slice(-1)[0] )
      
        const destHash = roundedCoordsAsKey([destLng.value, destLat.value])
      
        // if endpoint exists
        if( endPointCoordinates.has(destHash) )
        {
          const endPoint = endPointCoordinates.get(destHash)!
          
          if(!(endPoint.labels.includes(routeGeometry.shortName))) endPoint.labels.push( routeGeometry.shortName )
          endPointCoordinates.set(destHash, endPoint)  
        }
        else
        {
          const endPoint = {
            labels: [routeGeometry.shortName],
            coords: [destLat.value, destLng.value],
            properties: routeGeometry.geojson.properties,
          }
          endPointCoordinates.set(destHash, endPoint)    
        }
        })
      }
    )

    setMapGeoJsonDataState(mapGeoJsonData);

    setRouteStopsPosState(routeGeometries.flatMap(routeGeometry => routeGeometry.stops))

    setVehiclePositionsState( [...Object.values(VehiclePositionsData)] )

    routeEndStopMarkers = []

    // push endpoints into markers
    endPointCoordinates.forEach((endPoint) => 
      endPoint.properties!.isCropped ? null /* don't output endpoint marker for route that is cropped */ :  
      routeEndStopMarkers.push(
        <Marker
        latitude={endPoint.coords[0]}
        longitude={endPoint.coords[1]}
        anchor='bottom'
        offset={[0,0]}>
          <div className={[PysakkiMapStyle.routeEndPoint, false  /* kesken */  ? "" : PysakkiMapStyle.destination].join(" ")}>
            <div className={PysakkiMapStyle.label + " " + PysakkiMapStyle.alt + " " + (endPoint.properties?.isCropped && PysakkiMapStyle.isCropped)}>
              {endPoint.labels.map((label) =>   
                <div>{label}</div>
              )}
            </div>
            <div className={PysakkiMapStyle.stem}></div>
          </div>
        </Marker>
    ))
  
    updateMap()

    return () => {

    }
  }, [mapRefState, queryData])

  useEffect(() => {
    if(mapRefState) mapRefState.resize();

  }, [mapRefState])

// update map view to show current stop and end stop
const updateMap = () => {
  
    if(!routeGeometries.length) return

    const marginAroundFeature = 0.015 // arbitrary number to create space around the outmost end stop marker so it won't be cropped
    // bbox object from routes
    const routeBounds = turf.bbox(turf.lineString([
      ...routeGeometries.reduce<Position[]>((rglist, rg) => {rglist.push(...(rg.geojson.geometry as LineString).coordinates);return rglist}, []),
      ...Array.from( endPointCoordinates ).flatMap(([, value]) => {return value.properties!.isCropped ? [[value.coords[1], value.coords[0]], [value.coords[1], value.coords[0]]] : [[value.coords[1], value.coords[0]], [value.coords[1], value.coords[0]+marginAroundFeature]]}),
    ]))
    // bbox from stop coords with 2km buffer around it
    const stopBounds = turf.bbox(turf.buffer((data!.stop!.geometries!.geoJson!), 2, {steps: 8, units: "kilometers"})!)

    /// combine these into one bbox to which map will be zoomed
    const displayedBounds = turf.bbox(turf.combine(turf.featureCollection([turf.bboxPolygon(stopBounds), turf.bboxPolygon(routeBounds)])))

    mapRefState?.fitBounds(displayedBounds as LngLatBoundsLike, {linear: true, animate: false} )
  }

  // function to be called anytime there is a mqtt message about vehicle pos
  const PositionMessageCallback =
    ( message: GtfsRealtimeBindings.transit_realtime.FeedMessage ) =>
    {
      // vehicle id as object key to avoid duplicates
      const vId:string = (message.entity[0].vehicle?.vehicle?.id) ?? ""
      
      const routeId: string = message.entity[0].vehicle?.trip?.routeId ?? ""
      const pos: number[] = [message.entity[0].vehicle?.position?.latitude ?? 0, message.entity[0].vehicle?.position?.longitude ?? 0]
      const bearing: number = message.entity[0].vehicle?.position?.bearing ?? 0
      
      // update vehiclepositions internally
      Object.assign(VehiclePositionsData, {
        [vId]: {
          position: pos,
          bearing: bearing,
          routeId: routeId,
        }
      })
      
      // update screen positions 
      // with intervals for epaper
      if(( Date.now() - lastRealtimeRender ) > realtimeRenderCooldown )
      { 
        setVehiclePositionsState( [...Object.values(VehiclePositionsData)] ) 
        lastRealtimeRender = Date.now()
      }
  };

  // deprecated since not likely to show nearby stops but likely not going away soon
  // create an object/map key from rounded coords
  // so overlapping/nearby coords are grouped under same key
  const roundedCoordsAsKey = ([lng, lat]: Position): string => `${Math.ceil( lng*100 )}${Math.ceil( lat*100 )}`

  // @ts-ignore -- unused at the moment
  const GeoJSONfromPolylines = (polylineString: string): Feature => {
    const { color, width, index } = getNextNominalColor()

    const FeatureObj: Feature = {
      type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            ...polyline
            .decode(polylineString)
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


  const mapBoundsOffset = 0.055

  return (
    <div className="mapContainer">
      <MapLibreMap
        ref={setMapRef}
        reuseMaps={true}
        initialViewState={{
          latitude: 60.9827, /* jossain Lahden yllä */
          longitude: 25.6612,
          zoom: 11,
          bounds: [25.6612-mapBoundsOffset, 60.9827-mapBoundsOffset, 25.6612+mapBoundsOffset, 60.9827+mapBoundsOffset,],
          pitch: 0,
        }}
        onResize={updateMap}
        style={{width: "100%", height: "100%"}}
        mapStyle={mapstyle as StyleSpecification}>
          <Source id="route"  type="geojson" data={mapGeoJsonDataState}>
            <Layer {...layerStyle} />
          </Source>
          <Source id="pois"  type="geojson" data={poisGeoJson}>
            <Layer {...PoiLayerStyle} />
          </Source>
   
          <VehicleMarkersLayer vehiclePositions={VehiclePositionsState} />


          {routeStopsPosState.map((routestop, idx) =>
              <Marker key={idx} latitude={routestop[0]} longitude={routestop[1]} anchor='center'>
                <div className={PysakkiMapStyle.singleStop}></div>
              </Marker>   
          )}

          <RentalsMarkers vehicleRentalsByBbox={queryData!.vehicleRentalsByBbox} />    

          {/* POIs into own file */}
          <Marker longitude={25.5681} latitude={60.9923}>
            <div className={PysakkiMapStyle.poi}>
              <img src={phks} alt="PHKS" />
            </div>
          </Marker>


          {routeEndStopMarkers}
          <Marker opacity={0.8} latitude={data.stop!.geometries?.geoJson.coordinates[1]} longitude={data.stop!.geometries?.geoJson.coordinates[0]} color={"black"} />


      </MapLibreMap>
    </div>
  );
}