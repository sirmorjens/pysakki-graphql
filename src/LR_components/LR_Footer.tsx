import { PysakkiSettings } from '../PysakkiSettings'
import LRstyle from './Styles/LRstyle.module.css'

import qr from '../assets/qrcode.png'
import temp_logo from '../assets/temp_logo.png'

export default function LR_Footer () {

    // default 
    return !PysakkiSettings.d13 ? (
        <div className={LRstyle.footer}>
            <div className={LRstyle.cta}>
                <div>
                    <img src={qr} alt="https://www.lsl.fi/naytot/" />
                </div>
                <div><p>Kerro mielipiteesi pysäkkinäytöstä<br /><span className={LRstyle.link}>https://www.lsl.fi/naytot/</span></p></div>
            </div>
            <div className={LRstyle.logo}><img src={temp_logo} alt="LSL" /></div>
        </div>

    ) :  // 13inch version (display with LSL branding - don't show logo here)
    (
        <div className={LRstyle.footer13inch}>
            <div className={LRstyle.cta}>
                <div>
                    <img src={qr} alt="https://www.lsl.fi/naytot/" />
                </div>
                <div><p>Kerro mielipiteesi pysäkkinäytöstä<br /><span className={LRstyle.link}>https://www.lsl.fi/naytot/</span></p></div>
            </div>
        </div>

    )

   




}