import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { MapScreenComponent } from './pages/map-screen/map-screen.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mapa',
        component: MapScreenComponent,
      },
      {
        path: 'zoom-range',
        component: ZoomRangeComponent,
      },
      {
        path: 'marcadores',
        component: MarcadoresComponent,
      },
      {
        path: 'propiedades',
        component: PropiedadesComponent,
      },

      {
        path: '**',
        redirectTo: 'mapa',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapasRoutingModule {}
