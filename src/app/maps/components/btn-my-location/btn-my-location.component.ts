import { Component } from '@angular/core';
import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent  {

  constructor(private MapService: MapService,
    private PlacesService:PlacesService) { }

  goToMyLocation(){

    if ( !this.PlacesService.isUsrLocationReady) throw Error('No hay ubicacion')
    if ( !this.MapService.isMapReady) throw Error('No hay mapa disponible')

    this.MapService.flyto(this.PlacesService.userLocation!)
  }

}
