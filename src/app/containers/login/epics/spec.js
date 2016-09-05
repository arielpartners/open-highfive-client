/*
 Copyright (c) 2015 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global beforeEach, afterEach, describe, it, before  */

import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import root from 'rxjs/util/root';
import {MockXMLHttpRequest} from 'ajax-helper';
import {should} from 'chai'; // You can use any testing library
import {LOGIN, LOGIN_PENDING, LOGIN_ERROR, LOGOUT, LOGOUT_PENDING, login, logout} from './';
import {CHANGE_EMAIL, CHANGE_EMAIL_PENDING, CHANGE_EMAIL_ERROR, changeEmail} from './';
import {CHANGE_PASSWORD, CHANGE_PASSWORD_PENDING, CHANGE_PASSWORD_ERROR, changePassword} from './';
import {loginEpics} from './';
import * as ActionTypes from '../../../action-types';
import * as Actions from '../actions';

// no-unused-vars fix for should
should(should);

/* eslint-disable max-statements, camelcase, max-len */

describe.skip('Login', ()=> {
    const reducer = (state = [], action) => state.concat(action), middleware = createEpicMiddleware(loginEpics);

    let gXHR, rXHR;

    before(() => {
    });

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
            const user = {email: 'a@b.com', password: 'password'};
            const retUser = {email: 'a@b.com', token: 'ABC123'};
            const expected = JSON.stringify(retUser);

            store.dispatch(Actions.login(user));

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 200,
                contentType: 'application/json',
                responseText: expected
            });

            store.getState().should.deep.equal([
                {type: '@@redux/INIT'},
                {type: ActionTypes.LOGIN_PENDING, payload: user},
                {type: ActionTypes.LOGIN, payload: retUser}
            ]);
        });

        it('triggers the LOGIN_ERROR action when LOGIN action creator call fails', () => {

            const store = createStore(reducer, applyMiddleware(middleware));
            const user = [{email: 'a@b.com', password: 'password'}];
            const error = { message : 'error'};

            const expected = JSON.stringify(error);

            store.dispatch(login(user));

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 500,
                contentType: 'application/json',
                responseText: expected
            });

            const state = store.getState();
            state[0].should.deep.equal({type: '@@redux/INIT'});
            state[1].should.deep.equal({type: LOGIN_PENDING, payload: user});
            state[2].type.should.equal(LOGIN_ERROR);
            state[2].payload.should.deep.equal(error);
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
    describe('CHANGE_EMAIL', () => {
        it('triggers the CHANGE_EMAIL action when changeEmail action creator is called and login is successful', () => {
            const store = createStore(reducer, applyMiddleware(middleware));
            const user = {email: 'a@b.com', password: 'password', updatedEmail: 'b@c.com'};
            const retLogin = {email: 'a@b.com', token: 'ABC123'};
            const expectedFromLogin = JSON.stringify(retLogin);
            const retChangeEmail = {email: 'b@c.com'};
            const expectedFromChangeEmail = JSON.stringify(retChangeEmail);

            store.dispatch(changeEmail(user));

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 200,
                contentType: 'application/json',
                responseText: expectedFromLogin
            });

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 200,
                contentType: 'application/json',
                responseText: expectedFromChangeEmail
            });

            store.getState().should.deep.equal([
                {type: '@@redux/INIT'},
                {type: CHANGE_EMAIL_PENDING, payload: user},
                {type: LOGIN, payload: retLogin},
                {type: CHANGE_EMAIL, payload: retChangeEmail}
            ]);
        });

        it('triggers the LOGIN_ERROR action when changeEmail action creator call fails in login', () => {

            const store = createStore(reducer, applyMiddleware(middleware));

            const user = [{email: 'a@b.com', password: 'password', updatedEmail: 'b@c.com'}];

            const error = {message : 'error'};

            const expected = JSON.stringify(error);

            store.dispatch(changeEmail(user));

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 500,
                contentType: 'application/json',
                responseText: expected
            });

            const state = store.getState();
            state[0].should.deep.equal({type: '@@redux/INIT'});
            state[1].should.deep.equal({type: CHANGE_EMAIL_PENDING, payload: user});
            state[2].type.should.equal(LOGIN_ERROR);
            state[2].payload.should.deep.equal(error);
        });

        it('triggers the CHANGE_EMAIL_ERROR action when changeEmail action creator call fails in changeEmail', () => {

            const store = createStore(reducer, applyMiddleware(middleware));

            const user = {email: 'a@b.com', password: 'password', updatedEmail: 'b@c.com'};
            const retLogin = {email: 'a@b.com', token: 'ABC123'};
            const error = {message: 'error'};
            const expected = JSON.stringify(error);

            store.dispatch(changeEmail(user));

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 200,
                contentType: 'application/json',
                responseText: JSON.stringify(retLogin)
            });

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 500,
                contentType: 'application/json',
                responseText: expected
            });

            const state = store.getState();
            state[0].should.deep.equal({type: '@@redux/INIT'});
            state[1].should.deep.equal({type: CHANGE_EMAIL_PENDING, payload: user});
            state[2].should.deep.equal({type: LOGIN, payload: retLogin});
            state[3].type.should.equal(CHANGE_EMAIL_ERROR);
            state[3].payload.should.deep.equal(error);
        });
    });
    describe('CHANGE_PASSWORD', () => {
        it('triggers the CHANGE_PASSWORD action when changePassword action creator is called and login is successful', () => {
            const store = createStore(reducer, applyMiddleware(middleware));
            const user = {email: 'a@b.com', password: 'password', updatedPassword: 'password1'};
            const retLogin = {email: 'a@b.com', token: 'ABC123'};
            const expectedFromLogin = JSON.stringify(retLogin);
            const retChangePassword = {email: 'b@c.com'};
            const expectedFromChangePassword = JSON.stringify(retChangePassword);

            store.dispatch(changePassword(user));

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 200,
                contentType: 'application/json',
                responseText: expectedFromLogin
            });

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 200,
                contentType: 'application/json',
                responseText: expectedFromChangePassword
            });

            store.getState().should.deep.equal([
                {type: '@@redux/INIT'},
                {type: CHANGE_PASSWORD_PENDING, payload: user},
                {type: LOGIN, payload: retLogin},
                {type: CHANGE_PASSWORD, payload: retChangePassword}
            ]);
        });

        it('triggers the LOGIN_ERROR action when changeEmail action creator call fails in login', () => {

            const store = createStore(reducer, applyMiddleware(middleware));

            const user = [{email: 'a@b.com', password: 'password', updatedPassword: 'password1'}];

            const error = {message: 'error'};

            const expected = JSON.stringify(error);

            store.dispatch(changePassword(user));

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 500,
                contentType: 'application/json',
                responseText: expected
            });

            const state = store.getState();
            state[0].should.deep.equal({type: '@@redux/INIT'});
            state[1].should.deep.equal({type: CHANGE_PASSWORD_PENDING, payload: user});
            state[2].type.should.equal(LOGIN_ERROR);
            state[2].payload.should.deep.equal(error);
        });

        it('triggers the CHANGE_EMAIL_ERROR action when changeEmail action creator call fails in changeEmail', () => {

            const store = createStore(reducer, applyMiddleware(middleware));

            const user = {email: 'a@b.com', password: 'password', updatedPassword: 'password1'};
            const retLogin = {email: 'a@b.com', token: 'ABC123'};
            const error = { message: 'error'};
            const expected = JSON.stringify(error);

            store.dispatch(changePassword(user));

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 200,
                contentType: 'application/json',
                responseText: JSON.stringify(retLogin)
            });

            MockXMLHttpRequest.mostRecent.respondWith({
                status: 500,
                contentType: 'application/json',
                responseText: expected
            });

            const state = store.getState();
            state[0].should.deep.equal({type: '@@redux/INIT'});
            state[1].should.deep.equal({type: CHANGE_PASSWORD_PENDING, payload: user});
            state[2].should.deep.equal({type: LOGIN, payload: retLogin});
            state[3].type.should.equal(CHANGE_PASSWORD_ERROR);
            state[3].payload.should.deep.equal(error);
        });
    });
});
