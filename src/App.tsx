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

  // next two 

  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery($id: String!) {
        stop(id: $id) # tähän pysäkin gtfsID eg. "Lahti:103653", "Lahti:104030"
        # täytyy compilaa uudestaan id:n vaihdon jälkeen - npx relay-compiler
        {
          ...PysakkiFragment #Pysakki.tsx
        }
      }
    `,
    {"id": "Lahti:104167"},
    refreshedQueryOptions ?? {}
  );

  useEffect(() => {
    const onError = (event: Event) => console.log("Error", event);
      
    window.addEventListener('error', onError);
    
    return () => {
      window.removeEventListener('error', onError);
    }
  }, []);

  const pysakki = data.stop;

  return ( // päivämäärä
           // haetut tiedot
    <div className="LR_mainContainer">
      <LR_Header />
      <Pysakki pysakki={pysakki!} />
      <PysakkiMap />
      <LR_Footer />
    </div>
  );
}