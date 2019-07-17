import { IncidentModel } from 'app/models';

export interface RootState {
  incidents: IncidentModel[];
  details: IncidentModel;
  coordinates: [number, number];
  isLoading: boolean;
  mapLoaded: boolean;
  error?: any;
  router?: any;
}
