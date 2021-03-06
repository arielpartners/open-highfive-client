import * as ActionTypes from '../../../action-types';

export const receiveMyRecognitions = payload => ({
    type: ActionTypes.RECEIVED_MY_RECOGNITIONS,
    payload: payload.response
});

export const requestMyRecognitions = (user) => ({
    type: ActionTypes.REQUEST_MY_RECOGNITIONS,
    payload: user
});

export const receiveRecognitions = payload => ({
    type: ActionTypes.RECEIVED_RECOGNITIONS,
    payload: payload.response
});

export const requestRecognitions = () => ({type: ActionTypes.REQUEST_RECOGNITIONS});

export const createRecognition = recognition => ({
    type: ActionTypes.CREATE_RECOGNITION_PENDING, payload: recognition
});

export const recognitionCreated = () => ({type: ActionTypes.RECOGNITION_CREATED});

export const receiveUsers = payload => ({
    type: ActionTypes.RECEIVED_USERS,
    payload: payload.response
});

export const requestUsers = () => ({type: ActionTypes.REQUEST_USERS});

