// When action complexity increases create an 'actions' directory
// Use actions/index.js to import individual actions
// See reducers for an example
import {Observable} from 'rxjs';
import {combineEpics, ActionsObservable} from 'redux-observable';
import {ajax} from 'rxjs/observable/dom/ajax';

export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_PENDING = 'LOGOUT_PENDING';
export const CHANGE_PASSWORD_PENDING = 'CHANGE_PASSWORD_PENDING';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';
export const CHANGE_EMAIL_PENDING = 'CHANGE_EMAIL_PENDING';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_EMAIL_ERROR = 'CHANGE_EMAIL_ERROR';

const BASE_URL = '/login';
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

//
// action creators / action factories
//
export const login = credentials => ({type: LOGIN_PENDING, payload: credentials});
export const userAuthenticated = payload => ({type: LOGIN, payload: payload.response});
export const logout = () => ({type: LOGOUT_PENDING});
export const userLoggedOut = () => ({type: LOGOUT});
export const changePassword = credentials => ({type: CHANGE_PASSWORD_PENDING, payload: credentials});
export const passwordChanged = payload => ({type: CHANGE_PASSWORD, payload: payload.response});
export const changeEmail = credentials => ({type: CHANGE_EMAIL_PENDING, payload: credentials});
export const emailChanged = payload => ({type: CHANGE_EMAIL, payload: payload.response});

//
// epics
//
const storeAuthToken = payload => {
    // Save JWT authentication Token so we send it on all future requests
    XMLHttpRequest.setBearerToken(payload.token);
};
/* storeAuthToken will be called from signup also, in future */

const loginEpic = action$ =>
    action$.ofType(LOGIN_PENDING)
        .mergeMap(action =>
            ajax.post(BASE_URL, JSON.stringify(action.payload), HEADER)
                .do(storeAuthToken)
                .map(userAuthenticated)
                .catch(error => Observable.of({type: LOGIN_ERROR, payload: error}))
        );

const changeEmailEpic = action$ =>
    action$.ofType(CHANGE_EMAIL_PENDING)
        .mergeMap(action => (
            spawnEpic(loginEpic, login(action.payload))
                .concat(
                    ajax.put(CHANGE_USER_URL + '/' + action.payload.email, JSON.stringify(action.payload), HEADER)
                        .map(emailChanged)
                        .catch(error => Observable.of({type: CHANGE_EMAIL_ERROR, payload: error}))
                )
                .takeUntil(action$.ofType(LOGIN_ERROR))
        ));

const changePasswordEpic = action$ =>
    action$.ofType(CHANGE_PASSWORD_PENDING)
        .mergeMap(action => (
            spawnEpic(loginEpic, login(action.payload))
                .concat(
                    ajax.put(CHANGE_USER_URL + '/' + action.payload.email, JSON.stringify(action.payload), HEADER)
                        .map(passwordChanged)
                        .catch(error => Observable.of({type: CHANGE_PASSWORD_ERROR, payload: error}))
                )
                .takeUntil(action$.ofType(LOGIN_ERROR))
        ));

const logoutEpic = action$ =>
    action$.ofType(LOGOUT_PENDING)
        .do(() => {
            // remove JWT token so user is unauthorized
            XMLHttpRequest.clearBearerToken();
        })
        .map(userLoggedOut);

export const loginEpics = combineEpics(
    loginEpic,
    changeEmailEpic,
    changePasswordEpic,
    logoutEpic
);

