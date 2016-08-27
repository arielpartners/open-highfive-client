import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {ajax} from 'rxjs/observable/dom/ajax';

// Import actions
import {RECOGNITIONS_ERROR, recognitionsLoaded} from '../actions';

// Configure AJAX
const BASE_URL = '/api/recognitions';

const loadRecognitionsEpic = action$ =>
  action$.ofType('persist/REHYDRATE')
    .mergeMap(() => ajax.getJSON(BASE_URL)
    .map(recognitionsLoaded)
    // We can abort the action before the response returns if we choose to
    //.takeUntil(actions.ofType(LOAD_RECOGNITIONS_ABORTED))
    .catch(error => Observable.of({type: RECOGNITIONS_ERROR, payload: error.message}))
  );

export const recognitionsEpics = combineEpics(
  loadRecognitionsEpic
);
