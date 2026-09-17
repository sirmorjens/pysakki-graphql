import PysakkiMapStyle from './PysakkiMap.module.css'
import fillari from "./assets/fillari.svg"
export default function MapLegend () {

    return (
    <div className="legend">
        <div className="row">
            <div className={PysakkiMapStyle.inch13Rentals}></div>
            =
            <div className={PysakkiMapStyle.fillari13inch}>
                <img src={fillari} alt="Fillari" /> 
            </div>
        </div>
    </div>
    )
}