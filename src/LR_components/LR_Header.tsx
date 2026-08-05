
import LRstyle from './Styles/LRstyle.module.css'
import { PysakkiSettings } from "../PysakkiSettings";
import { useState, useEffect } from "react";
import type { AppQuery$data } from "../__generated__/AppQuery.graphql";

const returnCurrentTimeAsString = (): string => {
    const date = new Date();
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
}

type Props = {
    queryData: AppQuery$data | null;
}

export default function LR_Header ({queryData}: Props) {

    const data = queryData
    const refreshRateSec = PysakkiSettings.refreshRateSec

    const nimi: string = (!data || !data.stop) ? "Stop not found" : data.stop!.name

    const [currentTime, setCurrentTime] = useState(returnCurrentTimeAsString());

    useEffect(() => {

        const intervalId = setInterval(() => {
            setCurrentTime(returnCurrentTimeAsString())
            
        }, refreshRateSec)

        return () => {
            clearInterval(intervalId)
        }
    })

    
    return (
        <div className={LRstyle.header}>
            <div className={LRstyle.stopname}>{nimi}</div>
            <div className={LRstyle.time}>{currentTime}</div>
        </div>
    )

}