/* global describe, it, beforeEach */
import {createStore} from 'redux';
import {should} from 'chai';
import * as Actions from './index';
import * as ActionTypes from '../action-types';

should(should);

describe('Actions', ()=> {
    let reducer = (state = [], action) => state.concat(action), configPayload, healthCheckPayload, store;

    beforeEach(() => {
        store = createStore(reducer);
        configPayload = {};
        healthCheckPayload = {};
    });

    describe('Modal', () => {
        it('should trigger OPEN_MODAL if openModal function is called', () => {
            store.dispatch(Actions.openModal(configPayload));

            store.getState().should.deep.equal([
                { type: '@@redux/INIT' },
                { type: ActionTypes.OPEN_MODAL, payload: configPayload }
            ]);
        });
        // export const requestHealthCheck = () => ({type: ActionTypes.REQUEST_HEALTH_CHECK});

        it('should trigger CLOSE_MODAL if closeModal function is called', () => {
            store.dispatch(Actions.closeModal());

            store.getState().should.deep.equal([
                { type: '@@redux/INIT' },
                { type: ActionTypes.CLOSE_MODAL}
            ]);
        });
    });

    describe('Health Check', ()=> {
        it('should trigger RECEIVED_HEALTH_CHECK if receiveHealthCheck function is called', () => {
            store.dispatch(Actions.receiveHealthCheck(healthCheckPayload));

            store.getState().should.deep.equal([
                { type: '@@redux/INIT' },
                { type: ActionTypes.RECEIVED_HEALTH_CHECK, payload: healthCheckPayload}
            ]);
        });

        it('should trigger REQUEST_HEALTH_CHECK if requestHealthCheck function is called', () => {
            store.dispatch(Actions.requestHealthCheck());

            store.getState().should.deep.equal([
                { type: '@@redux/INIT' },
                { type: ActionTypes.REQUEST_HEALTH_CHECK}
            ]);
        });
    });

    require('../containers/home/actions/spec');
    require('../containers/login/actions/spec');
    require('../containers/header/actions/spec');
});
