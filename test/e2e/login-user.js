/* global describe, it */
import {expect} from 'chai';
import {LoginPage} from '../page-objects/login-page';

describe('Login Suite', () => {
    
    it('should provide an input field to enter a username', () => {
        browser.get('/');

        LoginPage.hasUsername().then((result)=> {
            expect(result).to.equal(true);
        });
    });
    
});