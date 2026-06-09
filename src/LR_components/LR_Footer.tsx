import LRstyle from './Styles/LRstyle.module.css'

import palaute from '../assets/palaute.svg'
import qr from '../assets/qrcode.png'
import temp_logo from '../assets/temp_logo.png'

export default function LR_Footer () {

    return (
        <div className={LRstyle.footer}>
            <div className={LRstyle.cta}>
                <div><img src={qr} alt="https://lsl.fi/asiakaspalvelu/palaute" /></div>
                <div><p>Kerro mielipiteesi pysäkkinäytöstä<br /><b>lsl.fi/asiakaspalvelu/palaute</b></p></div>
            </div>
            <div className={LRstyle.logo}><img src={temp_logo} alt="LSL" /></div>
        </div>

    )


}