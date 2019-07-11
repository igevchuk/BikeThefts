import { combineReducers } from 'redux';
import { RootState } from './state';
import { incidentReducer } from './incidents';
import { todoReducer } from './todos';

export { RootState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  incidents: incidentReducer as any,
  todos: todoReducer as any
});
