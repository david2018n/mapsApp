import { Injectable } from '@angular/core';;
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlaceApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];


  get isUsrLocationReady(): boolean {
    return !!this.userLocation;
  }
  constructor(private placesApi: PlaceApiClient,
      private MapService: MapService) {
    this.getUserLocation();
   }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude]
          resolve(this.userLocation)
        },
        (err ) => {
          alert('No se pudo tener el acceso a la localizacion')
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = ''){

    if (query.length=== 0 ) {
      this.isLoadingPlaces = false;
      this.places= [];
      return;
    }

    if (!this.userLocation) throw Error ('no existe user location')
 
    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation?.join(','),
        country: 'co'
      }
    })
    .subscribe(resp =>{

      this.isLoadingPlaces = false;
      this.places = resp.features;

      this.MapService.createMarkersFromPLaces(this.places,  this.userLocation!);
    })
  }

  
  deletePlaces(){
    this.places = [];
  }

}
