const username = element(by.id('username'));
const password = element(by.id('userpass'));
const submitBtn = element(by.css('.mdl-button'));

class LoginForm {

    get() {
        browser.get('/');
    }

    setName(name) {
        username.sendKeys(name);
    }

    setPassword(pass) {
        password.sendKeys(pass);
    }

    clickLogin() {
        submitBtn.click();
    }

    loginAs(username,password) {
        this.hasUsername().then((isPresent) => {
            if(isPresent) {
                this.setName(username);
                this.setPassword(password);
                submitBtn.click();
            }
        });
    }

    hasUsername() {
        return username.isPresent();
    }
    
}

export let LoginPage = new LoginForm();