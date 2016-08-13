// When action complexity increases create an 'actions' directory
// Use actions/index.js to import individual actions
// See reducers for an example
import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {ajax} from 'rxjs/observable/dom/ajax';

export const LOAD_ITEMS = 'LOAD_ITEMS';
export const LOAD_ITEMS_PENDING = 'LOAD_ITEMS_PENDING';
export const SELECT_ITEM = 'SELECT_ITEM';
export const CREATE_ITEM = 'CREATE_ITEM';
export const CREATE_ITEM_PENDING = 'CREATE_ITEM_PENDING';
export const CREATE_AND_SELECT_ITEM_PENDING = 'CREATE_AND_SELECT_ITEM_PENDING';
export const CREATE_AND_SELECT_ITEM = 'CREATE_AND_SELECT_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const UPDATE_ITEM_PENDING = 'UPDATE_ITEM_PENDING';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ITEM_PENDING = 'DELETE_ITEM_PENDING';
export const ITEM_ERROR = 'ITEM_ERROR';

const config = require('../../../../../package.json').config;
const BASE_URL = config.baseURL;
const HEADER = {'Content-Type': 'application/json'};

//
// action creators / action factories
//
export const createItem = item => ({type: CREATE_ITEM_PENDING, payload: item});
export const deleteItem = item => ({type: DELETE_ITEM_PENDING, payload: item});
export const itemDeleted = payload => ({type: DELETE_ITEM, payload: {_id: payload.response._id}});
export const updateItem = item => ({type: UPDATE_ITEM_PENDING, payload: item});
export const itemUpdated = payload => ({type: UPDATE_ITEM, payload: payload.response});
export const loadItems = () => ({type: LOAD_ITEMS_PENDING, payload: ''});
export const itemsLoaded = payload => ({type: LOAD_ITEMS, payload});
export const selectItem = item => ({type: SELECT_ITEM, payload: item});
export const itemCreated = payload => ({
    type: CREATE_ITEM,
    payload: Array.isArray(payload.response) ? payload.response[0] : payload.response
});
export const createAndSelectItem = (itemToCreate, itemToSelect) => ({
    type: CREATE_AND_SELECT_ITEM_PENDING,
    payload: {itemToCreate, itemToSelect}
});

//
// epics
//
const createItemEpic = action$ =>
    action$.ofType(CREATE_ITEM_PENDING)
        .mergeMap(action =>
            ajax.post(BASE_URL, JSON.stringify(action.payload), HEADER)
                .map(itemCreated)
                .catch(error => Observable.of({type: ITEM_ERROR, payload: error.message}))
        );

const createAndSelectItemPendingEpic = action$ =>
    action$.ofType(CREATE_AND_SELECT_ITEM_PENDING)
        .mergeMap(({payload: {itemToCreate}, payload: {itemToSelect}}) =>
            ajax.post(BASE_URL, JSON.stringify(itemToCreate), HEADER)
                .map(payload => ({
                    type: CREATE_AND_SELECT_ITEM, payload: Array.isArray(payload.response) ?
                    {itemCreated: payload.response[0], itemToSelect} :
                    {itemCreated: payload.response, itemToSelect}
                }))
                .catch(error => Observable.of({type: ITEM_ERROR, payload: error.message}))
        );

const createAndSelectItemEpic = action$ =>
    action$.ofType(CREATE_AND_SELECT_ITEM)
        .mergeMap(({payload: {itemCreated}, payload: {itemToSelect}}) => // eslint-disable-line no-shadow
            Observable.concat(
                Observable.of({type: CREATE_ITEM, payload: itemCreated}),
                Observable.of(selectItem(itemToSelect))
            )
        );

const deleteItemEpic = action$ =>
    action$.ofType(DELETE_ITEM_PENDING)
        .mergeMap(action =>
            ajax.delete(`${BASE_URL}${action.payload._id}`)
                .map(itemDeleted)
                .catch(error => Observable.of({type: ITEM_ERROR, payload: error.message}))
                .startWith(selectItem(null))
        );

const updateItemEpic = action$ =>
    action$.ofType(UPDATE_ITEM_PENDING)
        .mergeMap(action =>
            ajax.put(`${BASE_URL}${action._id}`, JSON.stringify(action), HEADER)
                .map(itemUpdated)
                .catch(error => Observable.of({type: ITEM_ERROR, payload: error.message}))
        );

// Item operations
const loadItemsEpic = action$ =>
    action$.ofType(LOAD_ITEMS_PENDING)
        .mergeMap(() =>
            ajax.getJSON(BASE_URL)
                .map(itemsLoaded)
                // We can abort the action before the response returns if we choose to
                //.takeUntil(actions.ofType(LOAD_ITEMS_ABORTED))
                .catch(error => Observable.of({type: ITEM_ERROR, payload: error.message}))
        );

export const homeEpics = combineEpics(
    createItemEpic,
    createAndSelectItemPendingEpic,
    createAndSelectItemEpic,
    deleteItemEpic,
    updateItemEpic,
    loadItemsEpic
);
