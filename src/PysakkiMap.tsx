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
import { graphql, useLazyLoadQuery } from 'react-relay';

import { clampedToViewArea, filterOutsideViewArea, getNextNominalColor } from './PysakkiMapUtils'

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
  Position 
} from 'geojson';

import type { PysakkiMapQuery } from './__generated__/PysakkiMapQuery.graphql'
import { type ReactElement, useEffect, useState } from 'react';

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

  const refreshRateSec = PysakkiSettings.refreshRateSec
  const stopId = PysakkiSettings.stopId;

  const [refreshedQueryOptions, setRefreshedQueryOptions] = useState({fetchKey: 0});

  const refreshMap = () => {
    setRefreshedQueryOptions(prev => ({
      fetchKey: (prev?.fetchKey ?? 0) + 1,
      fetchPolicy: 'network-only',
    }));
  };

  useEffect(() => {

    const timerId = setInterval(() => {
      console.log("map refresh")
      refreshMap()
    }, refreshRateSec)

    return () => clearInterval(timerId)
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
                    ...RentalsMarkersRentalsFragment
                }
                  
                }
              }
            `,
            {"id": stopId, "departuresQty": 2, "omitCanceled": false},
            refreshedQueryOptions ?? {}
          );
  
  

  // if stop doesn't exist
  if( !data || !data.stop ) return MapUnavailable()



  // haetaan 2 seuraavaa lähtöä ja kirjataan ne taulukkoon
  const routeDirectionIdsFromThisStop = {} as {[shortName: string]: number}
  
  if(data!.stop!.stoptimesWithoutPatterns) data!.stop!.stoptimesWithoutPatterns!.forEach(
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

      // push routes associated to this stop to mqtt topics to listen position
      VehiclePositionsData = {};
      // un-listen other routes (if present)
      UnSubscribeAll();

      // only subscribe if included in routes we're showing on map
      if( Object.keys(routeDirectionIdsFromThisStop).includes(route!.shortName!) ) SubscribeToRoutePositions(`/gtfsrt/vp/Lahti/+/+/BUS/${routeId}/#`)
        
      const routePattern = route.patterns!.filter((pattern) => pattern?.directionId == routeDirectionIdsFromThisStop[route.shortName!])
  
      if(!routePattern.length) return // no routes with applicable direction id 
      
      // TODO: apply "geo-clamping" here in order to not show geometry outside specified bbox
      const routeStops: Position[] = routePattern[0]!.stops!
      .filter(stop => filterOutsideViewArea([stop.lat!, stop!.lon!]))
      .map(stop => [stop!.lat!, stop!.lon!])

      routeGeometries.push( {
        shortName: (route.shortName as string),
        geojson: GeoJSONfromPolylines( routePattern[0]!.patternGeometry?.points ),
        stops: routeStops
      })

    })

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
        }
        endPointCoordinates.set(destHash, endPoint)    
      }
    })
    console.log("Map Refresh")

    setMapGeoJsonDataState(mapGeoJsonData);

    setRouteStopsPosState(routeGeometries.flatMap(routeGeometry => routeGeometry.stops))

    setVehiclePositionsState( [...Object.values(VehiclePositionsData)] )

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
  
    if(!routeGeometries.length) return
  
    // generate one geojson linestring from all relevant coords
    // including stop position and route endpoints
    const turfCoords = turf.lineString([
        (data.stop!.geometries?.geoJson!.coordinates as Position),
        data.stop!.geometries?.geoJson!.coordinates.map((c: number) => c-0.002), // offset around stop
        ...Array.from( endPointCoordinates ).flatMap(([, value]) => {return [[value.coords[1], value.coords[0]], [value.coords[1], value.coords[0]+0.010]]})
      ])

    // turf.bbox to establish bounds around the linestring, around which the map is zoomed
    const displayedBounds = turf.bbox(turfCoords)

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

          <RentalsMarkers vehicleRentalsByBbox={data.vehicleRentalsByBbox} />    

          {/* POIs into own file */}
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