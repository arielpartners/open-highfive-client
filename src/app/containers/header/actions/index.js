import * as ActionTypes from '../../../action-types';

//
// action creators / action factories
//
export const recieveRecognitions = payload => ({type: ActionTypes.RECIEVED_RECOGNITIONS, payload});
export const requestRecognitions = () => ({type: ActionTypes.REQUEST_RECOGNITIONS});
