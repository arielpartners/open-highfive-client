import * as ActionTypes from '../../action-types';

export const healthCheck = (state = {}, action) => {
    /* eslint-disable indent */
    switch (action.type) {
        case ActionTypes.RECEIVED_HEALTH_CHECK:
            return action.payload;
        default:
            return state;
    }
};
