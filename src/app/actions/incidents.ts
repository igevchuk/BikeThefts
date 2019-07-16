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
    FETCH_INCIDENT_DETAILS_ENDED = 'FETCH_INCIDENT_DETAILS_ENDED',
    FETCH_GEO_JSON = 'FETCH_GEO_JSON',
    FETCH_GEO_JSON_FAILED = 'FETCH_GEO_JSON_FAILED',
    FETCH_GEO_JSON_SUCCEDED = 'FETCH_GEO_JSON_SUCCEDED',
  }

  export interface GeoRequestParams {
    occurred_at: number;
    title: string;
  }

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

  export const fetchIncidentDetails = (id: number) => {
    return (dispatch: Dispatch) => fetchUrl(`https://bikewise.org/api/v2/incidents/${id}`)
      .then(payload => payload.json())
        .then((json) => dispatch(fetchIncidentDetailsSucceded(json.incident)),
      error => dispatch(fetchIncidentDetailsFailed(error)));
  }

  export const fetchIncidentDetailsSucceded = (payload: IncidentModel) => ({
    type: Type.FETCH_INCIDENT_DETAILS_SUCCESSED,
    payload
  });

  export const fetchIncidentDetailsFailed = (error: any) => ({
    type: Type.FETCH_INCIDENT_DETAILS_FAILED,
    error
  });

  export const getGeoJson = ({ occurred_at, title }: GeoRequestParams) => {
    const params = queryString.stringify({
      occurred_before: occurred_at + 1, // api sometimes return nothing with exact timestamps
        occurred_after: occurred_at - 1,
        incident_type: 'theft',
        query: title,
    });

    return (dispatch: Dispatch) =>  fetchUrl(`https://bikewise.org/api/v2/locations?${params}`)
    .then(payload => payload.json())
      .then(json => json.features[0].geometry.coordinates)
      .then(payload => dispatch(fetchGeoJsonSucceded(payload)),
    error => dispatch(fetchGeoJsonFailed(error)))
  }

  export const fetchGeoJsonSucceded = (payload: [number, number]) => ({
    type: Type.FETCH_GEO_JSON_SUCCEDED,
    payload
  });

  export const fetchGeoJsonFailed = (error: any) => ({
    type: Type.FETCH_GEO_JSON_FAILED,
    error
  });
}

export type IncidentActions = Omit<typeof IncidentActions, 'Type'>;
