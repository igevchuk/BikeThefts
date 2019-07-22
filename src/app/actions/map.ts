import * as queryString from 'query-string';
import { Dispatch } from 'redux';
import { GEO_API_URL, INCIDENT_TYPE } from 'app/constants';
import { fetchUrl } from 'app/utils';

export namespace MapActions {
  export enum Type {
    FETCH_GEO_JSON_STARTED = 'FETCH_GEO_JSON_STARTED',
    FETCH_GEO_JSON_FAILED = 'FETCH_GEO_JSON_FAILED',
    FETCH_GEO_JSON_SUCCESS = 'FETCH_GEO_JSON_SUCCESS'
  }

  export interface GeoRequestParams {
    occurred_at: number;
    title: string;
  }

  export const getGeoJson = ({ occurred_at, title }: GeoRequestParams) => {
    const params = queryString.stringify({
      occurred_before: occurred_at, // api sometimes return nothing with exact timestamps
      occurred_after: occurred_at,
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

    return (dispatch: Dispatch) => {
      const url = `${GEO_API_URL}?${params}`;

      dispatch({ type: MapActions.Type.FETCH_GEO_JSON_STARTED });
      fetchUrl(url)
        .then((payload: Payload) => payload.features[0].geometry.coordinates)
        .then((coordinates: [number, number]) => dispatch(fetchGeoJsonSuccess(coordinates)))
        .catch((error: string) => dispatch(fetchGeoJsonFailed(error)));
    }
  };

  export const fetchGeoJsonSuccess = (payload: [number, number]) => ({
    type: MapActions.Type.FETCH_GEO_JSON_SUCCESS,
    payload
  });

  export const fetchGeoJsonFailed = (error: any) => ({
    type: MapActions.Type.FETCH_GEO_JSON_FAILED,
    error
  });
}

export type MapActions = Omit<typeof MapActions, 'Type'>;
