import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styles: [
  ]
})
export class MapScreenComponent {

get isUserLocationReady(){
  return this.PlacesService.isUsrLocationReady;
}

  constructor(private PlacesService: PlacesService) { }



}
