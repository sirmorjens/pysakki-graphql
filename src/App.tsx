import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
// import Agency from "./Agency.tsx";
import Pysakki from "./Pysakki.tsx";

export default function App() {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery($id: String!, $departures: Int!, $kieli: String!) {
        stop(id: $id) 
        {
          ...PysakkiFragment #Pysakki.tsx
        }
      }
    `,
    // tähän pysäkin gtfsID eg. "Lahti:103653", "Lahti:104030", lähtöjen määrä ja häiriöiden kieli (fi, en, sv)
    {"id": "Lahti:104030", "departures": 21, "kieli": "fi"}
  );

  const pysakki = data.stop;

  return ( // päivämäärä
           // haetut tiedot
      <Pysakki pysakki={pysakki!} />
  );
}