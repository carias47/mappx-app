import { Component } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-location',
  templateUrl: './btn-location.component.html',
  styleUrls: ['./btn-location.component.css'],
})
export class BtnLocationComponent {
  constructor(
    private mapsService: MapsService,
    private placesService: PlacesService
  ) {}
  goToMyLocation() {
    if (!this.placesService.isUserLocationReady)
      throw new Error('No hay ubi del usuario.');
    if (!this.mapsService.mapaListo) throw new Error('No hay mapas.');

    this.mapsService.flyTo(this.placesService.useLocation!);
  }
}
