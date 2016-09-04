/**
 * Created by Alan on 9/3/2016.
 */

/* global describe, it, beforeEach */
import {createStore} from 'redux';
import {should} from 'chai';
import {receiveRecognitions, requestRecognitions} from './index';
import * as ActionTypes from '../../../action-types';

should(should);

/* global describe, it */
describe('Home', () => {
    let reducer = (state = [], action) => state.concat(action), store;

    beforeEach(() => {
        store = createStore(reducer);
    });

    it('triggers REQUEST_RECOGNITIONS when requestRecognitions action is called', () => {
        store.dispatch(requestRecognitions());

        store.getState().should.deep.equal([
            { type: '@@redux/INIT' },
            { type: ActionTypes.REQUEST_RECOGNITIONS }
        ]);
    });

    it('triggers RECEIVED_RECOGNITIONS when receiveRecognitions action is called', () => {
        store.dispatch(receiveRecognitions({response: 'okay'}));

        store.getState().should.deep.equal([
            { type: '@@redux/INIT' },
            { type: ActionTypes.RECEIVED_RECOGNITIONS, payload: 'okay' }
        ]);
    });

});
