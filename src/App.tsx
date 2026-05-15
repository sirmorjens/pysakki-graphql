import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
// import Agency from "./Agency.tsx";
import Pysakki from "./Pysakki.tsx";

export default function App() {
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
    {}
  );

  const pysakki = data.stop;
  let timeNow = new Date();

  return ( // päivämäärä
           // haetut tiedot
    <div>
      {timeNow.toLocaleString('fi-FI')}
      <Pysakki pysakki={pysakki!} />
    </div>
  );
}