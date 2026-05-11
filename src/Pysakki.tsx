import { graphql, useFragment } from "react-relay";

import type { PysakkiFragment$key } from "./__generated__/PysakkiFragment.graphql";

import Alerts from "./alerts";
import StoptimesInPattern from "./StoptimesInPattern";

export default function Pysakki(props: { pysakki: PysakkiFragment$key; }) 
{
    const data = useFragment<PysakkiFragment$key>(
    graphql`
      fragment PysakkiFragment on Stop
      {
        name
        gtfsId
        stoptimesForPatterns
        {
            ...StoptimesInPatternFragment
        }
        alerts
        {
            ...AlertsFragment
        }
    }
    `,
    props.pysakki
    )
    let rows = [];
    for(var i = 0, l = data.stoptimesForPatterns.length; i < l; i++) {
        rows.push(<StoptimesInPattern stoptimesInPattern={data.stoptimesForPatterns[i]}/>)
    }
    return ( 
        <div>
            <b>{data.name}</b>: <i>{data.gtfsId}</i> <br />
            {rows} <br />
            <Alerts alert = {data.alerts[0]} />

        </div>    
    )
};