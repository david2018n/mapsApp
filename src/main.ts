import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWQ3MDE4biIsImEiOiJjbDVxd3R1c2gwZW9kM2ZsZGtzb28wMWhhIn0.ntivyzGiwmBGlNgnV0oNGw';

if ( !navigator.geolocation) {
  alert('navegador no soporta la geolocalizacion')
  throw new Error('navegador no soporta la geolocalizacion')
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
