import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { IncidentActions } from 'app/actions/incidents';
import { IncidentModel } from 'app/models';

const initialState: RootState.IncidentState = [];

export const incidentReducer = handleActions<RootState.IncidentState, IncidentModel>(
  {
    [IncidentActions.Type.FETCH_INCIDENTS_STARTED]: (state, action) => {
      return state;
    },
    [IncidentActions.Type.FETCH_INCIDENTS_FAILED]: (state, action) => {
      return state;
    },
    [IncidentActions.Type.FETCH_INCIDENTS_SUCCESSED]: (state, action) => {
      return state;
    },
  },
  initialState
);
