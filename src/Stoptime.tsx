import { graphql, useFragment } from "react-relay";
import type { StoptimeFragment$key } from "./__generated__/StoptimeFragment.graphql";
import Alerts from "./Alerts";

type Props = {
  stoptime: StoptimeFragment$key;
};

export default function Stoptime({stoptime}: Props) {
    const data = useFragment<StoptimeFragment$key>(
        graphql`
            fragment StoptimeFragment on Stoptime
            {
                headsign # määränpää
                realtimeArrival # reaaliaikainen saapumisaika sekunneissa
                scheduledArrival # suunniteltu saapumisaika sekunneissa
                serviceDay # helpompi mätsätä timestamppeja kun on päivä
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

    const currentTime = new Date();
    const scheduledTime = new Date( (data.scheduledArrival ?? 0) * 1000 )
    const arrivalTime = new Date( ( (data.serviceDay ?? 0) + (data.realtimeArrival ?? 0)) * 1000 )
    const [hours, minutes] = [arrivalTime.getHours(), arrivalTime.getMinutes()]
    const minutesVsHHMMThreshold = 1000*60*10 // arrivals inside ten minutes displayed as minutes

    const time: {
        minutes?: number | null,
        time?: string,
    } = (arrivalTime.getTime() - currentTime.getTime()) < minutesVsHHMMThreshold ? 
                {minutes: Math.floor( ( (arrivalTime.getTime() - currentTime.getTime()) / 1000 / 60) - 1)} : 
                {minutes: null, time: `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`}

    // 
    if( time.minutes && time.minutes < -1 ) return (false)

    return (
        <div className="stopRow">
            <p className="route">{data.trip?.routeShortName}</p>
            <div className="destination_time">
                <p className="destination">{data.headsign?.split(" - ").slice(-1)} <span style={{fontSize: "9mm", fontWeight: 600}}>via {data.headsign?.split(" - ").slice(-3,-1).join(", ")}</span></p>
                <p className="time">{Math.random() > 0.6 ? <span>~</span> : ""}{time.minutes != null ? Math.max( time.minutes, 0 ).toString() + " min" : time.time}</p>
            </div>
        </div>
    )

};