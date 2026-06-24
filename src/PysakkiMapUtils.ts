import type { Position } from 'geojson';

// @ts-ignore // wip
const viewAreaBounds = []

export const clampedToViewArea = (coords: Position): {
    value: number;
    outside?: boolean;
}[] => {
    

    return [{value: coords[0]}, {value: coords[1]}]
} 