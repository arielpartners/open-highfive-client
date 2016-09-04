import {expect} from 'chai';
import {recognitions} from './index.js';
import * as ActionTypes from '../../../action-types';

/* global describe, beforeEach, it */
describe('Home', () => {
    let state, recognitionPayload;

    beforeEach(() => {
        state = {};
        recognitionPayload = {response: 'im a payload'};
    });

    it('should return the current state is no type is passed', () => {
        expect(recognitions(state, {payload: recognitionPayload})).to.be.eql(state);
    });

    it('RECEIVED_RECOGNITIONS should return the current payloads', () => {
        expect(recognitions(state, {type: ActionTypes.RECEIVED_RECOGNITIONS,
            payload: recognitionPayload})).to.be.eql(recognitionPayload);
    });

    it('REQUEST_RECOGNITIONS should return the current state', () => {
        expect(recognitions(state, {type: ActionTypes.REQUEST_RECOGNITIONS})).to.be.eql(state);
    });
});
