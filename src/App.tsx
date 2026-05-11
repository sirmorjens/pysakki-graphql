import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
// import Agency from "./Agency.tsx";
import Pysakki from "./pysakki.tsx";

export default function App() {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        stop(id: "Lahti:103653") {
          ...PysakkiFragment
        }
      }
    `,
    {}
  );

  const pysakki = data.stop;
  let timeNow = new Date();

  return (
    <div>
      {timeNow.toLocaleString('fi-FI')}
      <Pysakki pysakki={pysakki} />
    </div>
  );
}