import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as errorReducers from './error';

const allReducers = {
    ...errorReducers,
    routing: routerReducer
};

export default combineReducers(allReducers);
