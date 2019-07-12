import { createAction } from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';
import * as queryString from 'query-string';
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
    FETCH_INCIDENT_DETAILS_ENDED = 'FETCH_INCIDENT_DETAILS_ENDED'
  }

  // export enum DefaultParameters {
  //   page = '1',
  //   per_page = 10,
  //   incident_type = 'theft',
  //   proximity = 'Kiev',
  //   proximity_square = 100
  // }

  export const fetchIncidents = (queryOptions = {}) => {
    const parameters = { incident_type: 'theft', ...queryOptions };
    const stringified = queryString.stringify(parameters);

    return (dispatch: Dispatch) =>  fetchUrl(`https://bikewise.org/api/v2/incidents?${stringified}`)
    .then(payload => payload.json())
      .then(json => dispatch(fetchIncidentsSucceded(json)),
    error => dispatch(fetchIncidentsFailed(error)))
  };

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
