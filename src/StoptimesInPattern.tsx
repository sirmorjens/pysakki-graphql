// ei käytössä
import { graphql, useFragment } from "react-relay";
import type { StoptimesInPatternFragment$key } from "./__generated__/StoptimesInPatternFragment.graphql";
import Pattern from "./Pattern";
import Stoptime from "./Stoptime";

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
                        ...PatternFragment #Pattern.tsx
                    }
                    stoptimes {
                        ...StoptimeFragment #StoptimeFragment.tsx
                    }
                }
            `, stoptimesInPattern
        )

    let stoptimeMap = data.stoptimes!.toReversed().map((stoptime) => <Stoptime stoptime={stoptime!}/>)
        // let rows = [];
        // for(var i = data.stoptimes.length-1; i >= 0; i--) {
        //     rows.push(<li><Stoptime stoptime={data.stoptimes[i]}/></li>) // tulostaa ajat uusimmasta alkaen
        // }
        return(
            // reitti (reittikoodi, määränpää)
            // ajat (oikea tai suunniteltu)
            <section>
                {stoptimeMap}
                {/* {rows} */}
            </section>
        )
    };