# React + TypeScript + Vite

## DEV
npm run dev - jos ei api-avainta, pyytää luomaan sen

## BUILD AND DEPLOY
./upload.sh - pyytää muutamia tietoja ja lataa ssh-yhteyden yli annettuun osoitteeseen

## Api-avaimen saa täältä
https://portal-api.digitransit.fi/
täältä apikey 'Routing v2 Waltti GTFS - v1' -apiin ja  tee .env.local tiedosto johon:
VITE_DIGITRANSIT_SUBSCRIPTION_KEY=oma_avain

## Osoiteriviasetukset

###id
Pysäkin GTFS-id. 
Esim `?id=Lahti:123456`

###refreshRateSec
Näkymän ja tietojen päivitysväli, oletus 30s. 

###distanceFromStop
Maksimietäisyys pysäkiltä (km) jonka jälkeen reitti katkaistaan. Oletus 8,5km.

###offsetMinutes
ePaperinäyttöjen viiveen kompensointiin. Esimerkiksi `?offsetMinutes=3` näyttää linja-auton saapuvaksi
3 minuuttia "etuajassa", jos näytön kuva päivittyy 3 minuuttia myöhässä. Oletus 1

###aspect
Näytön kuvasuhde. 
0 = 16:9 pystynäyttö (oletus)
1 = 4:3 pystynäyttö

###rowQty
Näytettävien aikataulurivien määrä, oletus 11

###d13
Pienemmälle 13"-näytölle tarkoitettu näkymä, eri asettelu ja vähemmän lähtöjä. 
d13=0 Normaalinäkymä (oletus)
d13=1 13" näytön näkymä

###dbm
Debug-menu, ei käytössä