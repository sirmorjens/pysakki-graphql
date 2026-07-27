

import type { RentalsMarkersRentalsFragment$key } from "./__generated__/RentalsMarkersRentalsFragment.graphql";
import { Marker } from "@vis.gl/react-maplibre";
import { useFragment, graphql } from "react-relay";
import PysakkiMapStyle from './PysakkiMap.module.css'
import fillari from "./assets/fillari.svg"

type Props = {
    vehicleRentalsByBbox: RentalsMarkersRentalsFragment$key;
}

export default function RentalsMarkers ({vehicleRentalsByBbox}: Props) {
  const rentalsData = useFragment<RentalsMarkersRentalsFragment$key>(
    graphql`
      fragment RentalsMarkersRentalsFragment on VehicleRentalStation @relay(plural: true)
      {
        lat
        lon
      }
    `,
    vehicleRentalsByBbox
  )
    return (
        <>
          {rentalsData.map((rentalStation, idx) => 
            <Marker key={idx} latitude={rentalStation.lat!} longitude={rentalStation.lon!}>
              <div className={PysakkiMapStyle.fillari}>
                <img src={fillari} alt="Fillari" />
              </div>
            </Marker>
          )}    
        </>
    )


}