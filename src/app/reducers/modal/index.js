import * as ActionTypes from '../../action-types';

//-------------------------------------------------------------------
// MODAL REDUCER
//-------------------------------------------------------------------
/* eslint-disable indent, complexity */
export const modalDisplayed = (state = false, {type}) => {

    switch (type) {
        case ActionTypes.OPEN_MODAL:
            return true;
        case ActionTypes.CLOSE_MODAL:
            return false;
        default:
            return state;
    }
};
