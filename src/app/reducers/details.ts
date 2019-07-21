import { handleActions } from 'redux-actions';
import { DetailsState } from './state';
import { DetailsActions } from 'app/actions/details';
import { IncidentModel } from 'app/models';

export const initialState: DetailsState = {
  details: {} as IncidentModel,
  isLoading: false,
  error: null
};

export const detailsReducer = handleActions<DetailsState, any>(
  {
    [DetailsActions.Type.FETCH_INCIDENT_DETAILS_STARTED]: (state) => {
      return {
        ...state,
        isLoading: true
      };
    },
    [DetailsActions.Type.FETCH_INCIDENT_DETAILS_SUCCESS]: (state, action) => {
      return {
        ...state,
        details: { ...action.payload },
        isLoading: false,
        error: null
      };
    },
    [DetailsActions.Type.FETCH_INCIDENT_DETAILS_FAILED]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
  },
  initialState
);
