import {combineEpics} from 'redux-observable';

import LoginEpics from './containers/login/epics';
import RecognitionsEpics from './containers/header/epics';

export default combineEpics(LoginEpics, RecognitionsEpics);
