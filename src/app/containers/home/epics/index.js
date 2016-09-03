import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {ajax} from 'rxjs/observable/dom/ajax';
// import {push} from 'react-router-redux';

import * as ActionTypes from '../../../action-types';
import * as Actions from '../actions';

const BASE_URL = '/api/recognitions';
// const CHANGE_USER_URL = '/users';
const HEADER = {'Content-Type': 'application/json'};

// const spawnEpic = (epicFactory, ...actions) => {
//     const input$ = Observable.of(...actions);
//     const actions$ = new ActionsObservable(input$);
//     return epicFactory(actions$);
// };

const getRecentRecognitionEpic = action$ =>
    // action$.ofType(ActionTypes.LOGIN_PENDING)
    action$.ofType(ActionTypes.REQUEST_RECOGNITIONS)
        .mergeMap(action =>
            ajax.post(BASE_URL, JSON.stringify(action.payload), HEADER)
                .map(Actions.getRecentRecognition)
                .catch(error => Observable.of({type: ActionTypes.RECOGNITIONS_ERROR, payload: error}))
        );

export default combineEpics(
    getRecentRecognitionEpic
);
