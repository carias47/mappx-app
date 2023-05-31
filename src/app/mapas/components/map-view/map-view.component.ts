import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Marker, Popup } from 'mapbox-gl';
import { MapsService } from '../../services/maps.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(
    private placesService: PlacesService,
    private mapsService: MapsService
  ) {}

  ngAfterViewInit(): void {
    if (!this.placesService.useLocation)
      throw Error('No hay places user location');
    const map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v11', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    const popup = new Popup().setHTML(`
      <h6>Aquí Estoy</h6>
      <span>Estoy en este lugar.</span>
    `);

    new Marker({ color: 'red' })
      .setLngLat(this.placesService.useLocation!)
      .setPopup(popup)
      .addTo(map);

    this.mapsService.setMyMapa(map);
  }
}
