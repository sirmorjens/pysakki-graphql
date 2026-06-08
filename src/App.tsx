import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import Pysakki from "./Pysakki.tsx";

import LR_Header from './LR_components/LR_Header.tsx'
import LR_Footer from './LR_components/LR_Footer.tsx'

import PysakkiMap from "./PysakkiMap.tsx"
import { useEffect, useState } from 'react';

import '@fontsource/barlow-semi-condensed/100.css';
import '@fontsource/barlow-semi-condensed/200.css';
import '@fontsource/barlow-semi-condensed/300.css';
import '@fontsource/barlow-semi-condensed/400.css';
import '@fontsource/barlow-semi-condensed/500.css';
import '@fontsource/barlow-semi-condensed/600.css';
import '@fontsource/barlow-semi-condensed/700.css';
import '@fontsource/barlow-semi-condensed/800.css';
import '@fontsource/barlow-semi-condensed/900.css';

import '@fontsource-variable/inter/wght.css';
import '@fontsource/barlow/100.css';
import '@fontsource/barlow/200.css';
import '@fontsource/barlow/300.css';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow/800.css';
import '@fontsource/barlow/900.css';
export default function App() {

  // copypaste graphql sivuilta
  // refresh
  const variables = {}
  const [refreshedQueryOptions, setRefreshedQueryOptions] = useState({fetchKey: 0});


  const refreshRate = 60 * 1000


  const refresh = () => {
    setRefreshedQueryOptions(prev => ({
      fetchKey: (prev?.fetchKey ?? 0) + 1,
      fetchPolicy: 'network-only',
    }));
  };

  useEffect(() => {

    const timerId = setInterval(() => {
      console.log("refresh")
      refresh()
    }, refreshRate)

    return () => clearTimeout(timerId)
  }, [])

  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery($id: String!) {
        stop(id: $id) # tähän pysäkin gtfsID eg. "Lahti:103653", "Lahti:104030"
        # täytyy compilaa uudestaan id:n vaihdon jälkeen - npx relay-compiler
        {
          ...PysakkiFragment #Pysakki.tsx
          ...PysakkiMapFragment
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
    {"id": "Lahti:104167", "departures": 12, "kieli": "en", "cancel": false, "alkuaika": 0, "inPatternDepartures": 5},
    refreshedQueryOptions ?? {}
  );

  useEffect(() => {
    const onError = (event: Event) => console.log("Error", event);
      
    window.addEventListener('error', onError);
    
    return () => {
      window.removeEventListener('scroll', onError);
    }
  }, []);

  const pysakki = data.stop;
  const rentalsData = data.vehicleRentalsByBbox

  const [routeShortNamesDirectionIdOnMap, setRouteShortNamesDirectionOnMap] = useState<{shortName: string, directionId: number}[]>([]);

  const fauxShortNames: {shortName: string, directionId: number}[] = [
    {shortName: "1K", directionId: 1},
  ]


  return ( // päivämäärä
           // haetut tiedot
    <div className="LR_mainContainer">
      <LR_Header />
      <Pysakki pysakki={pysakki!} setRouteShortNamesDirectionOnMap={ setRouteShortNamesDirectionOnMap } />
      <PysakkiMap pysakki={pysakki!} rentalsData={rentalsData} routeShortNamesDirectionIdOnMap={ fauxShortNames } />
      <LR_Footer />
    </div>
  );
}