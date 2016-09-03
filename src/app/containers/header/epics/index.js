import {Observable} from 'rxjs';
import {ajax} from 'rxjs/observable/dom/ajax';
import * as ActionTypes from '../../../action-types';
import {recieveRecognitions} from '../actions';

// Configure AJAX
const BASE_URL = '/api/metrics';

// loadRecognitionsEpic
export default action$ => {
    return action$.ofType(ActionTypes.REQUEST_METRICS)
        .mergeMap(() => ajax.getJSON(BASE_URL)
            .map(recieveRecognitions)
            // We can abort the action before the response returns if we choose to
            //.takeUntil(actions.ofType(LOAD_RECOGNITIONS_ABORTED))
            .catch(error => Observable.of({type: ActionTypes.METRICS_ERROR, payload: error.message}))
        );
};
