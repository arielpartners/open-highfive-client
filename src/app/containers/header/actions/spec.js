/* global describe, it, beforeEach */
import {createStore} from 'redux';
import {should} from 'chai';
import {receiveMetrics, requestMetrics} from './index';
import * as ActionTypes from '../../../action-types';

should(should);

/* global describe, it */
describe('Header', () => {
    let reducer = (state = [], action) => state.concat(action), store;

    beforeEach(() => {
        store = createStore(reducer);
    });

    it('triggers REQUEST_METRICS when requestMetrics action is called', () => {
        store.dispatch(requestMetrics());

        store.getState().should.deep.equal([
            { type: '@@redux/INIT' },
            { type: ActionTypes.REQUEST_METRICS }
        ]);
    });

    it('triggers RECEIVED_METRICS when receiveMetrics action is called', () => {
        store.dispatch(receiveMetrics({response: 'okay'}));

        store.getState().should.deep.equal([
            { type: '@@redux/INIT' },
            { type: ActionTypes.RECEIVED_METRICS, payload: {response: 'okay'} }
        ]);
    });

});
