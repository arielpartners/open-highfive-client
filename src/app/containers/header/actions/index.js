import * as ActionTypes from '../../../action-types';

//
// action creators / action factories
//
export const receiveMetrics = payload => ({type: ActionTypes.RECEIVED_METRICS, payload});
export const requestMetrics = () => ({type: ActionTypes.REQUEST_METRICS});
