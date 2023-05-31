import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapasRoutingModule } from './mapas-routing.module';
import { MiniMapaComponent } from './components/mini-mapa/mini-mapa.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { MapScreenComponent } from './pages/map-screen/map-screen.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BtnLocationComponent } from './components/btn-location/btn-location.component';
import { LogoComponent } from './components/logo/logo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

@NgModule({
  declarations: [
    MiniMapaComponent,
    MarcadoresComponent,
    ZoomRangeComponent,
    PropiedadesComponent,
    MapScreenComponent,
    MapViewComponent,
    LoadingComponent,
    BtnLocationComponent,
    LogoComponent,
    SearchBarComponent,
    SearchResultsComponent,
  ],
  imports: [CommonModule, MapasRoutingModule],
})
export class MapasModule {}
