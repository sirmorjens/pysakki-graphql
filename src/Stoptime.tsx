import { MAX_DESTINATION_LETTERS, type RowData, type PatternStopTime, type AlertData } from "./PysakkiUtils";

function WarningSign () {
    return (
        <svg className="warning" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M2.725 21q-.275 0-.5-.137t-.35-.363t-.137-.488t.137-.512l9.25-16q.15-.25.388-.375T12 3t.488.125t.387.375l9.25 16q.15.25.138.513t-.138.487t-.35.363t-.5.137zm9.988-3.287Q13 17.425 13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18t.713-.288m0-3Q13 14.425 13 14v-3q0-.425-.288-.712T12 10t-.712.288T11 11v3q0 .425.288.713T12 15t.713-.288" />
        </svg>
    )
}



    const arrivalTimeToString = (pattern: PatternStopTime): string => {
        const time = new Date( (pattern.serviceDay + pattern.realtimeArrival) * 1000 )

        return `${time.getHours().toString().padStart(2,"0")}:${time.getMinutes().toString().padStart(2,"0")} `
    }

type Props = {
  rowdata: RowData /* run graphql codegen and include other possible types */;
  patternsLookUp: {
    [route: string]: PatternStopTime[]
  }
};

export default function Stoptime({rowdata, patternsLookUp}: Props) {
    

    // jos alert ruutu, palautetaan rivi ja lopetetaan ajoissa

    if( rowdata.RowType === 'ROUTEALERT' )
    {
        return (
            <div className={"alertRow " + rowdata.Alert!.alertSeverityLevel}>
                <p className="route">{/* <WarningSign /> */}</p>
                <p className="destination alert routealert">
                    {rowdata.Alert!.displayAlertText}
                </p>
            </div>
            
        )
    }
    if( rowdata.RowType === 'STOPALERT' )
    {
        return (
            <div className={"alertRow " + rowdata.Alert!.alertSeverityLevel}>
                <p className="destination alert stopalert">
                    {rowdata.Alert!.displayAlertText}
                </p>

            </div>
            
        )
    }

    // jos aikatauluruutu, tämä koodi ajetaan

    const patterns = patternsLookUp[rowdata.StopTime.trip!.routeShortName!].slice(1).map(ptr => arrivalTimeToString(ptr) );

    const minutesVsHHMMThreshold = 1000 * 60 * 10 // arrivals inside ten minutes displayed as minutes

    const currentTimeStamp = Date.now();
    const isRealTime: boolean = rowdata.StopTime.realtime ? true : false
    const arrivalTime = new Date( ( (rowdata.StopTime.serviceDay ?? 0) + (isRealTime ? rowdata.StopTime.realtimeArrival : rowdata.StopTime.scheduledArrival)) * 1000 )

    const [hours, minutes] = [arrivalTime.getHours(), arrivalTime.getMinutes()]
    const minutesLeft: number | null = (arrivalTime.getTime() - currentTimeStamp) < minutesVsHHMMThreshold ? Math.floor( ( (arrivalTime.getTime() - currentTimeStamp) / 1000 / 60) - 1) : null

    const timeTxt: string = minutesLeft != null ? 
        `${Math.max(minutesLeft, 0)}` : 
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}` 

    const [destinationTxt, viaTxt]: [destinationTxt: string, viaTxt: string | null] = [
        rowdata.StopTime.headsign!.split(" via ").slice(0,1).join(),
        rowdata.StopTime.headsign!.split(" via ").length > 1 ? rowdata.StopTime.headsign!.split(" via ").slice(-1).join().split(" - ").join(", ") : null
    ]

    const isCanceled = rowdata.StopTime!.realtimeState === 'CANCELED'

    return (
        <div className={"stopRow " + (isCanceled ? "canceled " : "") + (rowdata.StopTime.trip?.alerts?.length ? "alerted " : "") + (rowdata.StopTime.trip?.alerts?.length && rowdata.StopTime.trip?.alerts?.some((alert: AlertData) => alert.alertSeverityLevel == 'SEVERE') ? "SEVERE " : "")}>
            
            <p className="route">

                {rowdata.StopTime.trip?.routeShortName}

                { /* näytetään kolmio jos alertteja */ rowdata.StopTime.trip.alerts.length ? (
                    <WarningSign />
                ) : ""}
            </p>
            
            <div className="destination_time">
                <p className="destination">
                    {destinationTxt.slice(0,MAX_DESTINATION_LETTERS.destination) /* katkaistaan liian pitkä päämäärän nimi */ }
                    {destinationTxt.length > MAX_DESTINATION_LETTERS.destination ? // jos pitkä teksti ja katkaistaan, laitetaan pisteet perään
                    "..." : ""} 
                    { // jos liian pitkä osoite, ei laiteta via tekstiä
                        destinationTxt.length < Math.ceil( MAX_DESTINATION_LETTERS.viaTxt ) &&
                        viaTxt != null ? 
                        <span>
                            via <span className="viaDests">{viaTxt}</span>
                        </span>
                        : ""
                    }   
                </p>
                    
                <p className="time">
                    {isRealTime ? "" : <span>~</span>}
                    {timeTxt} {minutesLeft == null ? "" : <span className="min">min</span>}
                </p>
                
                <p className="tulevatajat hidden">{patterns.slice(1,3)}</p>
            </div>

        </div>
        
    )

};
