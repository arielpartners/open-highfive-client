import * as ActionTypes from '../../../action-types';

export const recognitions = (state = {}, action) => {
    /* eslint-disable indent */
    switch (action.type) {
        case ActionTypes.RECIEVED_RECOGNITIONS:
            return action.payload;
        default:
            return state;
    }
};
