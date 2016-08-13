/* global describe, it */
import {should, expect} from 'chai';
import {selectedItem} from './index';
import {CREATE_ITEM, SELECT_ITEM, UPDATE_ITEM} from '../../actions';

// no-unused-vars fix for should
should(should);
describe('selectedItem reducer', () => {

    describe('SELECT_ITEM', () => {
        let currentState = [{foo: 'bar'}];
        let newState = {baz: 'foo'};

        let isSelectItem = {type: SELECT_ITEM, payload: newState};

        it('should return the new state if type is SELECT_ITEM', () => {
            selectedItem(currentState, isSelectItem).should.not.equal(currentState);
            selectedItem(currentState, isSelectItem).should.equal(newState);
        });

        it('should return null if no selection is included', () => {
            expect(selectedItem(currentState, {type: SELECT_ITEM})).to.equal(null);
        });
    });

    describe('CREATE_ITEM', () => {
        let currentState = {_id: 'foo'};
        let newState = {_id: 'foo', bar: 'baz'};

        it('should set the selection state to null', () => {
            let action = {type: CREATE_ITEM, payload: newState};
            expect(selectedItem(currentState, action)).to.deep.equal(null);
        });
    });

    describe('UPDATE_ITEM', () => {
        let currentState = {_id: 'foo'};
        let newState = {_id: 'foo', bar: 'baz'};

        it('should set the selectedItem back to null after update', () => {
            let isUpdateItem = {type: UPDATE_ITEM, payload: newState};
            expect(selectedItem(currentState, isUpdateItem)).to.equal(null);
        });
    });

    describe('DEFAULT', () => {
        it('should maintain current state if the default branch was followed', () => {
            let currentState = {id: 1};
            selectedItem(currentState).should.equal(currentState);
        });
    });
});
