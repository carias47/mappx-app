import { Component } from '@angular/core';
import { Propiedad } from '../../interfaces/map.interface';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css'],
})
export class PropiedadesComponent {
  propiedades: Propiedad[] = [
    {
      titulo: 'Casa residencial, Canadá',
      descripcion: 'Bella propiedad en Katana, Canadá',
      lngLat: [-75.92722289474008, 45.280015511264466],
    },
    {
      titulo: 'Central Park, New York',
      descripcion:
        'Extenso parque con rutas y campos de béisbol, un zoológico, un carrusel, botes para rentar y un embalse, EE.UU',
      lngLat: [-73.96558340224166, 40.78272527911581],
    },

    {
      titulo: 'Catedral de Notre Dame, Paris',
      descripcion:
        'Extensa catedral del siglo XIII con arbotantes y gárgolas que fue el escenario de una novela de Víctor Hugo, Francia',
      lngLat: [2.3499342845092634, 48.853074071756964],
    },

    {
      titulo: 'Piedra del Peñol, Antioquia',
      descripcion:
        'Gran piedra independiente y única con escaleras hacia la cima, además de vistas panorámicas y una tienda, Colombia',
      lngLat: [-75.17840987456799, 6.224421785735814],
    },
    {
      titulo: 'Ciudad del Vaticano',
      descripcion:
        'La ciudad del Vaticano es mundialmente conocida por ser el centro neurálgico de la Iglesia Católica.',
      lngLat: [12.45382, 41.90261],
    },
    {
      titulo: 'Casa de playa, México',
      descripcion: 'Hermosa casa de playa en Acapulco, México',
      lngLat: [-99.91287720907991, 16.828940930185748],
    },
    {
      titulo: 'Apartamento, Argentina',
      descripcion:
        'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
      lngLat: [-58.430166677283445, -34.57150108832866],
    },
    {
      titulo: 'Local comercial, España',
      descripcion:
        'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [-3.7112735618380177, 40.42567285425766],
    },
    {
      titulo: 'Estatua de la Libertad, New York',
      descripcion:
        'Emblemático monumento nacional inaugurado en 1886 con visitas guiadas, un museo y vista a la ciudad, EE.UU',
      lngLat: [-74.04451113107989, 40.689387677789135],
    },
  ];
}
