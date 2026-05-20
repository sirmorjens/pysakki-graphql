import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
// import Agency from "./Agency.tsx";
import Pysakki from "./Pysakki.tsx";

export default function App() {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery($id: String!, $departures: Int!, $kieli: String!, $cancel: Boolean!, $alkuaika: Long!) {
        stop(id: $id) 
        {
          ...PysakkiFragment #Pysakki.tsx
        }
      }
    `,
    // tähän pysäkin gtfsID (eg. "Lahti:103653", "Lahti:104030", "Lahti:103619") lähtöjen määrä, häiriöiden kieli (fi, en, sv), näytetäänkö perutut vuorot (false = näytetään) ja mistä asti vuorot haetaan (testaamiseen, pitäisi aina olla 0 eli nykyinen)
    {"id": "Lahti:104030", "departures": 14, "kieli": "fi", "cancel": false, "alkuaika": 0} // 1779248492, "Lahti:103619" peruttu vuoro testi
  );

  const pysakki = data.stop;

  return (
      // haetut tiedot
      <Pysakki pysakki={pysakki!} />
  );
}