import {expect} from 'chai';
import {modalDisplayed} from './index.js';
import * as ActionTypes from '../../action-types';

/* global describe, beforeEach, it */

/* eslint-disable indent */
describe('Modal', () => {
    let state, modalPayload;

    beforeEach(() => {
        state = {};
        modalPayload = {response: 'im a payload'};
    });

    it('should return the current state if an invalid type is sent', () => {
        expect(modalDisplayed(state, {type: 'IMNOTREAL'})).to.be.eql(state);
    });

    it('should return show true and the payload for the config on OPEN_MODAL', () => {
        expect(modalDisplayed(state, {type: ActionTypes.OPEN_MODAL,
            payload: modalPayload})).to.be.eql({
                show: true,
                config: modalPayload
        });
    });

    it('should return show false on CLOSE_MODAL', () => {
        expect(modalDisplayed(state, {type: ActionTypes.CLOSE_MODAL})).to.be.eql({show: false});
    });

    it('should return show true and recognition payload on OPEN_RECOGNITIONCARD_MODAL', () => {
        expect(modalDisplayed(state, {
            type: ActionTypes.OPEN_RECOGNITIONCARD_MODAL,
            payload: modalPayload
        })).to.be.eql({
            show: true,
            recognition: modalPayload
        });
    });

    it('should return show false on CLOSE_RECOGNITIONCARD_MODAL', () => {
        expect(modalDisplayed(state, {
            type: ActionTypes.CLOSE_RECOGNITIONCARD_MODAL
        })).to.be.eql({
            show: false
        });
    });

});
/* eslint-enable indent */
