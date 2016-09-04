import * as ActionTypes from '../../../action-types';

//-------------------------------------------------------------------
// RECOGNITION REDUCER
//-------------------------------------------------------------------
/* eslint-disable indent, complexity */
export const recognitions = (state = [], {type, payload}) => {

    switch (type) {
        case ActionTypes.REQUEST_RECOGNITIONS:
            return state;
        case ActionTypes.RECEIVED_RECOGNITIONS:
            return payload;
        default:
            return payload && /(401|403)/.test(payload.status) ? false : state;
    }
};

export const users = (state = [], {type, payload}) => {

    switch (type) {
        case ActionTypes.REQUEST_USERS:
            return state;
        case ActionTypes.RECEIVED_USERS:
            return payload;
        default:
            return payload && /(401|403)/.test(payload.status) ? false : state;
    }
};
