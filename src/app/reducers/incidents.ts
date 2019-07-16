import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { IncidentActions } from 'app/actions/incidents';
import { IncidentModel } from 'app/models';

const initialState: RootState = {
  incidents: [],
  details: {} as IncidentModel,
  isLoading: false,
  mapLoaded: false,
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
    [IncidentActions.Type.FETCH_INCIDENT_DETAILS_STARTED]: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [IncidentActions.Type.FETCH_INCIDENT_DETAILS_SUCCESSED]: (state, action) => {
      return {
        ...state,
        details: action.payload,
        error: null
      }
    },
    [IncidentActions.Type.FETCH_INCIDENT_DETAILS_FAILED]: (state, action) => {
      return {
        ...state,
        error: action.payload
      }
    },
    [IncidentActions.Type.FETCH_INCIDENT_DETAILS_ENDED]: (state) => {
      return {
        ...state,
        isLoading: false
      }
    },
    [IncidentActions.Type.FETCH_GEO_JSON_SUCCEDED]: (state, action) => {
      return {
        ...state,
        coordinates: action.payload,
        mapLoaded: true
      }
    },
    [IncidentActions.Type.FETCH_GEO_JSON_FAILED]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        mapLoaded: true
      }
    }
  },
  initialState
);
