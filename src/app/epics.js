import {combineEpics} from 'redux-observable';

import LoginEpics from './containers/login/epics';
import {recognitionsEpics} from './containers/header/components/recognitions/epics';

export default combineEpics(LoginEpics, recognitionsEpics);
