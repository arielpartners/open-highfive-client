import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as errorReducers from './error';
import * as modalReducers from './modal';
import * as loginReducers from '../containers/login/reducers';
import * as metricsReducers from '../containers/header/reducers';
import * as homeReducers from '../containers/home/reducers';

const allReducers = {
    ...errorReducers,
    ...modalReducers,
    ...loginReducers,
    ...metricsReducers,
    ...homeReducers,
    routing: routerReducer
};

export default combineReducers(allReducers);
