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
                    realtimeArrival # reaaliaikainen saapumisaika sekunteina
                    scheduledArrival # suunniteltu saapumisaika sekunteina
                    realtimeState # ADDED, CANCELED, MODIFIED, SCHEDULED, UPDATED

                    trip 
                    {
                        routeShortName # reittikoodi
                    }
                }
            `, stoptime
        )
        
        const realSeconds = data.realtimeArrival!.valueOf();
        const scheduledSeconds = data.scheduledArrival!.valueOf();

        let shownTime = new Date(scheduledSeconds * 1000).toISOString().slice(11, 16); // hh:mm

        let cancelState= "";
        let arrivalState= "";
        let aikaClass = "aika"

        let d = new Date();
        let secondsNow = Math.round(d.getTime() / 1000)%86400;

        // merkitään bussi saapuvaksi jos saapumisaika lähestyy
        if((realSeconds-3600*3)-secondsNow <= 30) { arrivalState = "Saapuu" }

        if(realSeconds != scheduledSeconds) {
            aikaClass = "oikeaaika"
            // pyöristää ylös lähimpään minuuttiin
            if(realSeconds%60>30) { shownTime = new Date((realSeconds + 60-realSeconds%60) * 1000).toISOString().slice(11, 16); }

            else { shownTime = new Date(realSeconds * 1000).toISOString().slice(11, 16); }

            if(data.realtimeState == "CANCELED") { cancelState = "Peruttu"; aikaClass = "peruttuaika" }

        } 

        return( // reittikoodi, määränpää, aika (suunniteltu), onko vuoro peruttu
            <p className="trip">
                <b className="reittikoodi">{data.trip!.routeShortName}</b> <br />
                <b className="paikka">{data.headsign}</b> <br />
                <b className={aikaClass}>{shownTime}</b>
                <b className="reittihäiriö">{cancelState}</b>
                <b className="saapumistilanne">{arrivalState}</b>
            </p>
        ) 

    };