import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as errorReducers from './error';
import * as recognitionsReducers from '../containers/header/components/recognitions/reducers';

const allReducers = {
    ...errorReducers,
    ...recognitionsReducers,
    routing: routerReducer
};

export default combineReducers(allReducers);
