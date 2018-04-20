import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { Switch, Route } from "react-router-dom";

import configureStore from "./store";

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

import CensusPage from "./Containers/CensusPage/index";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={CensusPage} />
        </Switch>
      </ConnectedRouter>
    </Provider>,
    document.getElementById("app")
  );
};

render();
