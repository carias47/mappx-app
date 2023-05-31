import { Component, EventEmitter, Output } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Feature } from '../../interfaces/map.interface';
import { MapsService } from '../../services/maps.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  @Output() valorGenerado = new EventEmitter<string>();
  public selectedId: string = '';

  constructor(
    private placesService: PlacesService,
    private mapService: MapsService
  ) {}

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }
  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
    this.valorGenerado.emit(place.place_name);
    this.placesService.deletePlace();
  }
  getDirections(place: Feature) {
    if (!this.placesService.useLocation) throw Error('Not found Location.');
    const start = this.placesService.useLocation;
    const end = place.center as [number, number];
    this.mapService.getRoutePoints(start, end);
  }
}
