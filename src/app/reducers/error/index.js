import {LOGIN_ERROR} from '../../action-types';

const LOGIN_ERROR_MSG = 'You provided an invalid email or password, please try again.';
//-------------------------------------------------------------------
// Error STORE
//-------------------------------------------------------------------
export const error = (state = null, {type}) => {
    /* eslint-disable indent */
    switch (type) {
        case LOGIN_ERROR:
            return LOGIN_ERROR_MSG;

        default:
            return null;
    }
};
