import {combineEpics} from 'redux-observable';

import {loginEpics} from './components/login/actions';

export default combineEpics(loginEpics);
