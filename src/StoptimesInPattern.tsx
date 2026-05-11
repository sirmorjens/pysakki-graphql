import { graphql, useFragment } from "react-relay";
import type { StoptimesInPatternFragment$key } from "./__generated__/StoptimesInPatternFragment.graphql";
import Pattern from "./Pattern";
import Stoptime from "./Stoptime";;

type Props = {
  stoptimesInPattern: StoptimesInPatternFragment$key;
};

export default function StoptimesInPattern({stoptimesInPattern}: Props) 
    {
        const data = useFragment<StoptimesInPatternFragment$key>(
            graphql`
                fragment StoptimesInPatternFragment on StoptimesInPattern
                {
                    pattern {
                        ...PatternFragment
                    }
                    stoptimes {
                        ...StoptimeFragment
                    }
                }
            `, stoptimesInPattern
        )
        let rows = [];
        for(var i = 0, l = data.stoptimes.length; i < l; i++) {
            rows.push(<Stoptime stoptime={data.stoptimes[i]}/>)
        }
        return(
            <div>
                <Pattern pattern={data.pattern} />
                {rows}
            </div>
        )
    };