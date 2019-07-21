import { IncidentModel } from 'app/models';

export interface IncidentsState {
  incidents: IncidentModel[];
  isLoading: boolean;
  error?: any;
  router?: any;
}

export interface DetailsState {
  details: IncidentModel;
  isLoading: boolean;
  error?: any;
}

export interface MapState {
  coordinates: [number, number];
  isLoading: boolean;
  hasLoaded: boolean;
  error?: any;
}

export interface RootState {
  incidentsState: IncidentsState;
  detailsState: DetailsState;
  mapState: MapState;
}
