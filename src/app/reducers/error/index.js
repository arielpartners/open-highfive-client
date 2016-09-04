import {LOGIN_ERROR, LOGIN_PENDING} from '../../action-types';

const LOGIN_ERROR_MSG = 'Email and/or password not recognized. Please try again';
const BAD_THINGS_HAPPENED = 'The server is experiencing technical difficulties, please contact your administrator';
//-------------------------------------------------------------------
// Error STORE
//-------------------------------------------------------------------
export const error = (state = null, {type, payload}) => {
    /* eslint-disable indent */
    switch (type) {
        case LOGIN_ERROR:
            switch (payload.status) {
                case 401:
                    return {message: LOGIN_ERROR_MSG};

                default:
                    return {message: BAD_THINGS_HAPPENED};
            }
        case LOGIN_PENDING:
            return {message: 'Logging in ...'};

        default:
            return null;
    }
};
