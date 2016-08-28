import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as errorReducers from './error';
import * as loginReducers from '../containers/login/reducers';
import * as recognitionsReducers from '../containers/header/reducers';

const allReducers = {
    ...errorReducers,
    ...loginReducers,
    ...recognitionsReducers,
    routing: routerReducer
};

export default combineReducers(allReducers);
