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
                    name # reitti
                    headsign # määränpää
                }
            `, pattern
        )
        return(
            <b style={{marginBottom:"5px"}} id="pattern">{data.name}, {data.headsign}</b>
        )
    };