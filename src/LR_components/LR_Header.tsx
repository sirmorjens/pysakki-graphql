import { graphql, useLazyLoadQuery } from "react-relay";
import LRstyle from './Styles/LRstyle.module.css'
import type { LRHeaderQuery } from "./__generated__/LRHeaderQuery.graphql";

export default function LR_Header () {

    const data = useLazyLoadQuery<LRHeaderQuery>(
        graphql`
        query LRHeaderQuery {
            stop(id: "Lahti:104167") # tähän pysäkin gtfsID eg. "Lahti:103653", "Lahti:104030"
            # täytyy compilaa uudestaan id:n vaihdon jälkeen - npx relay-compiler
            {
                name(language: "fi")
            }
        }
        `,
        {},
        {}
    );
    console.log("LR HEDER UNR")
    const nimi = data.stop!.name

    const date = new Date();
    const kello: string = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`

    return (
        <div className={LRstyle.header}>
            <div className={LRstyle.stopname}>{nimi}</div>
            <div className={LRstyle.time}>{kello}</div>
        
        </div>
    )

}