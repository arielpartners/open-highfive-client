/* global describe, it, beforeEach */
import {createStore} from 'redux';
import {should} from 'chai';
import * as Actions from './index';
import * as ActionTypes from '../../../action-types';

should(should);

/* global describe, it */
describe('Home', () => {
    let reducer = (state = [], action) => state.concat(action), store;

    beforeEach(() => {
        store = createStore(reducer);
    });

    describe('Recognition', () => {
        describe('Receiving', ()=> {
            it('triggers REQUEST_RECOGNITIONS when requestRecognitions action is called', () => {
                store.dispatch(Actions.requestRecognitions());

                store.getState().should.deep.equal([
                    {type: '@@redux/INIT'},
                    {type: ActionTypes.REQUEST_RECOGNITIONS}
                ]);
            });

            it('triggers RECEIVED_RECOGNITIONS when receiveRecognitions action is called', () => {
                store.dispatch(Actions.receiveRecognitions({response: 'okay'}));

                store.getState().should.deep.equal([
                    {type: '@@redux/INIT'},
                    {type: ActionTypes.RECEIVED_RECOGNITIONS, payload: 'okay'}
                ]);
            });
        });

        describe('Creating', ()=> {
            let recognitionPayload = {response: 'Okay!'};
            it('triggers CREATE_RECOGNITION_PENDING when createRecognition action is called', () => {
                store.dispatch(Actions.createRecognition(recognitionPayload));

                store.getState().should.deep.equal([
                    {type: '@@redux/INIT'},
                    {type: ActionTypes.CREATE_RECOGNITION_PENDING, payload: recognitionPayload}
                ]);
            });

            it('triggers RECOGNITION_CREATED when recognitionCreated action is called', () => {
                store.dispatch(Actions.recognitionCreated());

                store.getState().should.deep.equal([
                    {type: '@@redux/INIT'},
                    {type: ActionTypes.RECOGNITION_CREATED}
                ]);
            });
        });
    });

    describe('User', ()=> {
        let userPayload = {response: { name: 'Im a user', points: 9000}};

        it('triggers REQUEST_USERS when requestUsers action is called', ()=>{
            store.dispatch(Actions.requestUsers());

            store.getState().should.deep.equal([
                {type: '@@redux/INIT'},
                {type: ActionTypes.REQUEST_USERS}
            ]);
        });
        it('triggers RECEIVED_USERS when receiveUsers action is called and receive response payload', ()=>{
            store.dispatch(Actions.receiveUsers(userPayload));

            store.getState().should.deep.equal([
                {type: '@@redux/INIT'},
                {type: ActionTypes.RECEIVED_USERS, payload: userPayload.response}
            ]);
        });

    });
});
