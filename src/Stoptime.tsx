import { PysakkiSettings } from "./PysakkiSettings";
import { MAX_DESTINATION_LETTERS, nowInLahti, type RowData, type PatternStopTime, type AlertData } from "./PysakkiUtils";

function WarningSign () {
    return (
        <svg className="warning" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="black" d="M2.725 21q-.275 0-.5-.137t-.35-.363t-.137-.488t.137-.512l9.25-16q.15-.25.388-.375T12 3t.488.125t.387.375l9.25 16q.15.25.138.513t-.138.487t-.35.363t-.5.137zm9.988-3.287Q13 17.425 13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18t.713-.288m0-3Q13 14.425 13 14v-3q0-.425-.288-.712T12 10t-.712.288T11 11v3q0 .425.288.713T12 15t.713-.288" />
        </svg>
    )
}

function InfoSign () {
    return (
    <svg className="warning" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	    <path d="M0 0h24v24H0z" fill="none" />
	    <path fill="#000" d="M12.713 16.713Q13 16.425 13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17t.713-.288m0-8Q13 8.425 13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9t.713-.288M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
    </svg>


    )
}


    const arrivalTimeToString = (pattern: PatternStopTime): string => {
        const time = new Date( (pattern.serviceDay + pattern.realtimeArrival) * 1000 )
        console.log("Arrivaltime")
        console.log(time.getTime())
        return `${time.getHours().toString().padStart(2,"0")}:${time.getMinutes().toString().padStart(2,"0")} `
    }



type Props = {
  rowdata: RowData /* run graphql codegen and include other possible types */;
  patternsLookUp?: {
    [route: string]: PatternStopTime[]
  }
};

export default function Stoptime({rowdata, patternsLookUp}: Props) {
    

    // jos alert ruutu, palautetaan rivi ja lopetetaan ajoissa

    if( rowdata.RowType === 'ROUTEALERT' )
    {
        return (
            <div className={"alertRow " + rowdata.Alert!.alertSeverityLevel}>
                <p className="route"><WarningSign /></p>
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
                {rowdata!.Alert!.isHeading  && rowdata!.Alert!.alertSeverityLevel !== 'INFO' && 
                    <p className="route">{!rowdata!.Alert!.headingContinued /* jos otsikko monella rivillä, varoitusmerkki vain ensimmäiselle riville */  && <WarningSign />}</p>
                }
                {rowdata!.Alert!.isHeading  && rowdata!.Alert!.alertSeverityLevel == 'INFO' && 
                    <p className="route">{!rowdata!.Alert!.headingContinued && <InfoSign />}</p>
                }
                <p className={"destination alert red stopalert " + (rowdata.Alert!.isHeading ? "alertHeading" : "")}>
                    {rowdata.Alert!.displayAlertText}
                </p>

            </div>
            
        )
    }



    // jos aikatauluruutu, tämä koodi ajetaan

    // adjust minutes offset (say bus leaves when display still shows 1 min remaining)
    // negative numbers 1->5 = time is 5 mins less (5 minutes earlier than data)
    const offsetMinutes = PysakkiSettings.offsetMinutes

    const patterns = patternsLookUp![rowdata.StopTime.trip!.routeShortName!].slice(1).map(ptr => arrivalTimeToString(ptr) );

    const minutesVsHHMMThreshold = 1000 * 60 * 10 // arrivals inside ten minutes displayed as minutes

    // nowInLahti is an utility function to get timezone specific time
    const currentTimeStamp = nowInLahti().getTime();

    console.log("Current:")
    console.log(currentTimeStamp)
    const isRealTime: boolean = rowdata.StopTime.realtime ? true : false
    const arrivalTime = nowInLahti( ( (rowdata.StopTime.serviceDay ?? 0) + (isRealTime ? rowdata.StopTime.realtimeArrival : rowdata.StopTime.scheduledArrival)) * 1000 )

    const [hours, minutes] = [arrivalTime.getHours(), arrivalTime.getMinutes()]
    const minutesLeft: number | null = (arrivalTime.getTime() - currentTimeStamp) < minutesVsHHMMThreshold ? Math.floor( ( (arrivalTime.getTime() - currentTimeStamp) / 1000 / 60) - offsetMinutes) : null

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
            
            <p className={"route " + (rowdata.StopTime.trip?.routeShortName.length > 2 ? "longRouteName" : "") /* longer routenames get smaller display size */}>

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
                        destinationTxt.length < Math.ceil( MAX_DESTINATION_LETTERS.withViaTxt ) &&
                        viaTxt != null ? 
                        <span>
                            via <span className="viaDests">{viaTxt.slice(0, MAX_DESTINATION_LETTERS.viaTxt)}</span>
                        </span>
                        : ""
                    }   
                </p>
                    
                <p className="time">
                    {isRealTime ? "" : <span>~</span>}
                    {rowdata.StopTime.timezone}
                    {timeTxt} {minutesLeft == null ? "" : <span className="min">min</span>}
                </p>
                
                <p className="tulevatajat hidden">{patterns.slice(1,3)}</p>
            </div>

        </div>
        
    )

};
