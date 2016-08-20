import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configure-store';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {Header} from './components/header';
import Login from './components/login';
import {Home} from './components/home';

import auth from './auth'

const store = configureStore();

persistStore(store, { blacklist : ['error']});

/* istanbul ignore next */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}


const history = syncHistoryWithStore(browserHistory, store);

const requireAuth =  (nextState, replace) => {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
};

render(
    <Provider store={store}>
        <main>
            <Header />
            <Router history={history}>
                <Route path="/" component={Home} onEnter={requireAuth}/>
                <Route path="/login" component={Login} />
            </Router>
        </main>
    </Provider>,
    document.getElementById('app')
);

