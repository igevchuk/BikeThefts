import { createAction } from 'redux-actions';
import { IncidentModel } from 'app/models';

export namespace IncidentActions {
  export enum Type {
    FETCH_INCIDENTS = 'FETCH_INCIDENTS',
    FETCH_INCIDENTS_FAILED = 'FETCH_INCIDENTS_FAILED',
    FETCH_INCIDENTS_SUCCESS = 'FETCH_INCIDENTS_SUCCESS',
    FETCH_INCIDENT_DETAILS = 'FETCH_INCIDENT_DETAILS',
    FETCH_INCIDENT_DETAILS_FAILED = 'FETCH_INCIDENT_DETAILS_FAILED',
    FETCH_INCIDENT_DETAILS_SUCCESS = 'FETCH_INCIDENT_DETAILS_SUCCESS',
    POST_INCIDENT = 'POST_INCIDENT',
    POST_INCIDENT_FAILED = 'POST_INCIDENT_FAILED',
    POST_INCIDENT_SUCCESS = 'POST_INCIDENT_SUCCESS'
  }

  export const fetchIncidents = createAction(Type.FETCH_INCIDENTS);
  export const fetchIncidentsFailed = createAction(Type.FETCH_INCIDENTS_FAILED);
  export const fetchIncidentsSuccess = createAction(Type.FETCH_INCIDENTS_SUCCESS);
  export const fetchIncidentDetails = createAction<PartialPick<IncidentModel, 'id'>>(Type.FETCH_INCIDENT_DETAILS);
  export const fetchIncidentDetailsFailed = createAction(Type.FETCH_INCIDENT_DETAILS_FAILED);
  export const fetchIncidentDetailsSuccess = createAction(Type.FETCH_INCIDENT_DETAILS_SUCCESS);
  export const postIncident = createAction(Type.POST_INCIDENT);
  export const postIncidentFailed = createAction(Type.POST_INCIDENT_FAILED);
  export const postIncidentSuccess = createAction(Type.POST_INCIDENT_SUCCESS);
}

export type IncidentActions = Omit<typeof IncidentActions, 'Type'>;
