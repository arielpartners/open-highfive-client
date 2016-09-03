import {combineEpics} from 'redux-observable';
import {push} from 'react-router-redux';

import LoginEpics from '../containers/login/epics';
import RecognitionsEpics from '../containers/header/epics';
import {loginError} from '../containers/login/actions';
//import * as ActionTypes from '../action-types';

/**
 * 401 Epic
 *
 *  @param {Observable} action$ a stream of actions
 *
 *  We don't know if the user is logged out or just doesn't have access to this api
 *  so we may need to support making decisions on a per api-call basis
 *
 *  @returns {Observable} a stream of actions
 */
export const unAuthorizedEpic = action$ =>
    action$.filter(action =>
        (
            window.location.pathname !== '/login' &&
            action.payload &&
            action.payload.status === 401 &&
            (
                true
                // This one is here just to test in case we need per call
                //action.type === ActionTypes.RECOGNITIONS_ERROR
                //more action types can follow using ||
            )
        )
    )
        .map(loginError)
        .map(() => push('/login'));

export default combineEpics(LoginEpics, RecognitionsEpics, unAuthorizedEpic);
