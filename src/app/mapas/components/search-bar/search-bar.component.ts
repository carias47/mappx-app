import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  public valor: string = '';
  private debounceTimer?: NodeJS.Timeout;

  constructor(private placesService: PlacesService) {}

  changedQuery(value: string = '') {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesQuery(value);
    }, 500);
  }
  capturarValor(valor: string) {
    this.valor = valor;
  }
}
