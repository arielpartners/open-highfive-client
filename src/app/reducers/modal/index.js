import * as ActionTypes from '../../action-types';

//-------------------------------------------------------------------
// MODAL REDUCER
//-------------------------------------------------------------------
/* eslint-disable indent, complexity */
export const modalDisplayed = (state = {show: false}, {type, payload}) => {

    switch (type) {
        case ActionTypes.OPEN_MODAL:
            return { show: true, config: payload};
        case ActionTypes.CLOSE_MODAL:
            return { show: false};
        case ActionTypes.OPEN_RECOGNITIONCARD_MODAL:
            return { show: true };
        case ActionTypes.CLOSE_RECOGNITIONCARD_MODAL:
            return { show: false };

        default:
            return state;
    }
};
