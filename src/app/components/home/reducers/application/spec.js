/* global describe, it */
import {expect} from 'chai';
import {application} from './index';
//import {} from '../../actions';

describe('application state reducer', () => {

    describe('DEFAULT', () => {
        let defaultState = {isLoading: false};
        let fooState = {isLoading: true};

        it('should set current state to {isLoading: false} if the default branch was followed', function() {
            expect(application(undefined, fooState)).to.deep.equal(defaultState);
        });
    });
});
