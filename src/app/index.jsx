import React from 'react';
import {render} from 'react-dom';
import configureStore from './store';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import Header from './containers/header';
import Login from './containers/login';
import {Home} from './containers/home';

const store = configureStore();

persistStore(store, { blacklist : ['error','routing']});

/* istanbul ignore next */
if (__WEBPACK__) {
    require('./style.scss');
}

const history = syncHistoryWithStore(browserHistory, store);

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

export const App = ({children}) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
