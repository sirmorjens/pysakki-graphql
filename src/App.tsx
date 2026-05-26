import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import Pysakki from "./Pysakki.tsx";
import { useEffect, useState } from 'react';

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
      <div>
        <p>Auto refresh active</p>
        <button onClick={refresh}>Update data now</button>
      </div>
      {timeNow.toLocaleString('fi-FI')}
      <Pysakki pysakki={pysakki!} />
    </div>
  );
}