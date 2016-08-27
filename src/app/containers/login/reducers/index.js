import {LOGIN, LOGIN_ERROR, LOGOUT} from '../actions';

//-------------------------------------------------------------------
// LOGIN STORE
//-------------------------------------------------------------------
export const loggedIn = (state = false, {type, payload}) => {
    /* eslint-disable indent */
    switch (type) {
        case LOGIN:
            return true;
        case LOGIN_ERROR:
            return false;
        case LOGOUT:
            return false;
        default:
            return payload && /(401|403)/.test(payload.status) ? false : state;
    }
};
