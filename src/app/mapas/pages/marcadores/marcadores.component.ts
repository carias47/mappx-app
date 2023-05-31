import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { marcadores } from '../../interfaces/map.interface';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css'],
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-75.56610805326561, 6.2479529597314585];

  //Array marcadores
  marcadores: marcadores[] = [];
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.leerLocalStorage();
    // Referencia añadir otro tipo de marcador.
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'holii';
    // new mapboxgl.Marker({
    //   element: markerHtml,
    // })
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);
  }
  agregarMarcador() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color,
    })
      .setLngLat(this.center)
      .addTo(this.mapa);
    this.marcadores.push({
      color,
      marker: nuevoMarcador,
    });

    this.guardarMarcadorLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadorLocalStorage();
    });
  }

  irMarcador(valor: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: valor.getLngLat(),
    });
  }

  guardarMarcadorLocalStorage() {
    const lngLatArr: marcadores[] = [];

    this.marcadores.forEach((m) => {
      const color = m.color;
      const { lat, lng } = m.marker!.getLngLat();
      lngLatArr.push({
        color,
        centro: [lng, lat],
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: marcadores[] = JSON.parse(
      localStorage.getItem('marcadores')!
    );
    lngLatArr.forEach((m) => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color: m.color,
      });
      newMarker.on('dragend', () => {
        this.guardarMarcadorLocalStorage();
      });
    });
  }
  eliminarMarcador(i: number) {
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadorLocalStorage();
  }
}
