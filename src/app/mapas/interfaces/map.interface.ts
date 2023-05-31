export interface marcadores {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

export interface menuItem {
  ruta: string;
  nombre: string;
}

export interface Propiedad {
  titulo: string;
  descripcion: string;
  lngLat: [number, number];
}

export interface Places {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text_es: string;
  language_es?: Language;
  place_name_es: string;
  text: string;
  language?: Language;
  place_name: string;
  bbox?: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
  matching_text?: string;
  matching_place_name?: string;
}

export interface Context {
  id: string;
  short_code?: string;
  wikidata?: string;
  mapbox_id: string;
  text_es: string;
  language_es?: Language;
  text: string;
  language?: Language;
}

export enum Language {
  Es = 'es',
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  wikidata?: string;
  mapbox_id?: string;
  foursquare?: string;
  landmark?: boolean;
  address?: string;
  category?: string;
}
