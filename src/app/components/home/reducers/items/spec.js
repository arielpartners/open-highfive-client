/* global before, after, describe, it */
import {expect} from 'chai';
import sinon from 'sinon';
import {items} from './index';
import {CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEM_ERROR, LOAD_ITEMS} from '../../actions';

/* eslint-disable max-nested-callbacks, no-unused-expressions, max-statements */
describe('items reducer', () => {
    const currentState = [{_id: 1, foo: 'bar'}];
    const newState = {_id: 2, baz: 'foo'};

    describe('LOAD_ITEMS', () => {
        let isLoadItems = {type: LOAD_ITEMS, payload: [newState]};

        it('should set/replace current state if type is LOAD_ITEMS', ()=> {
            expect(items(currentState, isLoadItems)).to.deep.equal([newState]);
        });
    });

    describe('CREATE_ITEM', () => {
        let action = {type: CREATE_ITEM, payload: newState};

        it('should append new Item to current state if type is CREATE_ITEM', () => {
            expect(items(currentState, action)).to.deep.equal([...currentState, newState]);
        });
    });

    describe('UPDATE_ITEM', () => {
        let updatedState = Object.assign(newState, {baz: 'bar'});
        let isUpdateItem = {type: UPDATE_ITEM, payload: updatedState};

        it('should update an existing item if ids are equal and type is CREATE_ITEM', () => {
            expect(items([newState], isUpdateItem)).to.deep.equal([updatedState]);
        });

        it('should simply return the existing item if ids are not equal and type is CREATE_ITEM', () => {
            expect(items(currentState, isUpdateItem)).to.deep.equal(currentState);
        });
    });

    describe('DELETE_ITEM', () => {
        let isDeleteItem = {type: DELETE_ITEM, payload: newState};

        it('should append new Item to current state if type is CREATE_ITEM', () => {
            expect(items([newState], isDeleteItem)).to.deep.equal([]);
        });
    });

    describe('ITEM_ERROR', () => {
        let isItemError = {type: ITEM_ERROR, payload: newState};

        before(() => {
            sinon.stub(console, 'error');
        });

        /* eslint-disable no-console */
        after(() => {
            console.error.restore();
        });

        it('should trigger an error notification if type is ITEM_ERROR', (done) => {
            expect(items(currentState, isItemError)).to.deep.equal(currentState);
            expect(console.error.called).to.equal(true);
            done();
        });
        /* eslint-enable no-console */
    });

    describe('switch statement default', () => {
        let isDefaultItems = {type: 'default', payload: []};

        it('should update an existing item if ids are equal and type is CREATE_ITEM', () => {
            expect(items([], isDefaultItems)).to.deep.equal([]);
        });
    });

    describe('no state passed in', () => {
        it('should use initial state if none is supplied', () => {
            expect(items(undefined, {})).to.deep.equal([]);
        });
    });

});
/* eslint-enable max-nested-callbacks, no-unused-expressions */
