import { combineReducers } from 'redux';
import { RootState, IncidentsState, DetailsState, MapState } from './state';
import { incidentsReducer } from './incidents';
import { detailsReducer } from './details';
import { mapReducer } from './map';

export { RootState, IncidentsState, DetailsState, MapState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<any>({
  incidentsState: incidentsReducer as any,
  detailsState: detailsReducer as any,
  mapState: mapReducer as any
});
