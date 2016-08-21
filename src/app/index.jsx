import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configure-store';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Header} from './components/header';
import Login from './components/login';
import {Home} from './components/home';


const store = configureStore();

persistStore(store, { blacklist : ['error']});

/* istanbul ignore next */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
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

export const App = (props) => {
    return (
        <div>
            <Header />
            {props.children}
        </div>
    );
};

/* istanbul ignore next */
const mapStateToProps = (state) => state;

/* istanbul ignore next */
// const mapDispatchToProps = (dispatch) => (
//     bindActionCreators({...LoginActions}, dispatch)
// );

export default connect(mapStateToProps)(App);

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

