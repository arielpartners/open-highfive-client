// When action complexity increases create an 'actions' directory
// Use actions/index.js to import individual actions
// See reducers for an example
import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {ajax} from 'rxjs/observable/dom/ajax';

export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_PENDING = 'LOGOUT_PENDING';

const BASE_URL = '/login';
const HEADER = {'Content-Type': 'application/json'};

//
// action creators / action factories
//
export const login = credentials => ({type: LOGIN_PENDING, payload: credentials});
export const userAuthenticated = payload => ({type: LOGIN, payload: payload.response});
export const logout = () => ({type: LOGOUT_PENDING});
export const userLoggedOut = () => ({type: LOGOUT});

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

const logoutEpic = action$ =>
    action$.ofType(LOGOUT_PENDING)
        .do(() => {
            // remove JWT token so user is unauthorized
            XMLHttpRequest.clearBearerToken();
        })
        .map(userLoggedOut);

export const loginEpics = combineEpics(
    loginEpic,
    logoutEpic
);

