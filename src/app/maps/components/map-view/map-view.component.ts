import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PlacesService, MapService } from '../../services';
import {Map, Popup, Marker} from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapdiv') mapvidElement!: ElementRef

  constructor(private PlacesService: PlacesService,
              private MapService: MapService) { }

  ngAfterViewInit(): void {

    if (!this.PlacesService.userLocation) throw new Error('no hay placeservices.userlocation');
    const map = new Map({
      container: this.mapvidElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.PlacesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      
      });

      const popup = new Popup()
      .setHTML(`
      <h6>aca estoy</h6>
      <span>Estoy aqui en esta Ubicacion</span>
      `);

      new Marker({ color: 'red' })
      .setLngLat( this.PlacesService.userLocation)
      .setPopup( popup)
      .addTo( map )

      this.MapService.setMap(map)
  }


}
