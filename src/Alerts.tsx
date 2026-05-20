import { graphql, useFragment } from "react-relay";
import type { AlertsFragment$key } from "./__generated__/AlertsFragment.graphql";

type Props = {
  alert: AlertsFragment$key;
};

export default function Alerts({alert}: Props) 
    {
        const data = useFragment<AlertsFragment$key>(
            graphql`
                fragment AlertsFragment on Alert
                {
                    alertCause # syy häiriölle | ACCIDENT, CONSTRUCTION, DEMONSTRATION, HOLIDAY, MAINTENANCE, MEDICAL_EMERGENCY, OTHER_CAUSE, POLICE_ACTIVITY, STRIKE, TECHNICAL_PROBLEM, UNKNOWN_CAUSE, WEATHER
                    alertDescriptionText(language: $kieli) # häiriön selitys, argumenttina kieli ("fi", "sv", "en") muuttuja App.tsx
                    alertEffect # häirion vaikutus | ACCESSIBILITY_ISSUE, ADDITIONAL_SERVICE, DETOUR, MODIFIED_SERVICE, NO_EFFECT, NO_SERVICE, OTHER_EFFECT, REDUCED_SERVICE, SIGNIFICANT_DELAYS, STOP_MOVED, UNKNOWN_EFFECT
                    alertSeverityLevel # häiriön vakavuus | INFO, SEVERE, UNKNOWN_SEVERITY, WARNING
                }
            `, alert
        )

        let severity = <i>no icon</i>
        switch(data.alertSeverityLevel){
            case "INFO":
                console.log("info")
                break;
            case "SEVERE":
                console.log("severe")
                break;
            case "UNKNOWN_SEVERITY":
                console.log("unknown")
                break;
            case "WARNING":
                console.log("warning")
                severity = <svg width="30" height="30"><polygon points="30,30 15,5 0,30" style={{fill:"yellow", stroke:"purple", strokeWidth:"2"}} /></svg>
                break;
        }

        return(
            <span>{data.alertDescriptionText} </span>
        )
    };