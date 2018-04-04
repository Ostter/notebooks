import './main.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

import Layout from 'containers/layout'
import Notebooks from 'containers/notebooks'
import Notebook from 'containers/notebook'
import reducers from 'reducers'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middlewareHistory = routerMiddleware(history);

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk, middlewareHistory)
));

ReactDOM.render(
    <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
            <div>
                <Layout>
                    <Route exact path='/' component={Notebooks}/>
                    <Route path='/categories/:id' component={Notebooks}/>
                </Layout>
                <Route path='/notebooks/:id' component={Notebook} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);