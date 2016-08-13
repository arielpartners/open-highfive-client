/* global beforeEach, afterEach, describe, it,  */

import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import root from 'rxjs/util/root';
import {MockXMLHttpRequest} from 'ajax-helper';
import {should} from 'chai'; // You can use any testing library
import {LOGIN, LOGIN_PENDING, LOGOUT, LOGOUT_PENDING, login, logout} from './';
import {loginEpics} from './';

// no-unused-vars fix for should
should(should);

describe('Actions', ()=> {
    const reducer = (state = [], action) => state.concat(action), middleware = createEpicMiddleware(loginEpics);

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

    describe('LOGIN', () => {
        it('triggers the LOGIN action when login action creator is called', () => {
            const store = createStore(reducer, applyMiddleware(middleware));
            const user = {user: 'test'};
            const expected = JSON.stringify(user);

            store.dispatch(login(user));

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 200,
                contentType: 'application/json',
                responseText: expected
            });

            store.getState().should.deep.equal([
                {type: '@@redux/INIT'},
                {type: LOGIN_PENDING, payload: user},
                {type: LOGIN, payload: user}
            ]);
        });

        it('triggers the LOGIN_ERROR action when LOGIN action creator call fails', () => {

            const store = createStore(reducer, applyMiddleware(middleware));

            const user = [{error: 'foo error'}];

            const expected = JSON.stringify(user);

            store.dispatch(login(user));

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 500,
                contentType: 'application/json',
                responseText: expected
            });

            JSON.stringify(store.getState()).should.include('ajax error 500');

        });

    });
    describe('LOGOUT', () => {
        it('triggers the LOGOUT action when logout action creator is called', () => {
            const store = createStore(reducer, applyMiddleware(middleware));

            store.dispatch(logout());

            store.getState().should.deep.equal([
                {type: '@@redux/INIT'},
                {type: LOGOUT_PENDING},
                {type: LOGOUT}
            ]);
        });
    });
});
