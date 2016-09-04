import {Observable} from 'rxjs';
import {ajax} from 'rxjs/observable/dom/ajax';
import * as ActionTypes from '../../action-types';
import {receiveHealthCheck} from '../../actions';

export const healthCheckEpic = action$ => {
    return action$.ofType(ActionTypes.REQUEST_HEALTH_CHECK)
        .mergeMap(() => ajax.getJSON('/api/healthcheck')
            .map(receiveHealthCheck)
            .catch(error => Observable.of({type: ActionTypes.HEALTH_CHECK_ERROR, payload: error.message}))
        );
};
