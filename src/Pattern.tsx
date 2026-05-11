import { graphql, useFragment } from "react-relay";
import type { PatternFragment$key } from "./__generated__/PatternFragment.graphql";

type Props = {
  pattern: PatternFragment$key;
};

export default function Pattern({pattern}: Props) 
    {
        const data = useFragment<PatternFragment$key>(
            graphql`
                fragment PatternFragment on Pattern
                {
                    name
                    headsign
                }
            `, pattern
        )
        return(
            <p>{data.name}, {data.headsign}</p>
        )
    };