/* global describe, it */
import {expect} from 'chai';
import {user} from './index';
import {LOGIN, LOGIN_ERROR, LOGOUT} from '../../components/login/actions';

describe('user Reducer', () => {
    const payload = {foo: 'bar'};
    const state = {};

    describe('LOGIN', ()=> {
        it('should set loggedIn to true', ()=> {
            expect(user(state, {type: LOGIN, payload: payload})).to.equal(payload);
        });
    });

    describe('LOGIN_ERROR', ()=> {
        it('should set loggedIn to false', ()=> {
            expect(user(state, {type: LOGIN_ERROR, payload: payload})).to.eql({});
        });
    });

    describe('LOGOUT', ()=> {
        it('should set loggedIn to false', ()=> {
            expect(user(state, {type: LOGOUT, payload: payload})).to.eql({});
        });
    });

    describe('default', () => {
        it('should set the default loggedIn value to false', () => {
            expect(user(state, {type: '', payload: payload})).to.equal(state);
        });
    });
});
