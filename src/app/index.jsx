import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configure-store';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Header} from './components/header';
import Login from './components/login';

//import auth from './auth';

const store = configureStore();

persistStore(store, { blacklist : ['error']});

/* istanbul ignore next */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}

const history = syncHistoryWithStore(browserHistory, store);

// const requireAuth = (nextState, replace) => {
//     if (!auth.loggedIn()) {
//         replace({
//             pathname: '/login',
//             state: {nextPathname: nextState.location.pathname}
//         })
//     }
// };

export const getFormData = (inputs, toOmit = []) => {
    var cb = (data, input) => {
        const name = input.id;
        const value = input.value;
        if (toOmit.indexOf(name) === -1) {
            data[name] = value === '' ? undefined : value;
        }
        return data;
    };
    return inputs.reduce(cb, {});
};

render(
    <Provider store={store}>
        <main>
            <Header />
            <Router history={history}>
                <Route path="/login" component={Login} />
            </Router>
        </main>
    </Provider>,
    document.getElementById('app')
);

