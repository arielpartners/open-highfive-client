import * as ActionTypes from '../../../action-types';

//
// action creators / action factories
//
export const recieveRecognitions = payload => ({type: ActionTypes.RECIEVED_METRICS, payload});
export const requestRecognitions = () => ({type: ActionTypes.REQUEST_METRICS});
