//TODO:  Should this be moved to the login component?

import {LOGIN, LOGIN_ERROR, LOGOUT} from '../../components/login/actions';

//-------------------------------------------------------------------
// User ITEM STORE
//-------------------------------------------------------------------
export const user = (state = {}, {type, payload}) => {
    /* eslint-disable indent */
    switch (type) {
        case LOGIN:
            return payload;
        case LOGIN_ERROR:
            return {};
        case LOGOUT:
            return {};
        default:
            return state;
    }
};
