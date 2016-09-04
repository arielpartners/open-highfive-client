/* global describe, it, beforeEach */
import {expect} from 'chai';
import {error, LOGIN_ERROR_MSG} from './index';
import * as ActionTypes from '../../action-types.js';

describe('Error Reducer', () => {
    let state = {}, payload = {foo: 'bar'};

    beforeEach(()=> {
        state = {};
        payload = {status: 401, foo: 'bar'};
    });

    describe('LOGIN_ERROR', ()=> {
        it('should return an error message as a payload', ()=> {
            expect(error(state, {type: ActionTypes.LOGIN_ERROR, payload: payload})).to.eql({message: LOGIN_ERROR_MSG});
        });
    });

    describe('default', ()=> {
        it('should set state to null', ()=> {
            expect(error(state, {type: 'some action type', payload: payload})).to.eql(null);
        });
    });
});
