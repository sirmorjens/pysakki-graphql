import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import Agency from "./Agency.tsx";

export default function App() {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        agencies {
          name
          ...Agency_item
        }
      }
    `,
    {}
  );

  const agencies = data?.agencies?.filter((agency) => agency != null);

  return (
    <div>
      <h1>Agencies</h1>
      {agencies?.map((agency) => (
        <Agency key={agency.name} agency={agency} />
      ))}
    </div>
  );
}