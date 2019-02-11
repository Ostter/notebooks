import "./main.css";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { Router, Route, Switch } from "react-router-dom";

import Layout from "containers/layout";
import Notebooks from "containers/notebooks";
import Notebook from "containers/notebook";
import reducers from "reducers";

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middlewareHistory = routerMiddleware(history);

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, middlewareHistory))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Layout>
          <Route exact path="/" component={Notebooks} />
          <Route path="/categories/:id" component={Notebooks} />
          <Route path="/notebooks/:id" component={Notebook} />
        </Layout>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
