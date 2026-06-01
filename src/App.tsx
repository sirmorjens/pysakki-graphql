import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useEffect, useState } from 'react';
import Pysakki from "./Pysakki.tsx";

export default function App() {

  const [refreshedQueryOptions, setRefreshedQueryOptions] = useState({fetchKey: 0});

  const refreshRate = 60 * 1000;

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
  }, []);

  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery($id: String!, $inPatternDepartures: Int!, $departures: Int!, $kieli: String!, $cancel: Boolean!, $alkuaika: Long!) {
        stop(id: $id) 
        {
          ...PysakkiFragment #Pysakki.tsx
        }
      }
    `,
    // tähän pysäkin gtfsID (eg. "Lahti:103653", "Lahti:104167") lähtöjen määrä, häiriöiden kieli (fi, en, sv), näytetäänkö perutut vuorot (false = näytetään) ja mistä asti vuorot haetaan (testaamiseen, pitäisi aina olla 0 eli nykyinen)
    {"id": "Lahti:104167", "departures": 10, "kieli": "en", "cancel": false, "alkuaika": 0, "inPatternDepartures": 5},
    refreshedQueryOptions ?? {}
  );

  const pysakki = data.stop;
  if(data.stop != null) {
    return (
        // haetut tiedot
        <Pysakki pysakki={pysakki!} />
    );
  } else return (
    <h1>Virhe haettaessa dataa</h1>
  )

}