import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import Pysakki from "./Pysakki.tsx";

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

import '@fontsource-variable/dm-sans/wght.css';



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
      query AppQuery {
        stop(id: "Lahti:104030") # tähän pysäkin gtfsID eg. "Lahti:103653", "Lahti:104030"
        # täytyy compilaa uudestaan id:n vaihdon jälkeen - npx relay-compiler
        {
          ...PysakkiFragment #Pysakki.tsx
          ...PysakkiMapFragment
        }
      }
    `,
    variables,
    refreshedQueryOptions ?? {},
  );

  const pysakki = data.stop;
  let timeNow = new Date();

  return ( // päivämäärä
           // haetut tiedot
    <div>
      <PysakkiMap pysakki={pysakki!} />
      <div>
        <p>Auto refresh active</p>
        <button onClick={refresh}>Update data now</button>
      </div>
      {timeNow.toLocaleString('fi-FI')}
      <Pysakki pysakki={pysakki!} />
    </div>
  );
}