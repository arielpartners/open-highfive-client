import {combineEpics} from 'redux-observable';

import {loginEpics} from './containers/login/actions';
import {recognitionsEpics} from './containers/header/components/recognitions/epics';

export default combineEpics(loginEpics, recognitionsEpics);
