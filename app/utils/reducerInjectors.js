import invariant from "invariant";
import isEmpty from "lodash/isEmpty";
import isFunction from "lodash/isFunction";
import isString from "lodash/isString";

import createReducer from "../reducers";

export function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer) {
    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    )
      return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign

    store.replaceReducer(createReducer(store.injectedReducers));
    console.log("[store]: ", store.getState().toJS());
  };
}

export default function getInjectors(store) {
  return {
    injectReducer: injectReducerFactory(store, true)
  };
}
