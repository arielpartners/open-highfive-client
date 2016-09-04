import * as ActionTypes from '../../../action-types';

export const receiveRecognitions = payload => ({type: ActionTypes.RECEIVED_RECOGNITIONS, payload: payload.response});
export const requestRecognitions = () => ({type: ActionTypes.REQUEST_RECOGNITIONS});

export const receiveUsers = payload => ({type: ActionTypes.RECEIVED_USERS, payload: payload.response});
export const requestUsers = () => ({type: ActionTypes.REQUEST_USERS});

