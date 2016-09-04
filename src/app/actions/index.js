import * as ActionTypes from '../action-types';

export const openModal = (config) => ({type: ActionTypes.OPEN_MODAL, payload: config});
export const closeModal = () => ({type: ActionTypes.CLOSE_MODAL});

export const receiveHealthCheck = payload => ({type: ActionTypes.RECEIVED_HEALTH_CHECK, payload});
export const requestHealthCheck = () => ({type: ActionTypes.REQUEST_HEALTH_CHECK});

