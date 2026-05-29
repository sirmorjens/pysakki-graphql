import { Map as MapLibreMap, Marker, Source, Layer, type LayerProps, type StyleSpecification, type ViewStateChangeEvent } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css'; // See notes below
import mapstyle from "../Map/pysakki_mapstyle.json"
import { useFragment } from 'react-relay';
import { graphql } from 'react-relay';
import { SubscribeToRoutePositions, VehiclePositionsWS } from './VehiclePositions'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import PysakkiMapStyle from '../PysakkiMap.module.css'
import pieniBussi from "../assets/bussi.svg"

// @ts-expect-error - no types
import polyline from '@mapbox/polyline'

import type { Feature, FeatureCollection, LineString, Position } from 'geojson';

import { type ReactElement, useCallback, useEffect, useState } from 'react';
import type { Map10NextEndpointsFragment$key } from './__generated__/Map10NextEndpointsFragment.graphql';

export default function PysakkiMap(props: {pysakki: Map10NextEndpointsFragment$key}) {
  
  const [VehiclePositionsState, setVehiclePositionsState] = useState<VehiclePositionItem[]>([]);
  const VehiclePositionsData = {} as {[vId: number]: VehiclePositionItem}

  // no "shortName" (eg. '1K', '23' etc) available in position data
  // only routeId, so let's map them together into a lookup table
  const routeIdToShortName: {
    [routeId: string]: string
  } = {} 

  useEffect(() => {


    
    const mqttClient = VehiclePositionsWS(
      PositionMessageCallback
    );

    // push routes associated to this stop to topics to listen position
    Object.keys(routeIdToShortName)
    .forEach(routeId => 
      SubscribeToRoutePositions( `/gtfsrt/vp/Lahti/+/+/BUS/${routeId}/#` 
    ))
  }, [])

  type VehiclePositionItem = {
    position: [number, number];
    bearing: number;
    routeId: string;
  }



  const PositionMessageCallback = useCallback( 
    ( message: GtfsRealtimeBindings.transit_realtime.FeedMessage ) =>
    {
      // vehicle id as object key to avoid duplicates
      const vId:string = (message.entity[0].vehicle?.vehicle?.id) ?? ""
      
      const routeId: string = message.entity[0].vehicle?.trip?.routeId ?? ""
      const pos: number[] = [message.entity[0].vehicle?.position?.latitude ?? 0, message.entity[0].vehicle?.position?.longitude ?? 0]
      const bearing: number = message.entity[0].vehicle?.position?.bearing ?? 0
      
      Object.assign(VehiclePositionsData, {
        [vId]: {
          position: pos,
          bearing: bearing,
          routeId: routeId,
        }
      })
  
      // break object into renderable array and update state
      setVehiclePositionsState( [...Object.values(VehiclePositionsData)] )
  }, []);

  const data = useFragment<Map10NextEndpointsFragment$key>(
    graphql`
      fragment Map10NextEndpointsFragment on Stop
      {
        geometries {
          geoJson
        }
        routes {
          shortName
          gtfsId
          patterns {
            patternGeometry {
              points
            }
          }
        }
    }
    `,
    props.pysakki
  )

  // create an object/map key from rounded coords
  // so overlapping/nearby coords are grouped under same key
  const roundedCoordsAsKey = ([lng, lat]: Position): string => `${Math.ceil( lng*100 )}${Math.ceil( lat*100 )}`

  const GeoJSONfromPolylines = (polylineString: string): Feature => {
    const { color, index } = getNextNominalColor()

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
        routeColor: color}
    }

    return FeatureObj;
  } 

  const routeEndStopMarkers: ReactElement[] = []
  const endPointCoordinates = new Map<string, {labels: string[], coords: Position}>()

  const routeNominalColorPalette: string[] = [
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

  let nominalColorIndex = 0;
  const getNextNominalColor = (): {
    color: string,
    index: number,
  } => {
    const color = routeNominalColorPalette[nominalColorIndex]
    nominalColorIndex = nominalColorIndex == routeNominalColorPalette.length ? 0 : nominalColorIndex + 1;

    return {
      color: color,
      index: nominalColorIndex
    };
  }

  const routeGeometries: Array<{
    shortName: string, 
    geojson: Feature
  }> = []

  const mapGeoJsonData: FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  }

  /*
    Given the routes for this stop, store route geometries for drawing them on map
    and routeIds to subscribe to position updates from mqtt feed
  */
  if (data.routes) data.routes.forEach(route => {

    const routeId: number = parseInt( route.gtfsId.split(":")[1] )
    // lookup for position data to get shortname (eg. "1K", not available in pos. data) via route id
    Object.assign(routeIdToShortName, {
      [routeId]: route.shortName,
    })

    routeGeometries.push( {
      shortName: (route.shortName as string),
      geojson: GeoJSONfromPolylines( route.patterns![0]?.patternGeometry?.points )
    })
  })

  // push route data into polylines and store end point coords
  // this is done to manage overlap and group routes starting/ending at same coordinate
  routeGeometries.forEach((routeGeometry) => {

    mapGeoJsonData.features.push(routeGeometry.geojson)

    const [startLng, startLat] = (routeGeometry.geojson.geometry as LineString).coordinates[0]
    // rounded coords as key to group overlapping/very closely positioned endpoints
    const startHash = roundedCoordsAsKey([startLng, startLat])

    const [destLng, destLat] = (routeGeometry.geojson.geometry as LineString).coordinates.slice(-1)[0]
    const destHash = roundedCoordsAsKey([destLng, destLat])
    
    if( endPointCoordinates.has(startHash) )
    {
      const endPoint = endPointCoordinates.get(startHash)!
      endPoint.labels.push( routeGeometry.shortName )
      endPointCoordinates.set(startHash, endPoint)  
    } 
    else
    {
      const endPoint = {
        labels: [routeGeometry.shortName],
        coords: [startLat, startLng],
      }
      endPointCoordinates.set(startHash, endPoint)
    }

    if( endPointCoordinates.has(destHash) )
    {
      const endPoint = endPointCoordinates.get(destHash)!
      endPoint.labels.push( routeGeometry.shortName )
      endPointCoordinates.set(destHash, endPoint)  
    }
    else
    {
      const endPoint = {
        labels: [routeGeometry.shortName],
        coords: [destLat, destLng],
      }
      endPointCoordinates.set(destHash, endPoint)    
    }
  })

  // push endpoints into markers
  endPointCoordinates.forEach((endPoint) => 
    routeEndStopMarkers.push(
        <Marker
          latitude={endPoint.coords[0]}
          longitude={endPoint.coords[1]}
          anchor='bottom'
          offset={[0,0]}>
            <div className={[PysakkiMapStyle.routeEndPoint, false  /* kesken */  ? "" : PysakkiMapStyle.destination].join(" ")}>
              <div className={PysakkiMapStyle.label}>
                {endPoint.labels.map((label) => 
                  <div>{label}</div>
                )}
              </div>
              <div className={PysakkiMapStyle.stem}></div>
            </div>
        </Marker>
  ))

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
          'line-width': 1,
          "line-offset": ["*", ["get", "routeIndex"], 0.2]
      }
};

const [zoomLevelState, changeZoomLevelState] = useState(11)
const [mapBearingState, changeMapBearingState] = useState(0)

const zoomStateChange = (e: ViewStateChangeEvent) => {
  changeZoomLevelState( e.viewState.zoom )
}
const bearingStateChange = (e: ViewStateChangeEvent) => {
  changeMapBearingState( e.viewState.bearing )
}

  return (
    <MapLibreMap
      initialViewState={{
        latitude: 60.9827, /* jossain Lahden yllä */
        longitude: 25.6612,
        zoom: 11,
        /* bounds: [26, 50, 26, 90], define bounds from displayed routes */
        pitch: 30,
      }}
      attributionControl={false}
      style={{width: "100%", height: 800}}
      onZoom={zoomStateChange}
      onRotate={bearingStateChange}
      mapStyle={mapstyle as StyleSpecification}>
        {routeEndStopMarkers}

        {VehiclePositionsState.map<ReactElement>(
            (vehicleposition: {
              position: number[],
              bearing: number,
              routeId: string
            }) => 
            <Marker latitude={vehicleposition.position[0]} longitude={vehicleposition.position[1]}>
              <div className={PysakkiMapStyle.vehicle}>
                <div className={PysakkiMapStyle.bussi} style={{width: `${(zoomLevelState*zoomLevelState*2)*0.05}mm`}}><img src={pieniBussi} alt="Bussi" className={vehicleposition.bearing - 180 < mapBearingState ? "" : PysakkiMapStyle.flipped}/></div>
                <div className={PysakkiMapStyle.vehicleLabel} style={{fontSize: `${(zoomLevelState*zoomLevelState*2)*0.01}mm`, marginTop: `${(zoomLevelState*zoomLevelState*2)*0.05}%`}}>{routeIdToShortName.hasOwnProperty( vehicleposition.routeId ) ? routeIdToShortName[vehicleposition.routeId] : "?"}</div>
              </div>
            </Marker>
        )}       

        <Source id="route" type="geojson" data={mapGeoJsonData}>
          <Layer {...layerStyle} />
        </Source>

    </MapLibreMap>
  );
}