// turha

import { graphql, useFragment } from "react-relay";
import type { Agency_item$key } from "./__generated__/Agency_item.graphql";

export default function AgenciesListItem(props: { agency: Agency_item$key; }) {
  const data = useFragment<Agency_item$key>(
    graphql`
      fragment Agency_item on Agency {
        name
        gtfsId
      }
    `,
    props.agency
  );
  return (
    <li>
        <b>{data.name}</b>: <i>{data.gtfsId}</i>
    </li>
  )
}