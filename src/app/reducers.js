import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as homeReducers from './components/home/reducers';

const allReducers = {
    ...homeReducers,
    routing: routerReducer
};

export default combineReducers(allReducers);
