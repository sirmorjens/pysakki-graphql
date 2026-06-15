import { graphql, useFragment } from "react-relay";
import type { StoptimeFragment$key } from "./__generated__/StoptimeFragment.graphql";

function WarningSign () {
    return (
        <svg className="warning" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M2.725 21q-.275 0-.5-.137t-.35-.363t-.137-.488t.137-.512l9.25-16q.15-.25.388-.375T12 3t.488.125t.387.375l9.25 16q.15.25.138.513t-.138.487t-.35.363t-.5.137zm9.988-3.287Q13 17.425 13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18t.713-.288m0-3Q13 14.425 13 14v-3q0-.425-.288-.712T12 10t-.712.288T11 11v3q0 .425.288.713T12 15t.713-.288" />
        </svg>
    )
}

type PatternStopTime = {
    serviceDay: number,
    realtimeArrival: number,
    headsign: string;
    trip: {
        routeShortName: string;
    }
}

    const arrivalTimeToString = (pattern: PatternStopTime): string => {
        const time = new Date( (pattern.serviceDay + pattern.realtimeArrival) * 1000 )

        return `${time.getHours().toString().padStart(2,"0")}:${time.getMinutes().toString().padStart(2,"0")} `
    }

type Props = {
  stoptime: StoptimeFragment$key;
  patternsLookUp: {
    [route: string]: PatternStopTime[]
  }
};

export default function Stoptime({stoptime, patternsLookUp}: Props) {

    const MAX_DESTINATION_LETTERS = 16

    const data = useFragment<StoptimeFragment$key>(
        graphql`
            fragment StoptimeFragment on Stoptime
            {
                headsign # määränpää
                realtime
                realtimeArrival # reaaliaikainen saapumisaika sekunneissa
                scheduledArrival # suunniteltu saapumisaika sekunneissa
                serviceDay # helpompi mätsätä timestamppeja kun on päivä
                realtimeState
                trip {
                    routeShortName # reittikoodi
                    alerts {
                        ...AlertsFragment
                    }
                }
            }
        `, stoptime
    )

    const patterns = patternsLookUp[data.trip!.routeShortName!].slice(1).map(ptr => arrivalTimeToString(ptr) );

    const minutesVsHHMMThreshold = 1000 * 60 * 10 // arrivals inside ten minutes displayed as minutes

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

    const isCanceled = data!.realtimeState === 'CANCELED'

    return (
        <div className={"stopRow " + (isCanceled ? "canceled" : "")}>
            
            <p className="route">

                {data.trip?.routeShortName}

                { /* milloin näytetään kolmio (poikkeusreitti tai muu reittitiedote) */ isCanceled ? (
                    <WarningSign />
                ) : ""}
            </p>
            
            <div className="destination_time">
                <p className="destination">
                    {destinationTxt.slice(0,MAX_DESTINATION_LETTERS)}
                    {destinationTxt.length > MAX_DESTINATION_LETTERS ? 
                    "..." : ""} 
                    {destinationTxt.length < Math.ceil( MAX_DESTINATION_LETTERS / 1.5)? 
                    <span>
                        via <span className="viaDests">{viaTxt}</span>
                    </span>
                    : ""}   
                </p>
                    
                <p className="time">
                    {isRealTime ? "" : <span>~</span>}
                    {timeTxt}
                </p>
                
                <p className="tulevatajat hidden">{patterns.slice(1,3)}</p>
            </div>

        </div>
        
    )

};
