import React from 'react';
import {render} from 'react-dom';
import configureStore from './store';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import Header from './containers/header';
import Login from './containers/login';
import Home from './containers/home';
import Modal from './containers/modal';

const store = configureStore();

persistStore(store, { blacklist : ['error', 'routing']});

/* istanbul ignore next */
if (__WEBPACK__) {
    require('./style.scss');
}

const history = syncHistoryWithStore(browserHistory, store);

export const getFormData = (inputs) => (
    inputs.reduce((data, input)=> {
        const type = input.getAttribute('type');
        const name = input.name;
        const value = /(radio|checkbox)/i.test(type) ? input.checked : input.value;
        data[name] = value === '' ? undefined : value;
        return data;
    }, {})
);

export const App = ({children}) => {
    return (
        <div>
            <Header />
            {children}
            <Modal />
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
