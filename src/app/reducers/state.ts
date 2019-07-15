import { IncidentModel } from 'app/models';

export interface RootState {
  incidents: IncidentModel[];
  details: IncidentModel;
  isLoading?: boolean;
  error?: any;
  router?: any;
}

