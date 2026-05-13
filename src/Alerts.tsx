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
                    alertCause # syy häiriölle
                    alertDescriptionText(language:"fi") # häiriön selitys, argumenttina kieli ("fi", "sv", "en")
                    alertEffect # häirion vaikutus
                    alertSeverityLevel # häiriön vakavuus
                }
            `, alert
        )
        return( // palauttaa kaiken plaintekstinä, todnäk tarvitsee vain data.alertDescriptionText, loput voi muuntaa iconeiksi tai jotain
            <p>{data.alertCause}, {data.alertDescriptionText}, {data.alertEffect}, {data.alertSeverityLevel},</p>
        )
    };