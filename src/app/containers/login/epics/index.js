// When action complexity increases create an 'actions' directory
// Use actions/index.js to import individual actions
// See reducers for an example
import {Observable} from 'rxjs';
import {combineEpics, ActionsObservable} from 'redux-observable';
import {ajax} from 'rxjs/observable/dom/ajax';
import {push} from 'react-router-redux';

import * as ActionTypes from '../../../action-types';
import * as Actions from '../actions';

const BASE_URL = '/api/auth';
const CHANGE_USER_URL = '/users';
const HEADER = {'Content-Type': 'application/json'};

//
// Hopefully this will become part of the redux-observables public API by
// the time redux-observables 1.0 is released (shortly)
// in the meantime, spawnEpic could be added to some common utils lib
//
const spawnEpic = (epicFactory, ...actions) => {
    const input$ = Observable.of(...actions);
    const actions$ = new ActionsObservable(input$);
    return epicFactory(actions$);
};

// Epics
const storeAuthToken = payload => {
    // Save JWT authentication Token so we send it on all future requests
    XMLHttpRequest.setBearerToken(payload.response.token);
};
/* storeAuthToken will be called from signup also, in future */
const loggedInEpic = action$ =>
    action$.ofType(ActionTypes.LOGIN)
        .map(() => push('/home'));

const loginEpic = action$ =>
    action$.ofType(ActionTypes.LOGIN_PENDING)
        .mergeMap(action =>
            ajax.post(BASE_URL, JSON.stringify(action.payload), HEADER)
                .do(storeAuthToken)
                .map(Actions.userAuthenticated)
                .catch(error => Observable.of({type: ActionTypes.LOGIN_ERROR, payload: error}))
        );

const changeEmailEpic = action$ =>
    action$.ofType(ActionTypes.CHANGE_EMAIL_PENDING)
        .mergeMap(action => (
            spawnEpic(loginEpic, Actions.login(action.payload))
                .concat(
                    ajax.put(CHANGE_USER_URL + '/' + action.payload.email, JSON.stringify(action.payload), HEADER)
                        .map(Actions.emailChanged)
                        .catch(error => Observable.of({
                            type: ActionTypes.CHANGE_EMAIL_ERROR,
                            payload: error.xhr.response
                        }))
                )
                .takeUntil(action$.ofType(ActionTypes.LOGIN_ERROR))
        ));

const changePasswordEpic = action$ =>
    action$.ofType(ActionTypes.CHANGE_PASSWORD_PENDING)
        .mergeMap(action => (
            spawnEpic(loginEpic, Actions.login(action.payload))
                .concat(
                    ajax.put(CHANGE_USER_URL + '/' + action.payload.email, JSON.stringify(action.payload), HEADER)
                        .map(Actions.passwordChanged)
                        .catch(error => Observable.of({
                            type: ActionTypes.CHANGE_PASSWORD_ERROR,
                            payload: error.xhr.response
                        }))
                )
                .takeUntil(action$.ofType(ActionTypes.LOGIN_ERROR))
        ));

const logoutEpic = action$ =>
    action$.ofType(ActionTypes.LOGOUT_PENDING)
        .do(() => {
            // remove JWT token so user is unauthorized
            XMLHttpRequest.clearBearerToken();
        })
        .map(Actions.userLoggedOut);

export default combineEpics(
    loggedInEpic,
    loginEpic,
    changeEmailEpic,
    changePasswordEpic,
    logoutEpic
);

