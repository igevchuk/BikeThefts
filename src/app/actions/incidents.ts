import * as queryString from 'query-string';
import { IncidentModel } from 'app/models';
import { Dispatch } from 'redux';
import { API_URL, GEO_API_URL, INCIDENT_TYPE } from 'app/constants';

const fetchUrl = <T>(url: string): Promise<T> =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });

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
    FETCH_GEO_JSON_SUCCEDED = 'FETCH_GEO_JSON_SUCCEDED'
  }

  export interface GeoRequestParams {
    occurred_at: number;
    title: string;
  }

  export const fetchIncidents = (queryOptions = {}) => {
    const parameters = { incident_type: INCIDENT_TYPE, ...queryOptions };
    const stringified = queryString.stringify(parameters);
    type Payload = {
      incidents: IncidentModel[];
    };

    return (dispatch: Dispatch) =>
      fetchUrl(`${API_URL}?${stringified}`)
        .then((payload: Payload) => dispatch(fetchIncidentsSucceded(payload.incidents)))
        .catch((error: string) => dispatch(fetchIncidentsFailed(error)));
  };

  export const fetchIncidentsSucceded = (payload: IncidentModel[]) => ({
    type: Type.FETCH_INCIDENTS_SUCCESSED,
    payload
  });

  export const fetchIncidentsFailed = (error: string) => ({
    type: Type.FETCH_INCIDENTS_FAILED,
    error
  });

  export const fetchIncidentDetails = (id: number) => {
    type Payload = {
      incident: IncidentModel;
    };

    return (dispatch: Dispatch) =>
      fetchUrl(`${API_URL}/${id}`)
        .then((payload: Payload) => dispatch(fetchIncidentDetailsSucceded(payload.incident)))
        .catch((error: string) => dispatch(fetchIncidentDetailsFailed(error)));
  };

  export const fetchIncidentDetailsSucceded = (payload: IncidentModel) => ({
    type: Type.FETCH_INCIDENT_DETAILS_SUCCESSED,
    payload
  });

  export const fetchIncidentDetailsFailed = (error: string) => ({
    type: Type.FETCH_INCIDENT_DETAILS_FAILED,
    error
  });

  export const getGeoJson = ({ occurred_at, title }: GeoRequestParams) => {
    const params = queryString.stringify({
      occurred_before: occurred_at + 1, // api sometimes return nothing with exact timestamps
      occurred_after: occurred_at - 1,
      incident_type: INCIDENT_TYPE,
      query: title
    });

    type Payload = {
      features: {
        geometry: {
          coordinates: [number, number];
        };
      }[];
    };

    return (dispatch: Dispatch) =>
      fetchUrl(`${GEO_API_URL}?${params}`)
        .then((payload: Payload) => payload.features[0].geometry.coordinates)
        .then((coordinates: [number, number]) => dispatch(fetchGeoJsonSucceded(coordinates)))
        .catch((error: string) => dispatch(fetchGeoJsonFailed(error)));
  };

  export const fetchGeoJsonSucceded = (payload: [number, number]) => ({
    type: Type.FETCH_GEO_JSON_SUCCEDED,
    payload
  });

  export const fetchGeoJsonFailed = (error: string) => ({
    type: Type.FETCH_GEO_JSON_FAILED,
    error
  });
}

export type IncidentActions = Omit<typeof IncidentActions, 'Type'>;
