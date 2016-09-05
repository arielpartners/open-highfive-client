import * as ActionTypes from '../../../../action-types';

export const openRecognitionCardModal = payload => {
    return ({
        type: ActionTypes.OPEN_RECOGNITIONCARD_MODAL,
        payload: payload});
};

export const closeRecognitionCardModal = () => ({type: ActionTypes.CLOSE_RECOGNITIONCARD_MODAL});
