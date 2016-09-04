import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {ajax} from 'rxjs/observable/dom/ajax';
import * as ActionTypes from '../../../action-types';
import * as Actions from '../actions';

const BASE_URL = '/api/';
const HEADER = {'Content-Type': 'application/json'};

const getRecentRecognitionEpic = action$ =>
    action$.ofType(ActionTypes.REQUEST_RECOGNITIONS)
        .mergeMap(action =>
            ajax.get(BASE_URL + 'recognitions', JSON.stringify(action.payload), HEADER)
                .map(Actions.receiveRecognitions)
                .catch(error => Observable.of({type: ActionTypes.RECOGNITIONS_ERROR, payload: error}))
        );

const getUsersEpic = action$ =>
    action$.ofType(ActionTypes.REQUEST_USERS)
        .mergeMap(action =>
            ajax.get(BASE_URL, JSON.stringify(action.payload), HEADER)
                .map(Actions.receiveUsers)
                .catch(error => Observable.of({type: ActionTypes.USERS_ERROR, payload: error}))
        );

export default combineEpics(
    getRecentRecognitionEpic,
    getUsersEpic
);
