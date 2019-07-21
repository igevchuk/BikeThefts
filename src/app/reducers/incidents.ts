import { handleActions } from 'redux-actions';
import { IncidentsState } from './state';
import { IncidentsActions } from 'app/actions/incidents';
import { IncidentModel } from 'app/models';

export const initialState: IncidentsState = {
  incidents: [] as IncidentModel[],
  isLoading: false,
  error: null
};

export const incidentsReducer = handleActions<IncidentsState, any>(
  {
    [IncidentsActions.Type.FETCH_INCIDENTS_STARTED]: (state) => {
      return {
        ...state,
        isLoading: true
      };
    },
    [IncidentsActions.Type.FETCH_INCIDENTS_FAILED]: (state, action) => {
      return {
        ...state,
        error: action.error,
        isLoading: false,
        incidents: []
      };
    },
    [IncidentsActions.Type.FETCH_INCIDENTS_SUCCESS]: (state, action) => {
      return {
        ...state,
        error: null,
        isLoading: false,
        incidents: [...action.payload]
      };
    }
  },
  initialState
);
