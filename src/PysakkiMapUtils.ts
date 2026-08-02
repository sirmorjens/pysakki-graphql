import type { Position, Feature, Geometry, GeoJsonProperties, LineString } from 'geojson';
import * as turf from '@turf/turf'

const viewAreaoffset = -35.366
const viewAreaBounds = turf.bboxPolygon([25.6612+viewAreaoffset, 60.9827+viewAreaoffset, 25.6612-viewAreaoffset, 60.9827-viewAreaoffset]);

export const filterOutsideViewArea = (coords: Position): Boolean => {
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

export const clampCoordsFromStop = (route: Feature<LineString, GeoJsonProperties>, startingPoint: Position): Feature<LineString, GeoJsonProperties> => {

    // travel on geojson linestring route until stop coords are reached
    // i seriously couldn't figure out a better way
    const routeFromStop: Position[] = []

    for(const point of route.geometry.coordinates.toReversed())
    {
        routeFromStop.push(point)
        if(proximityOfPoints(point, startingPoint, 490)) break;
    }
    /// ////

    return {
        ...route,
        geometry: {      
            ...route.geometry!,
            coordinates: routeFromStop.toReversed(),
        },
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