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
import { useFragment } from 'react-relay';
import { graphql, useLazyLoadQuery } from 'react-relay';

import {
  SubscribeToRoutePositions,
  UnSubscribeAll,
  VehiclePositionsWS 
} from './VehiclePositions'

import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import PysakkiMapStyle from './PysakkiMap.module.css'

import pieniBussi from "./assets/bussi.svg"
import fillari from "./assets/fillari.svg"
import phks from './assets/PHKS.svg'

// @ts-expect-error - no types
import polyline from '@mapbox/polyline'

import type {
  Feature,
  FeatureCollection,
  LineString,
  Position 
} from 'geojson';

import type { PysakkiMapQuery } from './__generated__/PysakkiMapQuery.graphql'
import type { PysakkiMapRentalsFragment$key } from './__generated__/PysakkiMapRentalsFragment.graphql';
import { type ReactElement, useEffect, useState } from 'react';

const VehicleMarkersLayer = ({ vehiclePositions }: { vehiclePositions: VehiclePositionItem[] }) => {
  const { current: map } = useMap();
  const [zoomLevel, setZoomLevel] = useState(11);
  const [mapBearing, setMapBearing] = useState(0);

  useEffect(() => {
    if (!map) return;
    
    const updateViewState = () => {
      setZoomLevel(map.getZoom());
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
            <div className={PysakkiMapStyle.bussi} style={{width: `${(zoomLevel*zoomLevel*2)*0.04}mm`}}>
              <img 
                src={pieniBussi} 
                alt="Bussi" 
                className={vehicleposition.bearing - 180 < mapBearing ? "" : PysakkiMapStyle.flipped}
              />
            </div>
            <div className={PysakkiMapStyle.vehicleLabel} style={{fontSize: `${(zoomLevel*zoomLevel*2)*0.002}vh`, marginTop: `${(zoomLevel*zoomLevel*2)*0.001}vh`}}>
              {routeIdToShortName.hasOwnProperty( vehicleposition.routeId ) ? routeIdToShortName[vehicleposition.routeId] : "?"}
            </div>
          </div>
        </Marker>
      ))}
    </>
  );
};

// how often render fresh realtime position
let realtimeRenderCooldown = 60 * 1000 // 30 seconds
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
        'line-width': 2.5,
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

export default function PysakkiMap() {



  // state definitions 
  const [VehiclePositionsState, setVehiclePositionsState] = useState<VehiclePositionItem[]>([]);
  const [routeStopsPosState, setRouteStopsPosState] = useState<Position[]>([])
  const [mapRefState, setMapRef] = useState<MapRef | null>();
  const [mapGeoJsonDataState, setMapGeoJsonDataState] = useState<FeatureCollection>({  
    type: 'FeatureCollection',
    features: []
  })

  const routeGeometries: Array<{
    shortName: string, 
    geojson: Feature,
    stops: Position[]
  }> = []

  const mapGeoJsonData: FeatureCollection = {
    type: 'FeatureCollection',
    features: []
  }

  const refreshRateSec = 60 * 1000
  const [refreshedQueryOptions, setRefreshedQueryOptions] = useState({fetchKey: 0});

  const refresh = () => {
    setRefreshedQueryOptions(prev => ({
      fetchKey: (prev?.fetchKey ?? 0) + 1,
      fetchPolicy: 'network-only',
    }));
  };

  useEffect(() => {

    const timerId = setInterval(() => {
      console.log("map refresh")
      refresh()
    }, refreshRateSec)

    return () => clearTimeout(timerId)
  }, [])

  const data = useLazyLoadQuery<PysakkiMapQuery>(
    graphql`
      query PysakkiMapQuery($id: String!, $omitCanceled: Boolean!, $departuresQty: Int!) {
        stop(id: $id)
        {
          geometries {
            geoJson
          }

          stoptimesWithoutPatterns(numberOfDepartures: $departuresQty, omitCanceled: $omitCanceled)
          {
            headsign # määränpää
            realtimeArrival # reaaliaikainen saapumisaika sekunteina
            scheduledArrival # suunniteltu saapumisaika sekunteina
            realtimeState # ADDED, CANCELED, MODIFIED, SCHEDULED, UPDATED

            trip 
            {
              directionId
              routeShortName # reittikoodi
            }
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
              name
              directionId
              stops {
                lat
                lon
              }
              patternGeometry {
                points
              }
            }
          }
        }
        vehicleRentalsByBbox (
          maximumLongitude: 25.7972,
          minimumLongitude: 25.5428,
          maximumLatitude: 61.0374,
          minimumLatitude: 60.9208
        )
        {
          ... on VehicleRentalStation{
            ...PysakkiMapRentalsFragment
          }
          
        }
      }
    `,
    {"id": "Lahti:104167", "departuresQty": 2, "omitCanceled": false},
    refreshedQueryOptions ?? {}
  );

  const rentalsData = useFragment<PysakkiMapRentalsFragment$key>(
    graphql`
      fragment PysakkiMapRentalsFragment on VehicleRentalStation @relay(plural: true)
      {
        lat
        lon
      }
    `,
    data.vehicleRentalsByBbox
  )

  // haetaan 2 seuraavaa lähtöä ja kirjataan ne taulukkoon
  const routeDirectionIdsFromThisStop = {} as {[shortName: string]: number}
  
  data!.stop!.stoptimesWithoutPatterns!.forEach(
    stop => routeDirectionIdsFromThisStop[(stop!.trip!.routeShortName! as string)] = stop?.trip!.directionId!
  )
  
  useEffect(() => {
    VehiclePositionsWS(
      PositionMessageCallback
    )
  }, [])

  useEffect(() => {
    if (data!.stop!.routes) data!.stop!.routes.forEach(route => {

      const routeId: string = route.gtfsId.split(":")[1]

      // lookup for position data to get shortname (eg. "1K", not available in pos. data) via route id
      Object.assign(routeIdToShortName, {
        [routeId]: route.shortName,
      })

      // push routes associated to this stop to topics to listen position
      VehiclePositionsData = {};
      // un-listen other routes (if present)
      UnSubscribeAll();

      // only subscribe if included in routes we're showing on map
      if( Object.keys(routeDirectionIdsFromThisStop).includes(route!.shortName!) )SubscribeToRoutePositions(`/gtfsrt/vp/Lahti/+/+/BUS/${routeId}/#`)
        
      const routePattern = route.patterns!.filter((pattern) => pattern?.directionId == routeDirectionIdsFromThisStop[route.shortName!])
  

      if(routePattern.length)
      {
        const routeStops: Position[] = routePattern[0]!.stops!.map(stop => [stop!.lat!, stop!.lon!])

        routeGeometries.push( {
          shortName: (route.shortName as string),
          geojson: GeoJSONfromPolylines( routePattern[0]!.patternGeometry?.points ),
          stops: routeStops
        })

      }
    })

    // clear old endpoints
    endPointCoordinates.clear()

    routeGeometries.forEach((routeGeometry) => {

      mapGeoJsonData.features.push(routeGeometry.geojson)

      const [destLng, destLat] = (routeGeometry.geojson.geometry as LineString).coordinates.slice(-1)[0]
      
      const destHash = roundedCoordsAsKey([destLng, destLat])
        
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
          coords: [destLat, destLng],
        }
        endPointCoordinates.set(destHash, endPoint)    
      }
    })
    console.log("Map Refresh")

    setMapGeoJsonDataState(mapGeoJsonData);

    setRouteStopsPosState(routeGeometries.flatMap(routeGeometry => routeGeometry.stops))

    setVehiclePositionsState( [...Object.values(VehiclePositionsData)] )
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
            <div className={PysakkiMapStyle.label + " " + PysakkiMapStyle.alt}>
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
  }, [mapRefState, refreshedQueryOptions])

  useEffect(() => {
    if(mapRefState) mapRefState.resize();

  }, [mapRefState])

// update map view to show current stop and end stop
const updateMap = () => {

    /* 
      IMPLEMENT BBOX 
    */
  
    // gather coords we want to fit

    if(!routeGeometries.length) return
    
    const turfCoords = turf.lineString([
        (data.stop!.geometries?.geoJson!.coordinates as Position),
        data.stop!.geometries?.geoJson!.coordinates.map((c: number) => c-0.002),
        ...Array.from( endPointCoordinates ).flatMap(([, value]) => [[value.coords[1], value.coords[0]], [value.coords[1], value.coords[0]+0.010]])
      ])

    // turf
    const bounds = turf.bbox(turfCoords)

    mapRefState?.fitBounds(bounds as LngLatBoundsLike, {linear: true, animate: false} )
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
      // with intervals for epaper
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

  const mapBoundsOffset = 0.055

  let nominalColorIndex = 0;
  const getNextNominalColor = (): {
    color: string,
    index: number,
  } => {
    // const color = routeNominalColorPalette[nominalColorIndex]
    nominalColorIndex = nominalColorIndex == routeNominalColorPalette.length ? 0 : nominalColorIndex + 1;

    return {
      color: "#000000",
      index: nominalColorIndex
    };
  }

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
        attributionControl={false}
        style={{width: "100%", height: "100%"}}
        mapStyle={mapstyle as StyleSpecification}>
          <Source id="route"  type="geojson" data={mapGeoJsonDataState}>
            <Layer {...layerStyle} />
          </Source>

   
          <VehicleMarkersLayer vehiclePositions={VehiclePositionsState} />

          {routeStopsPosState.map((routestop, idx) =>
              <Marker key={idx} latitude={routestop[0]} longitude={routestop[1]} anchor='center'>
                <div className={PysakkiMapStyle.singleStop}></div>
              </Marker>   
          )}

          {rentalsData.map((rentalStation, idx) => 
            <Marker key={idx} latitude={rentalStation.lat!} longitude={rentalStation.lon!}>
              <div className={PysakkiMapStyle.fillari}>
                <img src={fillari} alt="Fillari" />
              </div>
            </Marker>
          )}        

          <Marker longitude={25.5681} latitude={60.9923}>
            <div className={PysakkiMapStyle.poi}>
              <img src={phks} alt="PHKS" />
            </div>
          </Marker>

          {routeEndStopMarkers}
          <Marker latitude={data.stop!.geometries?.geoJson.coordinates[1]} longitude={data.stop!.geometries?.geoJson.coordinates[0]} color={"black"} />


      </MapLibreMap>
    </div>
  );
}