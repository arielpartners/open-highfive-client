import {expect} from 'chai';
import {metrics} from './index.js';
import * as ActionTypes from '../../../action-types';

/* global describe, beforeEach, it */
describe('Header', () => {
    let state, metricPayload;

    beforeEach(() => {
        state = {};
        metricPayload = {json: 'im a payload'};
    });

    it('RECEIVED_METRICS should return current a payload', () => {
        expect(metrics(state, {type: ActionTypes.RECEIVED_METRICS, payload: metricPayload})).to.be.eql(metricPayload);
    });

    it('REQUEST_METRICS should return the current state', () => {
        expect(metrics(state, {type: ActionTypes.REQUEST_METRICS})).to.be.eql(state);
    });
});
