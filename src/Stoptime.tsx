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
                    realtimeArrival
                    scheduledArrival
                }
            `, stoptime
        )
        let realSeconds = data.realtimeArrival.valueOf();
        let scheduledSeconds = data.scheduledArrival.valueOf();
        let realTime = new Date(realSeconds * 1000).toISOString().slice(11, 16); // hh:mm
        let scheduledTime = new Date(scheduledSeconds * 1000).toISOString().slice(11, 16); // hh:mm

        if(realSeconds != scheduledSeconds) {
            let tilanne:String = "";
            if(realSeconds>scheduledSeconds) {tilanne = "myöhässä"}else {tilanne = "etuajassa"}

            return(
                <p>{tilanne}: {realTime}</p> // palauttaa päivitetyn ajan jos sellainen löytyy
            )
        }else return(<p>{scheduledTime}</p>) 

    };