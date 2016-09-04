/* global describe, it, beforeEach */
import {createStore} from 'redux';
import {should} from 'chai';
import * as Actions from './index';
import * as ActionTypes from '../../../action-types';

should(should);

/* global describe, it */
describe('Login', () => {
    let reducer = (state = [], action) => state.concat(action), loginPayload, errorPayload, store;

    beforeEach(() => {
        store = createStore(reducer);
        loginPayload = {email: 'email@email.com', password: 'mypass', response: 'okay'};
        errorPayload = {message: 'never gonna get it'};
    });

    it('triggers LOGIN when loggingIn action is called', () => {
        store.dispatch(Actions.login(loginPayload));

        store.getState().should.deep.equal([
            { type: '@@redux/INIT' },
            { type: ActionTypes.LOGIN_PENDING, payload: loginPayload }
        ]);
    });

    it('triggers LOGIN_ERROR when loginError action is called', () => {
        store.dispatch(Actions.loginError(errorPayload));

        store.getState().should.deep.equal([
            { type: '@@redux/INIT' },
            { type: ActionTypes.LOGIN_ERROR, payload: errorPayload }
        ]);
    });

    it('triggers LOGIN when loginError userAuthenticated is called', () => {
        store.dispatch(Actions.userAuthenticated(loginPayload));

        store.getState().should.deep.equal([
            { type: '@@redux/INIT' },
            { type: ActionTypes.LOGIN, payload: loginPayload.response }
        ]);
    });

    it('triggers LOGIN when loginError logout is called', () => {
        store.dispatch(Actions.logout());

        store.getState().should.deep.equal([
            { type: '@@redux/INIT' },
            { type: ActionTypes.LOGOUT_PENDING }
        ]);
    });

    it('triggers LOGOUT when loginError logout is called', () => {
        store.dispatch(Actions.userLoggedOut());

        store.getState().should.deep.equal([
            { type: '@@redux/INIT' },
            { type: ActionTypes.LOGOUT }
        ]);
    });
});
