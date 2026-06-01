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
                realtime
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

    const minutesVsHHMMThreshold = 1000*60*10 // arrivals inside ten minutes displayed as minutes

    const currentTimeStamp = Date.now();
    const isRealTime: boolean = data.realtime ? true : false
    const arrivalTime = new Date( ( (data.serviceDay ?? 0) + (isRealTime ? data.realtimeArrival : data.scheduledArrival)) * 1000 )

    const [hours, minutes] = [arrivalTime.getHours(), arrivalTime.getMinutes()]
    const minutesLeft: number | null = (arrivalTime.getTime() - currentTimeStamp) < minutesVsHHMMThreshold ? Math.floor( ( (arrivalTime.getTime() - currentTimeStamp) / 1000 / 60) - 1) : null

const timeTxt: string = minutesLeft != null ? `${Math.max(minutesLeft, 0)} min` : `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}` 

    const [destinationTxt, viaTxt]: [destinationTxt: string, viaTxt: string] = [
        data.headsign!.split(" via ").slice(0,1).join(),
        data.headsign!.split(" via ").slice(-1).join().split(" - ").join(", ")
    ]


    return (
        <div className="stopRow">
            <p className="route">{data.trip?.routeShortName}</p>
            <div className="destination_time">
                <p className="destination">{destinationTxt} <span style={{fontSize: "9mm", fontWeight: 600}}>via {viaTxt}</span></p>
                <p className="time">{isRealTime ? "" : <span>~</span>}{timeTxt}</p>
            </div>
        </div>
    )

};