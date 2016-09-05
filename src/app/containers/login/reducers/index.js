import * as ActionTypes from '../../../action-types';

//-------------------------------------------------------------------
// LOGIN REDUCER
//-------------------------------------------------------------------
/* eslint-disable indent, complexity */
export const loggedIn = (state = false, {type, payload}) => {

    switch (type) {
        case '@@router/LOCATION_CHANGE':
            return payload.pathname === '/login' ? false : state;
        case ActionTypes.LOGGING_IN:
            return false;
        case ActionTypes.LOGIN:
            return true;
        case ActionTypes.LOGIN_ERROR:
            return false;
        case ActionTypes.LOGOUT:
            return false;
        default:
            return payload && /(401|403)/.test(payload.status) ? false : state;
    }
};

export const user = (state = false, {type, payload}) => {

    switch (type) {
        case ActionTypes.LOGIN:
            return payload;

        default:
            return payload && /(401|403)/.test(payload.status) ? false : state;
    }
};
