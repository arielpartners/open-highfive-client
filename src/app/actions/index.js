import * as ActionTypes from '../action-types';

export const openModal = (config) => ({type: ActionTypes.OPEN_MODAL, payload: config});
export const closeModal = () => ({type: ActionTypes.CLOSE_MODAL});
