import { 
  Map as MapLibreMap,
  Marker,
  Source,
  Layer,
  useMap,
  type MapRef,
  type LayerProps,
  type StyleSpecification
} from '@vis.gl/react-maplibre';

import 'maplibre-gl/dist/maplibre-gl.css'; // See notes below
import mapstyle from "./Map/pysakki_mapstyle.json"

import {
  clampedToViewArea,
  roundedCoordsAsKey,
  updateMapBounds,
  useRouteData,
  type EndPointCoordinate,
} from './PysakkiMapUtils'

import { PysakkiSettings } from './PysakkiSettings';
import MapRoutes from './MapRoutes'
import RentalsMarkers from './MapRentalsMarkers'
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
  FeatureCollection,
  LineString,
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

    updateViewState();

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

// WIP: map points of interest
// need to figure out how to make these user editable
const poisGeoJson: FeatureCollection<Geometry, GeoJsonProperties> = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: { title: '' },
        geometry: { type: 'Point', coordinates: [25,50] },
      }]
}

// how often render fresh realtime position
const realtimeRenderCooldown = PysakkiSettings.refreshRateSec // 30 seconds
let lastRealtimeRender = 0

type VehiclePositionItem = {
    position: [number, number];
    bearing: number;
    routeId: string;
}

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
  let endPointCoordinates = new Map<string, EndPointCoordinate>()
  let VehiclePositionsData = {} as {[vId: number]: VehiclePositionItem}

  // no "shortName" (eg. '1K', '23' etc) available in position data
  // only routeId, so let's map them together into a lookup table
  const routeIdToShortName: {
    [routeId: string]: string
  } = {} 

  type Props = {
    queryData: QueryParentQuery$data | null | undefined;
  }

export default function PysakkiMap({queryData}: Props) {

  // state definitions 
  const [VehiclePositionsState, setVehiclePositionsState] = useState<VehiclePositionItem[]>([]);
  const [mapRefState, setMapRef] = useState<MapRef | null>();

  if(!queryData) return <MapUnavailable />

  // if stop doesn't exist
  if( !queryData || !queryData.stop ) return MapUnavailable()

  const {routeDataState, routeGeometriesState} = useRouteData(queryData);

  const routeDirectionIdsFromThisStop = {} as {[shortName: string]: number}
  
  if(queryData!.stop!.maprows!) queryData!.stop!.maprows.forEach(
    stop => routeDirectionIdsFromThisStop[(stop!.trip!.routeShortName! as string)] = stop?.trip!.directionId!
  )

  useEffect(() => {
    // open ws connection to positions and assign callback
    VehiclePositionsWS(
      PositionMessageCallback
    )
  }, [])

  useEffect(() => {
    
    if(queryData!.stop!.maprows) queryData.stop?.maprows.forEach(route => 
    {
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

        if(!routeGeometriesState) return 
        routeGeometriesState.forEach((routeGeometry) => {
  
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

    setVehiclePositionsState( [...Object.values(VehiclePositionsData)] )

    routeEndStopMarkers = []

    // push endpoints into markers
    endPointCoordinates.forEach((endPoint, index) => 
      endPoint.properties!.isCropped ? null /* don't output endpoint marker for route that is cropped */ :  
      routeEndStopMarkers.push(
        <Marker key={index}
        latitude={endPoint.coords[0]}
        longitude={endPoint.coords[1]}
        anchor='bottom'
        offset={[0,0]}>
          <div key={index} className={[PysakkiMapStyle.routeEndPoint, false  /* kesken */  ? "" : PysakkiMapStyle.destination].join(" ")}>
            <div className={PysakkiMapStyle.label + " " + PysakkiMapStyle.alt + " " + (endPoint.properties?.isCropped && PysakkiMapStyle.isCropped)}>
              {endPoint.labels.map((label, index) =>   
                <div key={index}>{label}</div>
              )}
            </div>
            <div className={PysakkiMapStyle.stem}></div>
          </div>
        </Marker>
    ))
  
    updateMapBounds(mapRefState!, routeGeometriesState!, endPointCoordinates, queryData!.stop!.geometries!.geoJson)

    return () => {

    }
  }, [mapRefState, queryData, routeGeometriesState])

  useEffect(() => {
    if(mapRefState) mapRefState.resize();

  }, [mapRefState])


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
        onResize={() => updateMapBounds(mapRefState!, routeGeometriesState!, endPointCoordinates, queryData!.stop!.geometries!.geoJson)}
        style={{width: "100%", height: "100%"}}
        mapStyle={mapstyle as StyleSpecification}>

          <MapRoutes mapRoutesDataState={routeDataState!}/>
          <Source id="pois"  type="geojson" data={poisGeoJson}>
            <Layer {...PoiLayerStyle} />
          </Source>
   
          <VehicleMarkersLayer vehiclePositions={VehiclePositionsState} />

          {routeGeometriesState?.flatMap(routeGeometry => routeGeometry.stops).map((routestop, idx) =>
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

          {/* stop marker */}
          <Marker opacity={0.8} latitude={queryData.stop!.geometries?.geoJson.coordinates[1]} longitude={queryData.stop!.geometries?.geoJson.coordinates[0]} color={"black"} />


      </MapLibreMap>
    </div>
  );
}