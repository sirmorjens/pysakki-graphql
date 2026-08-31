import type { FeatureCollection } from 'geojson'
import { Source, Layer, type LayerProps } from "@vis.gl/react-maplibre"

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

type Props = {
    mapRoutesDataState: FeatureCollection
}

export default function Routes({mapRoutesDataState}: Props) {

    return (
        <Source id="route"  type="geojson" data={mapRoutesDataState}>
            <Layer {...layerStyle} />
        </Source>
    )
}