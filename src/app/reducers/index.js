import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as errorReducers from './error';
import * as modalReducers from './modal';
import * as loginReducers from '../containers/login/reducers';
import * as recognitionsReducers from '../containers/header/reducers';

const allReducers = {
    ...errorReducers,
    ...modalReducers,
    ...loginReducers,
    ...recognitionsReducers,
    routing: routerReducer
};

export default combineReducers(allReducers);
