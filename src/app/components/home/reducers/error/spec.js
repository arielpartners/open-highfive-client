/* global describe, it */
import {expect} from 'chai';
import {error} from './index';
import {LOGIN_ERROR} from '../../components/login/actions';
import {ITEM_ERROR} from '../../actions';

describe('Error Reducer', () => {
    const payload = {foo: 'bar'};
    const state = {};

    describe('LOGIN_ERROR', ()=> {
        it('should set payload as state', ()=> {
            expect(error(state, {type: LOGIN_ERROR, payload: payload})).to.eql(payload);
        });
    });

    describe('ITEM_ERROR', ()=> {
        it('should set payload as state', ()=> {
            expect(error(state, {type: ITEM_ERROR, payload: payload})).to.eql(payload);
        });
    });

    describe('default', ()=> {
        it('should set state to null', ()=> {
            expect(error(state, {type: 'some action type', payload: payload})).to.eql(null);
        });
    });
});
