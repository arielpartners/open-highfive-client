/* global beforeEach, afterEach, describe, it,  */

import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import root from 'rxjs/util/root';
import {MockXMLHttpRequest} from 'ajax-helper';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import {should} from 'chai'; // You can use any testing library
import * as ActionTypes from '../action-types';
import * as Actions from '../containers/header/actions';
import unAuthorizedEpic from './index';

// no-unused-vars fix for should
should(should);

/* eslint-disable max-statements, camelcase, max-len */

const reducer = (state = [], action) => state.concat(action), middleware = createEpicMiddleware(unAuthorizedEpic);

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

/* eslint-disable no-console */
describe('unAuthorizedEpic', () => {
    it('triggers a redirect to /login when a 401 is detected', () => {
        const store = createStore(reducer, applyMiddleware(middleware, routerMiddleware(browserHistory)));
        const expected = JSON.stringify('Unauthorized Error');

        store.dispatch(Actions.requestMetrics());

        MockXMLHttpRequest.mostRecent.respondWith({
            status: 401,
            contentType: 'application/json',
            responseText: expected
        });

        store.getState().should.deep.equal([
            {type: '@@redux/INIT'},
            {type: ActionTypes.REQUEST_METRICS},
            {type: ActionTypes.METRICS_ERROR, payload: 'ajax error 401'},
        ]);
    });

    it('does not trigger a redirect for other errors', () => {

        const store = createStore(reducer, applyMiddleware(middleware, routerMiddleware(browserHistory)));
        const error = 'ajax error 500';

        const expected = JSON.stringify(error);

        store.dispatch(Actions.requestMetrics());

        MockXMLHttpRequest.mostRecent.respondWith({
            status: 500,
            contentType: 'application/json',
            responseText: expected
        });

        const state = store.getState();
        console.log('state 500', state);
        state[0].should.deep.equal({type: '@@redux/INIT'});
        state[1].should.deep.equal({type: ActionTypes.REQUEST_METRICS});
        state[2].type.should.equal(ActionTypes.METRICS_ERROR);
        state[2].payload.should.deep.equal(error);
    });
});
