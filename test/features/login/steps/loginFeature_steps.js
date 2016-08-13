import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {LoginPage} from '../../../page-objects/login-page';

chai.use(chaiAsPromised);
//const expect = chai.expect;

module.exports = function() {

    this.Given('I have opened HighFive', () => {
        browser.driver.manage().window().maximize();
        // We need to see the button to click it
        for (var i=0; i < 3; i++) {
            browser.driver.actions().keyDown(protractor.Key.COMMAND).sendKeys(protractor.Key.SUBTRACT).keyUp(protractor.Key.CONTROL).perform();
        }

        LoginPage.get();
    });

    this.When(/^I login$/, () => {
        LoginPage.loginAs('test', 'test');
    });

    this.Then(/^the editor title should be "([^"]*)"$/, (arg1) => {

    });

};
