import { graphql, useLazyLoadQuery } from "react-relay";
import LRstyle from './Styles/LRstyle.module.css'
import type { LRHeaderQuery } from "./__generated__/LRHeaderQuery.graphql";
import { PysakkiSettings } from "../PysakkiSettings";
import { useState, useEffect } from "react";

const currentTimeString = (): string => {
    const date = new Date();
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
}

export default function LR_Header () {

    const stopId = PysakkiSettings.stopId;
    const refreshRateSec = PysakkiSettings.refreshRateSec

    const data = useLazyLoadQuery<LRHeaderQuery>(
        graphql`
        query LRHeaderQuery ($id: String!) {
            stop(id: $id) # tähän pysäkin gtfsID eg. "Lahti:103653", "Lahti:104030"
            # täytyy compilaa uudestaan id:n vaihdon jälkeen - npx relay-compiler
            {
                name(language: "fi")
            }
        }
        `,
        {"id": stopId,},
        {}
    );

    const nimi = (!data || !data.stop) ? "Stop not found" : data.stop!.name

    const [currentTime, setCurrentTime] = useState(currentTimeString());

    useEffect(() => {

        const intervalId = setInterval(() => {
            setCurrentTime(currentTimeString())
            
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