import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { IncidentActions } from 'app/actions/incidents';
import { IncidentModel } from 'app/models';

const initialState: RootState = {
  incidents: [],
  isLoading: false,
  error: null
};

export const incidentReducer = handleActions<RootState, any>(
  {
    [IncidentActions.Type.FETCH_INCIDENTS_STARTED]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [IncidentActions.Type.FETCH_INCIDENTS_FAILED]: (state, action) => {
      return {
        ...state,
        error: action.error
      };
    },
    [IncidentActions.Type.FETCH_INCIDENTS_SUCCESSED]: (state, action) => {
      if(!action || !action.payload || !action.payload.incidents) {
        return state;
      }
      const { incidents } = action.payload;
      return {
        ...state,
        error: null,
        incidents
      };
    },
    [IncidentActions.Type.FETCH_INCIDENTS_ENDED]: (state) => {
      return {
        ...state,
        isLoading: true
      };
    },
  },
  initialState
);
