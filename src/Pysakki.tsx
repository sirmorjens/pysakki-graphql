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
    let stopRows = [];
    let alertRows = [];
    for(var i = 0, l = data.stoptimesForPatterns.length; i < l; i++) {
        stopRows.push(<StoptimesInPattern stoptimesInPattern={data.stoptimesForPatterns[i]}/>)
    }

    for(var i = 0, l = data.alerts.length; i < l; i++) {
        stopRows.push(<Alerts alert={data.alerts[i]}/>)
    }
    return ( 
        <div>
            <b>{data.name}</b>: <i>{data.gtfsId}</i> <br />
            {alertRows}
            {stopRows} <br />

        </div>    
    )
};