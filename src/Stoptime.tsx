import { graphql, useFragment } from "react-relay";
import type { StoptimeFragment$key } from "./__generated__/StoptimeFragment.graphql";

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
                    }
                }
            `, stoptime
        )
        let realSeconds = data.realtimeArrival.valueOf();
        let scheduledSeconds = data.scheduledArrival.valueOf();
        let realTime = new Date(realSeconds * 1000).toISOString().slice(11, 16); // hh:mm
        let scheduledTime = new Date(scheduledSeconds * 1000).toISOString().slice(11, 16); // hh:mm

        if(realSeconds != scheduledSeconds) {
            let tilanne:String = "";
            if(realSeconds>scheduledSeconds) {tilanne = "myöhässä"}else {tilanne = "etuajassa"}

            return( // palauttaa päivitetyn ajan jos sellainen löytyy
                    // reittikoodi // määränpää --- tilanne: hh:mm
                <p style={{float:"left", marginLeft:"10px", marginRight:"500px"}}>
                    <b>{data.trip.routeShortName} // {data.headsign}</b> --- {tilanne}: <b>{realTime}</b><br />
                </p> 
            )
        }else return( // reittikoodi // määränpää --- hh:mm
            <p style={{float:"left", marginLeft:"10px", marginRight:"500px"}}>
                <b>{data.trip.routeShortName} // {data.headsign}</b> --- <b>{scheduledTime}</b><br />
            </p>) 

    };