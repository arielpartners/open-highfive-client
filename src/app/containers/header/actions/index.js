import * as ActionTypes from '../../../action-types';

//
// action creators / action factories
//
export const recieveMetrics = payload => ({type: ActionTypes.RECIEVED_METRICS, payload});
export const requestMetrics = () => ({type: ActionTypes.REQUEST_METRICS});
