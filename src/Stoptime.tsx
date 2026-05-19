import { graphql, useFragment } from "react-relay";
import type { StoptimeFragment$key } from "./__generated__/StoptimeFragment.graphql";
import Alerts from "./Alerts";

type Props = {
  stoptime: StoptimeFragment$key;
};

export default function Stoptime({stoptime}: Props) 
    {
        const data = useFragment<StoptimeFragment$key>(
            graphql`
                fragment StoptimeFragment on Stoptime
                {
                    headsign # määränpää
                    realtimeArrival # reaaliaikainen saapumisaika sekunneissa
                    scheduledArrival # suunniteltu saapumisaika sekunneissa
                    trip {
                        routeShortName # reittikoodi
                        alerts {
                            ...AlertsFragment
                        }
                    }
                }
            `, stoptime
        )
        let realSeconds = data.realtimeArrival!.valueOf();
        let scheduledSeconds = data.scheduledArrival!.valueOf();
        let realTime = "";
        let scheduledTime = new Date(scheduledSeconds * 1000).toISOString().slice(11, 16); // hh:mm

        let alertRows = [];
    
        for(var i = 0; i < data.trip!.alerts!.length; i++) {
            alertRows.push(<Alerts alert={data.trip!.alerts![i]!}/>)
        }

        if(realSeconds != scheduledSeconds) {
            let tilanne:String = "";
            if(realSeconds>scheduledSeconds) {tilanne = "myöhässä"}else {tilanne = "etuajassa"}
        
        if(realSeconds%60>30) {realTime = new Date((realSeconds + 60-realSeconds%60) * 1000).toISOString().slice(11, 16);} // pyöristää ylös lähimpään minuuttiin
        else {realTime = new Date(realSeconds * 1000).toISOString().slice(11, 16);}

            return( // palauttaa päivitetyn ajan jos sellainen löytyy
                    // reittikoodi // määränpää --- tilanne: hh:mm
                <p className="trip">
                    <b className="reittikoodi">{data.trip!.routeShortName} </b><br /> <b className="paikka">{data.headsign}</b><br />
                    <b className="aika" style={{color:"limegreen"}}>{realTime}</b>
                    {alertRows}
                </p> 
            )
        }else return( // reittikoodi // määränpää --- hh:mm
            <p className="trip">
                <b className="reittikoodi">{data.trip!.routeShortName} </b><br /> <b className="paikka">{data.headsign}</b><br /> <b className="aika">{scheduledTime}</b>
                {alertRows}
            </p>) 

    };