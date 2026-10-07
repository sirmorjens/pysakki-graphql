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

<<<<<<< HEAD
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
=======
id
Pysäkin GTFS-id. Esim Lahti:123456

refreshRateSec
Näkymän ja tietojen päivitysväli, oletus 30s. 

distanceFromStop
Maksimietäisyys pysäkiltä (km) jonka jälkeen reitti katkaistaan. Oletus 8,5km.

offsetMinutes
ePaperinäyttöjen viiveen kompensointiin. offsetMinutes=3 näyttää linja-auton saapuvaksi
3 minuuttia "etuajassa", jos näytön kuva päivittyy 3 minuuttia myöhässä. Oletus 1

aspect
>>>>>>> b5683956af9c3cd26ef1f70576f1e0c0d9468ae0
Näytön kuvasuhde. 
0 = 16:9 pystynäyttö (oletus)
1 = 4:3 pystynäyttö

<<<<<<< HEAD
###rowQty
Näytettävien aikataulurivien määrä, oletus 11

###d13
=======
rowQty
Näytettävien aikataulurivien määrä, oletus 11

d13
>>>>>>> b5683956af9c3cd26ef1f70576f1e0c0d9468ae0
Pienemmälle 13"-näytölle tarkoitettu näkymä, eri asettelu ja vähemmän lähtöjä. 
d13=0 Normaalinäkymä (oletus)
d13=1 13" näytön näkymä

<<<<<<< HEAD
###dbm
=======
dbm
>>>>>>> b5683956af9c3cd26ef1f70576f1e0c0d9468ae0
Debug-menu, ei käytössä