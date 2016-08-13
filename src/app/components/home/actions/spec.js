
/* global beforeEach, afterEach, describe, it,  */

import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import root from 'rxjs/util/root';
import {MockXMLHttpRequest} from 'ajax-helper';
import chai, {should, expect} from 'chai';
chai.config.truncateThreshold = 0; // prints details for deepEquals() failures
import * as Actions from '../actions';
import {homeEpics} from '../actions';
import _ from 'lodash';

// no-unused-vars fix for should
should(should);

/* eslint-disable max-statements */
/* eslint-disable no-unused-expressions */

describe('Actions', function() {
    const reducer = (state = [], action) => state.concat(action), middleware = createEpicMiddleware(homeEpics);

    let gXHR, rXHR;

    beforeEach(() => {
        gXHR = global.XMLHttpRequest;
        rXHR = root.XMLHttpRequest;
        global.XMLHttpRequest = MockXMLHttpRequest;
        root.XMLHttpRequest = MockXMLHttpRequest;
    });

    afterEach(() => {
        MockXMLHttpRequest.clearRequest();

        global.XMLHttpRequest = gXHR;
        root.XMLHttpRequest = rXHR;
    });

    describe('CRUD operations', () => {

        describe('CREATE', () => {
            let store;

            beforeEach(() => {
                store = createStore(reducer, applyMiddleware(middleware));
            });

            it('triggers the CREATE_ITEM action when createItem action creator is called', () => {

                const item = {_id: 1, foo: 'bar'};
                const expected = JSON.stringify(item);

                store.dispatch(Actions.createItem(item));

                MockXMLHttpRequest.mostRecent.respondWith({
                    status: 200,
                    responseType: 'json',
                    contentType: 'application/json',
                    responseText: expected
                });

                store.getState().should.deep.equal([
                    {type: '@@redux/INIT'},
                    {type: Actions.CREATE_ITEM_PENDING, payload: JSON.parse(expected)},
                    {type: Actions.CREATE_ITEM, payload: JSON.parse(expected)}
                ]);

            });

            it('should support array payloads', () => {

                const item = [{_id: 1, foo: 'bar'}];
                const expected = JSON.stringify(item);

                store.dispatch(Actions.createItem(item));

                MockXMLHttpRequest.mostRecent.respondWith({
                    status: 200,
                    responseType: 'json',
                    contentType: 'application/json',
                    responseText: expected
                });

                store.getState().should.deep.equal([
                    {type: '@@redux/INIT'},
                    {type: Actions.CREATE_ITEM_PENDING, payload: JSON.parse(expected)},
                    {type: Actions.CREATE_ITEM, payload: JSON.parse(expected)[0]}
                ]);
            });

            it('triggers the ITEM_Error action when createItem action creator call fails', () => {

                const item = [{error: 'foo error'}];
                const expected = JSON.stringify(item);

                store.dispatch(Actions.createItem(item));

                MockXMLHttpRequest.mostRecent.respondWith({
                    status: 500,
                    responseType: 'json',
                    contentType: 'application/json',
                    responseText: expected
                });

                JSON.stringify(store.getState()).should.include('ajax error 500');

            });

        });
        describe('UPDATE', () => {

            it('triggers the UPDATE_ITEM action when updateItem action creator is called', () => {

                const store = createStore(reducer, applyMiddleware(middleware));

                const item = [{_id: 1, foo: 'bar'}];

                const expected = JSON.stringify(item);

                store.dispatch(Actions.updateItem(item));

                MockXMLHttpRequest.mostRecent.respondWith({
                    status: 200,
                    responseType: 'json',
                    contentType: 'application/json',
                    responseText: expected
                });

                store.getState().should.deep.equal([
                    {type: '@@redux/INIT'},
                    {type: Actions.UPDATE_ITEM_PENDING, payload: JSON.parse(expected)},
                    {type: Actions.UPDATE_ITEM, payload: JSON.parse(expected)}
                ]);

            });

            it('triggers the ITEM_Error action when updateItem action creator call fails', () => {

                const store = createStore(reducer, applyMiddleware(middleware));

                const item = [{error: 'foo error'}];

                const expected = JSON.stringify(item);

                store.dispatch(Actions.updateItem(item));

                MockXMLHttpRequest.mostRecent.respondWith({
                    status: 500,
                    responseType: 'json',
                    contentType: 'application/json',
                    responseText: expected
                });

                JSON.stringify(store.getState()).should.include('ajax error 500');

            });

        });
        describe('DELETE', () => {

            it('triggers the DELETE_ITEM action when deleteItem action creator is called', () => {

                const store = createStore(reducer, applyMiddleware(middleware));

                const item = {_id: 1};

                const expected = JSON.stringify(item);

                store.dispatch(Actions.deleteItem(item));

                MockXMLHttpRequest.mostRecent.respondWith({
                    status: 200,
                    responseType: 'json',
                    contentType: 'application/json',
                    responseText: expected
                });

                store.getState().should.deep.equal([
                    {type: '@@redux/INIT'},
                    {type: Actions.DELETE_ITEM_PENDING, payload: JSON.parse(expected)},
                    {type: Actions.SELECT_ITEM, payload: null},
                    {type: Actions.DELETE_ITEM, payload: JSON.parse(expected)}
                ]);

            });

            it('triggers the ITEM_Error action when deleteItem action creator call fails', () => {

                const store = createStore(reducer, applyMiddleware(middleware));

                const item = [{error: 'foo error'}];

                const expected = JSON.stringify(item);

                store.dispatch(Actions.deleteItem(item));

                MockXMLHttpRequest.mostRecent.respondWith({
                    status: 500,
                    contentType: 'application/json',
                    responseText: expected
                });

                JSON.stringify(store.getState()).should.include('ajax error 500');
            });

        });

        describe('CREATE_AND_SELECT_ITEM', () => {
            let store;

            beforeEach(() => {
                store = createStore(reducer, applyMiddleware(middleware));
            });

            it('triggers the CREATE_ITEM then the SELECT_ITEM action when action creator is called', () => {

                const item = {_id: 1, foo: 'bar'};
                const nextItem = {_id: 'next-item'};
                const itemReturned = {_id: 2, foo: 'bars'};

                const expectedPreCreate = JSON.stringify({itemToCreate: item, itemToSelect: nextItem});
                const expectedPostCreate = JSON.stringify({itemCreated: itemReturned, itemToSelect: nextItem});

                store.dispatch(Actions.createAndSelectItem(item, nextItem));

                MockXMLHttpRequest.mostRecent.respondWith({
                    status: 200,
                    responseType: 'json',
                    contentType: 'application/json',
                    responseText: JSON.stringify(itemReturned)
                });

                store.getState().should.deep.equal([
                    {type: '@@redux/INIT'},
                    {type: Actions.CREATE_AND_SELECT_ITEM_PENDING, payload: JSON.parse(expectedPreCreate)},
                    {type: Actions.CREATE_AND_SELECT_ITEM, payload: JSON.parse(expectedPostCreate)},
                    {type: Actions.CREATE_ITEM, payload: itemReturned},
                    {type: Actions.SELECT_ITEM, payload: nextItem}
                ]);
            });

            it('should not trigger SELECT_ITEM when ITEM_ERROR action occurs from createItem failure', () => {

                const item = [{error: 'foo error'}];
                const expected = JSON.stringify(item);
                const nextItem = {_id: 'next-item'};

                store.dispatch(Actions.createAndSelectItem(item, nextItem));

                MockXMLHttpRequest.mostRecent.respondWith({
                    status: 500,
                    responseType: 'json',
                    contentType: 'application/json',
                    responseText: expected
                });

                const state = store.getState();
                JSON.stringify(state).should.include('ajax error 500');

                expect(_.filter(state, {type: Actions.CREATE_AND_SELECT_ITEM_PENDING})).to.have.length(1);
                expect(_.filter(state, {type: Actions.CREATE_ITEM})).to.be.empty;
                expect(_.filter(state, {type: Actions.SELECT_ITEM})).to.be.empty;

            });
        });
    });

    describe('Item operations', () => {

        it('triggers LOAD_ITEMS and LOAD_ITEMS_PENDING actions when loadItems action creator is called', () => {

            const store = createStore(reducer, applyMiddleware(middleware));

            store.dispatch(Actions.loadItems());

            const expected = JSON.stringify(['do something']);

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 200,
                responseType: 'json',
                contentType: 'application/json',
                responseText: expected
            });

            store.getState().should.deep.equal([
                {type: '@@redux/INIT'},
                {type: Actions.LOAD_ITEMS_PENDING, payload: ''},
                {type: Actions.LOAD_ITEMS, payload: JSON.parse(expected)}
            ]);
        });

        it('triggers LOAD_ITEMS_PENDING  with window location hash value as the payload', () => {
            const store = createStore(reducer, applyMiddleware(middleware));

            store.dispatch(Actions.loadItems());

            const expected = JSON.stringify([{id: 'id'}]);

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 200,
                responseType: 'json',
                contentType: 'application/json',
                responseText: expected
            });

            store.getState().should.deep.equal([
                {type: '@@redux/INIT'},
                {type: Actions.LOAD_ITEMS_PENDING, payload: ''},
                {type: Actions.LOAD_ITEMS, payload: JSON.parse(expected)}
            ]);
        });

        it('triggers the ITEM_Error action when loadItems action creator call fails', () => {

            const store = createStore(reducer, applyMiddleware(middleware));

            const item = [{error: 'foo error'}];

            const expected = JSON.stringify(item);

            store.dispatch(Actions.loadItems());

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 500,
                responseType: 'json',
                contentType: 'application/json',
                responseText: expected
            });

            JSON.stringify(store.getState()).should.include('ajax error 500');

        });

        it('triggers the SELECT_ITEM action when selectItem action creator is called', () => {

            const store = createStore(reducer, applyMiddleware(middleware));
            const item = {_id: 1, foo: 'bar'};

            store.dispatch(Actions.selectItem(item));

            store.getState().should.deep.equal([
                {type: '@@redux/INIT'},
                {type: Actions.SELECT_ITEM, payload: item}
            ]);
        });

    });

});
