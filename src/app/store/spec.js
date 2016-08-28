/* global describe, it */
import {expect} from 'chai';
import configureStore from './index';

describe('Store', function() {

    it('some dev env configuration, really nothing interesting to test here', function() {
        const store = configureStore();
        /* eslint-disable no-unused-expressions */
        expect(store.dispatch).to.exist;
        /* eslint-enable no-unused-expressions */
    });
});
