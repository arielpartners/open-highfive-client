import {ITEM_ERROR, LOAD_ITEMS, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../../actions';

//-------------------------------------------------------------------
// ITEMS STORE
//-------------------------------------------------------------------
/* eslint-disable complexity */
export const items = (state = [], {type, payload}) => {
    /* eslint-disable indent */
    switch (type) {
        case CREATE_ITEM:
            return [...state, payload];
        case DELETE_ITEM:
            return state.filter(item => {
                return item._id !== payload._id;
            });
        case ITEM_ERROR:
            /* eslint-disable no-console */
            //TODO: Add UI yfor error state
            console.error('error', payload);
            /* eslint-enable no-console */
            return state;
        case LOAD_ITEMS:
            return payload;
        case UPDATE_ITEM:
            return state.map(item => {
                return item._id === payload._id ? Object.assign({}, item, payload) : item;
            });
        default:
            return state;
    }
    /* eslint-enable indent */
};
/* eslint-enable complexity */
