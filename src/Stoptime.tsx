import { graphql, useFragment } from "react-relay";
import type { StoptimeFragment$key } from "./__generated__/StoptimeFragment.graphql";
// import Alerts from "./Alerts";

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
                    realtimeArrival # reaaliaikainen saapumisaika sekunteina
                    scheduledArrival # suunniteltu saapumisaika sekunteina
                    realtimeState # ADDED, CANCELED, MODIFIED, SCHEDULED, UPDATED
                    stop 
                    {
                        gtfsId
                    }
                    trip 
                    {
                        routeShortName # reittikoodi
                        pattern 
                        {
                            vehiclePositions 
                            {
                                stopRelationship 
                                {
                                    status
                                    stop 
                                    {
                                        gtfsId
                                    }
                                }
                            }
                        }
                        # alerts 
                        # {
                        #     ...alertsFragment
                        # }
                    }
                }
            `, stoptime
        )
        let realSeconds = data.realtimeArrival!.valueOf();
        let scheduledSeconds = data.scheduledArrival!.valueOf();
        let realTime = "";
        let scheduledTime = new Date(scheduledSeconds * 1000).toISOString().slice(11, 16); // hh:mm
        let cancelState:String = "";
        let arrivalState:String = "";
        let vehpos = data.trip?.pattern?.vehiclePositions;

        // let alertRows = [];
    
        // for(var i = 0; i < data.trip!.alerts!.length; i++) {
        //     alertRows.push(<Alerts alert={data.trip!.alerts![i]!}/>)
        // }

        if(data.realtimeState == "CANCELED") { cancelState = "Peruttu" }
        for(let i = 0; i<vehpos?.length!; i++)
        {
            if(vehpos![i]!.stopRelationship!.stop.gtfsId == data!.stop!.gtfsId && cancelState != "Peruttu")
            {
                // merkitsee vuoron saapuvaksi jos pysäkin id ja vuoron status täsmää
                // ei tee tällä hetkellä mitään koska lsl ei käytä tätä infoa vaikka hsl käyttää
                if(vehpos![i]!.stopRelationship!.status == "INCOMING_AT") { arrivalState = "Saapuu" }
            }
        }

        if(realSeconds != scheduledSeconds) {
            // let tilanne:String = "";
            // if(realSeconds>scheduledSeconds) {tilanne = "myöhässä"}else {tilanne = "etuajassa"}

            // pyöristää ylös lähimpään minuuttiin
            if(realSeconds%60>30) { realTime = new Date((realSeconds + 60-realSeconds%60) * 1000).toISOString().slice(11, 16); }

            else { realTime = new Date(realSeconds * 1000).toISOString().slice(11, 16); }

            return( // palauttaa päivitetyn ajan jos sellainen löytyy
                    // reittikoodi, määränpää, aika (reaali), onko vuoro peruttu
                <p className="trip">
                    <b className="reittikoodi">{data.trip!.routeShortName}</b> <br />
                    <b className="paikka">{data.headsign}</b> <br />
                    <b className="oikeaaika">{realTime}</b>
                    <b className="reittihäiriö"><span>{cancelState}</span></b>
                    <b className="saapumistila">{arrivalState}</b>
                </p> 
            )
        }else return( // reittikoodi, määränpää, aika (suunniteltu), onko vuoro peruttu
            <p className="trip">
                <b className="reittikoodi">{data.trip!.routeShortName}</b> <br />
                <b className="paikka">{data.headsign}</b> <br />
                <b className="aika">{scheduledTime}</b>
                <b className="reittihäiriö"><span>{cancelState}</span></b>
                <b className="saapumistila">{arrivalState}</b>
            </p>) 

    };