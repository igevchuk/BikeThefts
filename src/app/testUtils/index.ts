import * as Enzyme from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { rootReducer } from 'app/reducers';

// const middlewares = [thunk];

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 *  globals: rootReducer, middlewares.
 * @param {object} initialState - Initial state for store.
 * @function storeFactory
 * @returns {Store} - Redux store.
 */
// export const storeFactory = (initialState) => {
//   const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
//   return createStoreWithMiddleware(rootReducer, initialState);
// };

export const findBySelector = (
  wrapper: Enzyme.ShallowWrapper,
  selector: string
): Enzyme.ShallowWrapper => {
  return wrapper.find(selector);
};

export const findByDataAttr = (
  wrapper: Enzyme.ShallowWrapper,
  selector: string
): Enzyme.ShallowWrapper => {
  return wrapper.find(`[data-test="${selector}"]`);
};
