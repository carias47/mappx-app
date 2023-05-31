import { Component } from '@angular/core';
import { menuItem } from 'src/app/mapas/interfaces/map.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
        transition: 0.2s all;
      }
    `,
  ],
})
export class MenuComponent {
  menuItems: menuItem[] = [
    {
      ruta: '/mapas/mapa',
      nombre: 'Mapa',
    },
    {
      ruta: '/mapas/zoom-range',
      nombre: 'Zoom',
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'Marker',
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'Propied.',
    },
  ];
}
