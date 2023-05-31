import { Injectable } from '@angular/core';
import {
  AnySourceData,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
} from 'mapbox-gl';
import { Feature } from '../interfaces/map.interface';
import { DirectionsApiClient } from '../api/directionsApiClient';
import { DirectionsResponse, Route } from '../interfaces/directions';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  private mapa?: Map;
  private markers: Marker[] = [];

  get mapaListo() {
    return !!this.mapa;
  }

  constructor(private directionsHttp: DirectionsApiClient) {}

  setMyMapa(mapa: Map) {
    this.mapa = mapa;
  }
  flyTo(coordenadas: LngLatLike) {
    if (!this.mapaListo) throw new Error('No se ha inicializado el mapa.');
    this.mapa?.flyTo({
      zoom: 14,
      center: coordenadas,
    });
  }
  createMarkersPlaces(places: Feature[], userLocation: [number, number]) {
    if (!this.mapa) throw Error('Mapa no inicializado.');

    this.markers.forEach((marker) => marker.remove());
    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
      <h6>${place.text}</h6>
      <span>${place.place_name}</span>
      `);

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.mapa);

      newMarkers.push(newMarker);
    }
    this.markers = newMarkers;

    if (places.length === 0) return;

    const bounds = new LngLatBounds();
    newMarkers.forEach((marker) => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);
    this.mapa.fitBounds(bounds, {
      padding: 200,
    });
  }
  getRoutePoints(start: [number, number], end: [number, number]) {
    this.directionsHttp
      .get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe((resp) => {
        this.drawPolyline(resp.routes[0]);
      });
  }
  private drawPolyline(route: Route) {
    if (!this.mapa) throw Error('Mapa no inicializado');
    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.mapa?.fitBounds(bounds, {
      padding: 50,
    });

    //Polyline

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (this.mapa.getLayer('RouteString')) {
      this.mapa.removeLayer('RouteString');
      this.mapa.removeSource('RouteString');
    }

    this.mapa.addSource('RouteString', sourceData);
    this.mapa.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#fff',
        'line-width': 5,
        'line-opacity': 0.75,
      },
    });
  }
}
