import * as ActionTypes from '../../../action-types';

export const metrics = (state = {}, action) => {
    /* eslint-disable indent */
    switch (action.type) {
        case ActionTypes.RECEIVED_METRICS:
            return action.payload;
        default:
            return state;
    }
};
