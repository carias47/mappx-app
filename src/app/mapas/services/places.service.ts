import { Injectable } from '@angular/core';
import { Feature, Places } from '../interfaces/map.interface';
import { PlacesHttpClient } from '../api/placeApiClient';
import { MapsService } from './maps.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  useLocation?: [number, number];
  isLoadingPlaces: boolean = false;
  places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }
  constructor(
    private PlacesHttp: PlacesHttpClient,
    private mapsService: MapsService
  ) {
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalización.');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesQuery(query: string = '') {
    if (!this.useLocation) throw Error('UserLocation not found.');
    this.isLoadingPlaces = true;
    this.PlacesHttp.get<Places>(`/${query}.json`, {
      params: {
        proximity: this.useLocation?.join(','),
      },
    }).subscribe((resp) => {
      this.isLoadingPlaces = false;
      this.places = resp.features;
      this.mapsService.createMarkersPlaces(this.places, this.useLocation!);
    });
  }
  deletePlace() {
    this.places = [];
  }
}
