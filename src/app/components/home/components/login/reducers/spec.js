/* global describe, it*/
import {expect} from 'chai';
import {loggedIn} from './index';
import {LOGIN, LOGIN_ERROR, LOGOUT} from '../actions';

describe('loggedIn Reducer', () => {
    describe('LOGIN', ()=> {
        const action = {type: LOGIN, payload: {token: 'foo'}};

        // beforeEach(() => {
        //     global.XMLHttpRequest.setBearerToken.reset();
        // });
        //
        // afterEach(() => {
        //     global.XMLHttpRequest.setBearerToken.reset();
        // });

        it('should set loggedIn to true', ()=> {
            expect(loggedIn(false, action)).to.equal(true);
        });

        // it('should set bearer token', ()=> {
        //     expect(XMLHttpRequest.setBearerToken.called).to.equal(false);
        //     loggedIn(false, action);
        //     expect(XMLHttpRequest.setBearerToken.called).to.equal(true);
        // });
    });

    describe('LOGIN_ERROR', ()=> {
        it('should set loggedIn to false', ()=> {
            const action = {type: LOGIN_ERROR};
            expect(loggedIn(false, action)).to.equal(false);
        });
    });

    describe('LOGOUT', ()=> {
        it('should set loggedIn to false', ()=> {
            const action = {type: LOGOUT};
            expect(loggedIn(false, action)).to.equal(false);
        });
    });

    describe('default', () => {
        it('should not change the current state', () => {
            let action = {type: ''};
            expect(loggedIn(false, action)).to.equal(false);
            expect(loggedIn(true, action)).to.equal(true);
        });

        it('should set the state to false if payload.status is 401', () => {
            const action = {type: '', payload: {status: 401}};
            expect(loggedIn(true, action)).to.equal(false);
        });
        it('should set the state to false if payload.status is403', () => {
            const action = {type: '', payload: {status: 403}};
            expect(loggedIn(true, action)).to.equal(false);
        });
    });
});
