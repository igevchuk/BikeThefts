import * as queryString from 'query-string';
import { IncidentModel } from 'app/models';
import { Dispatch } from 'redux';
import { API_URL, INCIDENT_TYPE } from 'app/constants';
import { fetchUrl } from 'app/utils';

export namespace IncidentsActions {
  export enum Type {
    FETCH_INCIDENTS_STARTED = 'FETCH_INCIDENTS_STARTED',
    FETCH_INCIDENTS_FAILED = 'FETCH_INCIDENTS_FAILED',
    FETCH_INCIDENTS_SUCCESS = 'FETCH_INCIDENTS_SUCCESS',
  }

  export const fetchIncidents = (queryOptions = {}) => {
    const parameters = { incident_type: INCIDENT_TYPE, ...queryOptions };
    const stringified = queryString.stringify(parameters);
    type Payload = {
      incidents: IncidentModel[];
    };

    return (dispatch: Dispatch, getState: Function) => {
      const { incidentsState: { isLoading }} = getState();
      console.log(34563, isLoading)
      dispatch({ type: IncidentsActions.Type.FETCH_INCIDENTS_STARTED });
      fetchUrl(`${API_URL}?${stringified}`, isLoading)
        .then((payload: Payload) => dispatch(fetchIncidentsSuccess(payload.incidents)))
        .catch((error: string) => {
          console.log(error)
        }));
    }
  };

  export const fetchIncidentsSuccess = (payload: IncidentModel[]) => ({
    type: Type.FETCH_INCIDENTS_SUCCESS,
    payload
  });

  export const fetchIncidentsFailed = (error: any) => ({
    type: Type.FETCH_INCIDENTS_FAILED,
    error
  });
}

export type IncidentsActions = Omit<typeof IncidentsActions, 'Type'>;
