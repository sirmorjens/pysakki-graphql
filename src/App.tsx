import Pysakki from "./Pysakki.tsx";
import LR_Header from './LR_components/LR_Header.tsx'
import LR_Footer from './LR_components/LR_Footer.tsx'
import PysakkiMap from "./PysakkiMap.tsx"

import { useEffect } from 'react';

import '@fontsource/barlow-semi-condensed/100.css';
import '@fontsource/barlow-semi-condensed/200.css';
import '@fontsource/barlow-semi-condensed/300.css';
import '@fontsource/barlow-semi-condensed/400.css';
import '@fontsource/barlow-semi-condensed/500.css';
import '@fontsource/barlow-semi-condensed/600.css';
import '@fontsource/barlow-semi-condensed/700.css';
import '@fontsource/barlow-semi-condensed/800.css';
import '@fontsource/barlow-semi-condensed/900.css';

import '@fontsource-variable/inter/wght.css';
import '@fontsource/barlow/100.css';
import '@fontsource/barlow/200.css';
import '@fontsource/barlow/300.css';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow/800.css';
import '@fontsource/barlow/900.css';

export default function App() {

  useEffect(() => {

    // error handleri
    /*
      jos jostain tulee throw mikävaan error
      voidaan esim asettaa pieni viive ja refreshata sivu
      niin pitäisi toimia kentällä
    */
    const onError = (event: Event) => console.log("Error", event);
      
    window.addEventListener('error', onError);
    
    return () => {
      window.removeEventListener('error', onError);
    }
  }, []);

  return (

    <div className="LR_mainContainer">
      <LR_Header />
      <Pysakki />
      <PysakkiMap />
      <LR_Footer />
    </div>

  );
}