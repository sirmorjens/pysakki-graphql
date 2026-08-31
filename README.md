# React + TypeScript + Vite

## DEV
npm run dev - jos ei api-avainta, pyytää luomaan sen

## BUILD AND DEPLOY
./upload.sh - pyytää muutamia tietoja ja lataa ssh-yhteyden yli annettuun osoitteeseen


https://portal-api.digitransit.fi/
täältä apikey 'Routing v2 Waltti GTFS - v1' -apiin ja  tee .env.local tiedosto johon:
VITE_DIGITRANSIT_SUBSCRIPTION_KEY=oma_avain