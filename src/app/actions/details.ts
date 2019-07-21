import { IncidentModel } from 'app/models';
import { Dispatch } from 'redux';
import { API_URL } from 'app/constants';
import { fetchUrl } from 'app/utils';

export namespace DetailsActions {
  export enum Type {
    FETCH_INCIDENT_DETAILS_STARTED = 'FETCH_INCIDENT_DETAILS_STARTED',
    FETCH_INCIDENT_DETAILS_FAILED = 'FETCH_INCIDENT_DETAILS_FAILED',
    FETCH_INCIDENT_DETAILS_SUCCESS = 'FETCH_INCIDENT_DETAILS_SUCCESS',
  }

  export const fetchIncidentDetails = (id: number) => {
    type Payload = {
      incident: IncidentModel;
    };

    return (dispatch: Dispatch) => {
      dispatch({ type: DetailsActions.Type.FETCH_INCIDENT_DETAILS_STARTED });
      return (
        fetchUrl(`${API_URL}/${id}`)
          .then((payload: Payload) => dispatch(fetchIncidentDetailsSuccess(payload.incident)))
          .catch((error: any) => dispatch(fetchIncidentDetailsFailed(error)))
      )
    }
  };

  export const fetchIncidentDetailsSuccess = (payload: IncidentModel) => ({
    type: Type.FETCH_INCIDENT_DETAILS_SUCCESS,
    payload
  });

  export const fetchIncidentDetailsFailed = (error: any) => ({
    type: Type.FETCH_INCIDENT_DETAILS_FAILED,
    error
  });
}

export type DetailsActions = Omit<typeof DetailsActions, 'Type'>;
