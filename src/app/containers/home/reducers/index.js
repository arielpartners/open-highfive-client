import * as ActionTypes from '../../../action-types';

//-------------------------------------------------------------------
// RECOGNITION REDUCER
//-------------------------------------------------------------------
/* eslint-disable indent, complexity */
export const recognitions = (state = [], {type, payload}) => {

    /* eslint-disable no-console */
    switch (type) {
        case ActionTypes.REQUEST_RECOGNITIONS:
            console.log('REQUEST_RECOGNITIONS');
            return state;
        default:
            return payload && /(401|403)/.test(payload.status) ? false : state;
    }
};
