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
                    alertCause
                    alertDescriptionText
                    alertEffect
                    alertSeverityLevel
                }
            `, alert
        )
        return(
            <p>{data.alertCause}, {data.alertDescriptionText}, {data.alertEffect}, {data.alertSeverityLevel},</p>
        )
    };