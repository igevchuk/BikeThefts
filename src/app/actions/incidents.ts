import { createAction } from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';
import { IncidentModel } from 'app/models';
import { Dispatch } from 'redux';


const fetchUrl = (url: string) => fetch(url);

export namespace IncidentActions {
  export enum Type {
    FETCH_INCIDENTS_STARTED = 'FETCH_INCIDENTS_STARTED',
    FETCH_INCIDENTS_FAILED = 'FETCH_INCIDENTS_FAILED',
    FETCH_INCIDENTS_SUCCESSED = 'FETCH_INCIDENTS_SUCCESSED',
    FETCH_INCIDENTS_ENDED = 'FETCH_INCIDENTS_ENDED',
    FETCH_INCIDENT_DETAILS_STARTED = 'FETCH_INCIDENT_DETAILS_STARTED',
    FETCH_INCIDENT_DETAILS_FAILED = 'FETCH_INCIDENT_DETAILS_FAILED',
    FETCH_INCIDENT_DETAILS_SUCCESSED = 'FETCH_INCIDENT_DETAILS_SUCCESSED',
    FETCH_INCIDENT_DETAILS_ENDED = 'FETCH_INCIDENT_DETAILS_ENDED',
    // POST_INCIDENT = 'POST_INCIDENT',
    // POST_INCIDENT_FAILED = 'POST_INCIDENT_FAILED',
    // POST_INCIDENT_SUCCESS = 'POST_INCIDENT_SUCCESS'
  }

  // export const fetchIncidents = createAction(Type.FETCH_INCIDENTS);
  // export const fetchIncidentsFailed = createAction(Type.FETCH_INCIDENTS_FAILED);
  // export const fetchIncidentsSuccess = createAction(Type.FETCH_INCIDENTS_SUCCESS);
  // // export const fetchIncidentDetails = createAction<PartialPick<IncidentModel, 'id'>>(Type.FETCH_INCIDENT_DETAILS);
  // export const fetchIncidentDetailsFailed = createAction(Type.FETCH_INCIDENT_DETAILS_FAILED);
  // export const fetchIncidentDetailsSuccess = createAction(Type.FETCH_INCIDENT_DETAILS_SUCCESS);
  // export const postIncident = createAction(Type.POST_INCIDENT);
  // export const postIncidentFailed = createAction(Type.POST_INCIDENT_FAILED);
  // export const postIncidentSuccess = createAction(Type.POST_INCIDENT_SUCCESS);

  export const fetchIncidents = () => (
    (dispatch: Dispatch) =>  fetchUrl('https://bikewise.org/api/v2/incidents?incident_type=theft')
    .then(payload => payload.json())
      .then(json => dispatch(fetchIncidentsSucceded(json)),
    error => dispatch(fetchIncidentsFailed(error))
  ));

  export const fetchIncidentsSucceded = (payload: any) => ({
    type: Type.FETCH_INCIDENTS_SUCCESSED,
    payload
  });

  export const fetchIncidentsFailed = (error: any) => ({
    type: Type.FETCH_INCIDENTS_FAILED,
    error
  });

  // export const fetchIncidents = createActionThunk(
  //   Type.FETCH_INCIDENTS_STARTED,
  //   () => fetchUrl('https://bikewise.org/api/v2/incidents')
  // );
  export const fetchIncidentDetails = createActionThunk<PartialPick<IncidentModel, 'id'>>(
    Type.FETCH_INCIDENT_DETAILS_STARTED,
    (id) => fetchUrl(`https://bikewise.org/api/v2/incidents/${id}`)
  );

  // export const fetchIncidents = () => (
  //   (dispatch: any) => (
  //      fetchUrl('https://bikewise.org/api/v2/incidents').then(
  //       payload => dispatch(fetchIncidentsSuccess(payload)),
  //       error => dispatch(fetchIncidentDetailsFailed(error))
  //     )
  //   )
  // )
}

export type IncidentActions = Omit<typeof IncidentActions, 'Type'>;
