import {combineEpics} from 'redux-observable';

import {homeEpics} from './components/home/actions';
import {loginEpics} from './components/home/components/login/actions';

export default combineEpics(homeEpics, loginEpics);
