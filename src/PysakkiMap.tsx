import { Map as MapLibreMap, Marker, Source, Layer, type MapRef, type LayerProps, type StyleSpecification, type ViewStateChangeEvent, type LngLatBoundsLike } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css'; // See notes below
import mapstyle from "./Map/pysakki_mapstyle.json"
import { useFragment } from 'react-relay';
import { graphql } from 'react-relay';
import { SubscribeToRoutePositions, UnSubscribeAll, VehiclePositionsWS } from './VehiclePositions'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import PysakkiMapStyle from './PysakkiMap.module.css'
import pieniBussi from "./assets/bussi.svg"
import fillari from "./assets/fillari.svg"
// @ts-expect-error - no types
import polyline from '@mapbox/polyline'

import type { Feature, FeatureCollection, LineString, Position } from 'geojson';
import type { PysakkiMapFragment$key } from './__generated__/PysakkiMapFragment.graphql';
import type { PysakkiMapRentalsFragment$key } from './__generated__/PysakkiMapRentalsFragment.graphql';

import { type ReactElement, useEffect, useState } from 'react';
import type { MqttClient } from 'mqtt';
import mqtt from 'mqtt';

const VehiclePositionsEndpoint = "wss://mqtt.digitransit.fi"
let lastRealtimeRender = 0

// how often render fresh realtime position
let realtimeRenderCooldown = 30 * 1000 // 30 seconds

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
        'line-width': 3,
        "line-offset": ["*", ["get", "routeIndex"], 0.2]
    }

};

let routeEndStopMarkers: ReactElement[] = []

// rounded coords as a key to group overlapping/nearby coords
let endPointCoordinates = new Map<string, {labels: string[], coords: Position}>()


let VehiclePositionsData = {} as {[vId: number]: VehiclePositionItem}

// no "shortName" (eg. '1K', '23' etc) available in position data
// only routeId, so let's map them together into a lookup table
const routeIdToShortName: {
  [routeId: string]: string
} = {} 

let mqttClient: MqttClient;

export default function PysakkiMap(props: {pysakki: PysakkiMapFragment$key; rentalsData: PysakkiMapRentalsFragment$key; routeShortName: string}) {


  // state definitions 
  const [VehiclePositionsState, setVehiclePositionsState] = useState<VehiclePositionItem[]>([]);
  const [zoomLevelState, changeZoomLevelState] = useState(11)
  const [mapBearingState, changeMapBearingState] = useState(0)
  const [mapRefState, setMapRef] = useState<MapRef | null>();
  const [mapGeoJsonDataState, setMapGeoJsonDataState] = useState<FeatureCollection>({  
    type: 'FeatureCollection',
    features: []
  })



  const routeGeometries: Array<{
    shortName: string, 
    geojson: Feature
  }> = []

  const mapGeoJsonData: FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  }

  const data = useFragment<PysakkiMapFragment$key>(
    graphql`
      fragment PysakkiMapFragment on Stop
      {
        geometries {
          geoJson
        }
        routes {
          stops {
            name
            geometries {
              geoJson
            }
          }
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

  const rentalsData = useFragment<PysakkiMapRentalsFragment$key>(
    graphql`
      fragment PysakkiMapRentalsFragment on VehicleRentalStation @relay(plural: true)
      {
        name
        lat
        lon
      }
    `,
    props.rentalsData
  )

  console.log("rentalsdata")
  console.log(rentalsData)

  useEffect(() => {
    VehiclePositionsWS(
      VehiclePositionsEndpoint,
      PositionMessageCallback
    ).then(mqttClientResult => mqttClient = mqttClientResult)
  }, [])

  useEffect(() => {
    if (data.routes) data.routes.forEach(route => {

      if(route.shortName != props.routeShortName) return  

      const routeId: number = parseInt( route.gtfsId.split(":")[1] )

      // lookup for position data to get shortname (eg. "1K", not available in pos. data) via route id
      Object.assign(routeIdToShortName, {
        [routeId]: route.shortName,
      })

      // push routes associated to this stop to topics to listen position
      VehiclePositionsData = {};
      // un-listen other routes (if present)
      UnSubscribeAll();
      SubscribeToRoutePositions(`/gtfsrt/vp/Lahti/+/+/BUS/${routeId}/#`)
          

      routeGeometries.push( {
        shortName: (route.shortName as string),
        geojson: GeoJSONfromPolylines( route.patterns![0]?.patternGeometry?.points )
      })
    })

    // clear old endpoints
    endPointCoordinates.clear()


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

    // clear markers and endpoints
    // somehow the way react either doesn't reinitialize
    // stuff when it should and does when is should not 
    // drives me up the wall
    routeEndStopMarkers = []


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

    setMapGeoJsonDataState(mapGeoJsonData);
    setVehiclePositionsState( [...Object.values(VehiclePositionsData)] )
    updateMap()

    return () => {

    }
  }, [mapRefState, props.routeShortName])

// update map view to show current stop and end stop
const updateMap = () => {

    if(!routeGeometries.length) return;

    // display bounds either from displayed stop to destination
    // or closeby vehicle to destination
    let lat1, lat2, lng1, lng2, minLat, maxLat, minLng, maxLng;


    [lng1, lat1] = (routeGeometries[0].geojson.geometry as LineString).coordinates.slice(-1)[0];

    // no vehicle pos data available, display stop position
    if(VehiclePositionsState.length)
    { 
      // implement way to display only the arriving vehicle,
      // not some other vehicle on same route
      lat2 = VehiclePositionsState[0].position[0]
      lng2 = VehiclePositionsState[0].position[1]
    }
    else
    {
      lat2 = data.geometries?.geoJson.coordinates[1]
      lng2 = data.geometries?.geoJson.coordinates[0]
    }

    minLng = lng1 > lng2 ? lng2 : lng1
    maxLng = lng1 > lng2 ? lng1 : lng2
    minLat = lat1 > lat2 ? lat2 : lat1;
    maxLat = lat1 > lat1 ? lat1 : lat2;
    
    const bounds: LngLatBoundsLike = [minLng, minLat, maxLng, maxLat, ] as [number,number,number,number]

    mapRefState?.fitBounds(bounds, {padding: {left: 80, top: 80, right: 80, bottom: 80}, linear: true, /* animate: false */})

  }

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
      // implement cooldown for epaper display
      if(( Date.now() - lastRealtimeRender ) > realtimeRenderCooldown )
      { 
        setVehiclePositionsState( [...Object.values(VehiclePositionsData)] ) 
        lastRealtimeRender = Date.now()
      }
  };

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
      color: "#000000",
      index: nominalColorIndex
    };
  }

  

  const zoomStateChange = (e: ViewStateChangeEvent) => {
    changeZoomLevelState( e.viewState.zoom )
  }
  const bearingStateChange = (e: ViewStateChangeEvent) => {
    changeMapBearingState( e.viewState.bearing )
  }


  return (

      <MapLibreMap
        ref={setMapRef}
        reuseMaps={true}
        initialViewState={{
          latitude: 60.9827, /* jossain Lahden yllä */
          longitude: 25.6612,
          zoom: 11,
          pitch: 0,
        }}
        attributionControl={false}
        style={{width: "100%", height: "30%"}}
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
          {data.routes?.filter(route => route.shortName == props.routeShortName).map(route => 
            route.stops?.map(stop => 
              <Marker latitude={stop?.geometries?.geoJson.coordinates[1]} longitude={stop?.geometries?.geoJson.coordinates[0]} anchor='center'>
                <div className={PysakkiMapStyle.singleStop}></div>
              </Marker>
            )
          )}
          {rentalsData.map(rentalStation => 
            <Marker latitude={rentalStation.lat!} longitude={rentalStation.lon!}>
              <div class={PysakkiMapStyle.fillari}>
                <img src={fillari} alt="Fillari" />
              </div>
            </Marker>
          )}
          <Marker latitude={data.geometries?.geoJson.coordinates[1]} longitude={data.geometries?.geoJson.coordinates[0]} color={"black"} />
          <Source id="route" type="geojson" data={mapGeoJsonDataState}>
            <Layer {...layerStyle} />
          </Source>

      </MapLibreMap>

  );
}