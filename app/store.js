import { createStore, applyMiddleware, compose } from "redux";
import { fromJS } from "immutable";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import createReducer from "./reducers";

const sagaMiddlware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  const middlewares = [sagaMiddlware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  window.reduxStore = store;

  store.runSaga = sagaMiddlware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      import("./reducers").then(reducerModule => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.injectedReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
