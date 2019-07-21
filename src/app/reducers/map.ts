import { handleActions } from 'redux-actions';
import { MapState } from './state';
import { MapActions } from 'app/actions/map';
import { GEO_COORDINATES } from 'app/constants';

export const initialState: MapState = {
  coordinates: GEO_COORDINATES,
  isLoading: false,
  hasLoaded: false,
  error: null
};

export const mapReducer = handleActions<MapState, any>(
  {
    [MapActions.Type.FETCH_GEO_JSON_STARTED]: (state) => {
      return {
        ...state,
        isLoading: true
      };
    },
    [MapActions.Type.FETCH_GEO_JSON_STARTED]: (state, action) => {
      return {
        ...state,
        coordinates: action.payload,
        isLoading: false,
        hasLoaded: true
      };
    },
    [MapActions.Type.FETCH_GEO_JSON_FAILED]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        hasLoaded: true
      };
    }
  },
  initialState
);
