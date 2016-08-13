import { combineReducers } from 'redux';

import * as homeReducers from './components/home/reducers';

const allReducers = { ...homeReducers };

export default combineReducers(allReducers);
