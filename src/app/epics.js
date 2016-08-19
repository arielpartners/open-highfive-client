import {combineEpics} from 'redux-observable';

import {homeEpics} from './components/home/actions';

export default combineEpics(homeEpics);
