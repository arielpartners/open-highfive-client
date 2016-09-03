import * as ActionTypes from '../../../action-types';

export const receiveRecognitions = payload => ({type: ActionTypes.RECEIVED_RECOGNITIONS, payload: payload.response});
export const requestRecognitions = () => ({type: ActionTypes.REQUEST_RECOGNITIONS});

