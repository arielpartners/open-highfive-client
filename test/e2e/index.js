/* global describe, it, before */
import {LoginPage} from '../page-objects/login-page';

describe('HighFive Acceptance Tests', () => {
    require('./login-user');

    describe('Logged in user', () => {
        before(()=>{
            LoginPage.loginAs('test','test');
        });

    });

});