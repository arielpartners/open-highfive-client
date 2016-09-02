import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getFormData} from '../../index';
import * as LoginActions from './actions';

/* istanbul ignore next  */
if (__WEBPACK__) {
    require('./style.scss');
}

/*global componentHandler*/

const LOGIN = 'Login';
const CHANGE_PASSWORD = 'Change Password';
const CHANGE_EMAIL = 'Change Email';
export const emailRegExStr = '^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$';

/* eslint-disable no-shadow, max-len*/
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {submitButtonLabel: LOGIN};
    }

    componentDidMount() {
        /* eslint-disable no-undef */
        componentHandler.upgradeDom();
        /* eslint-enable no-undef */
        let email = document.querySelector('#email');
        if (email) {
            email.focus();
        }
    }

    componentDidUpdate() {
        /* eslint-disable no-undef */
        componentHandler.upgradeDom();
        /* eslint-enable no-undef */
    }

    isChangePassword() {
        return this.state.submitButtonLabel === CHANGE_PASSWORD;
    }

    isChangeEmail() {
        return this.state.submitButtonLabel === CHANGE_EMAIL;
    }

    setFormState(newLabel) {
        this.setState({submitButtonLabel: newLabel});
    }

    isValid(form) {
        return form.querySelectorAll('*:invalid').length === 0;
    }

    /*eslint-disable max-statements, complexity, max-depth */
    onSubmit(form, inputs, event) {
        event.preventDefault();
        form.classList.remove('invalid');
        if (!this.isValid(form)) {
            form.classList.add('invalid');
        } else {
            if (this.isChangeEmail()) {
                if (inputs[2].value !== inputs[3].value) {
                    // emails must match
                    inputs[2].parentNode.classList.add('is-invalid');
                    inputs[3].parentNode.classList.add('is-invalid');
                    form.classList.add('invalid');
                } else {
                    const toOmit = ['userpass_new', 'userpass_new_confirm', 'email_new_confirm'];
                    this.props.changeEmail(getFormData(inputs, toOmit));
                }
            } else if (this.isChangePassword()) {
                if (inputs[4].value !== inputs[5].value) {
                    // passwords must match
                    inputs[4].parentNode.classList.add('is-invalid');
                    inputs[5].parentNode.classList.add('is-invalid');
                    form.classList.add('invalid');
                } else {
                    const toOmit = ['email_new', 'email_new_confirm', 'userpass_new_confirm'];
                    this.props.changePassword(getFormData(inputs, toOmit));
                }
            }
            else {
                this.props.login(getFormData(inputs));
            }
        }
    }
    /*eslint-enable max-statements */

    render() {
        const {error} = this.props,
            inputs = [],
            addInput = (input) => {
                inputs.push(input);
            },
            labelClass = 'mdl-textfield__label',
            inputClass = 'mdl-textfield__input',
            errorClass = 'mdl-textfield__error',
            fieldSetClass = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label extrawide';

        let form;

        return (
            <form onSubmit={(event)=>this.onSubmit(form, inputs, event)}

                  noValidate
                  ref={(ref)=> {
                            form = ref;
                  }}
                  className="login-container">
                <a className="hiddenanchor" id="tochange-email">foo</a>
                <a className="hiddenanchor" id="tochange-password">foo</a>
                <div className="login-component">
                    <h1>Welcome to HighFive!</h1>
                    <div className="mdl-card__supporting-text">
                        <div className="mdl-card__supporting-text">
                            <div className={fieldSetClass}>
                                <input ref={addInput}
                                       className={inputClass}
                                       required={true}
                                       tabIndex={1}
                                       type="email" id="email"/>
                                <label className={labelClass} htmlFor="email">Email</label>
                                <span className={errorClass}>Valid email address is required</span>
                            </div>
                            <div className={fieldSetClass}>
                                <input ref={addInput}
                                       className={inputClass}
                                       type="password"
                                       required={true}
                                       tabIndex={2}
                                       id="password"/>
                                <label className={labelClass} htmlFor="password">Password</label>
                                <span className={errorClass}>Password is required</span>
                            </div>
                            <div className="change-email">
                                <div className={fieldSetClass}>
                                    <input ref={addInput}
                                           className={inputClass}
                                           type="email"
                                           required={this.isChangeEmail()}
                                           id="email_new"/>
                                    <label className={labelClass} htmlFor="email_new">New Email</label>
                                    <span
                                        className={errorClass}>Email address must be valid and match confirmation</span>
                                </div>
                                <div className={fieldSetClass}>
                                    <input ref={addInput}
                                           className={inputClass}
                                           type="email"
                                           required={this.isChangeEmail()}
                                           id="email_new_confirm"/>
                                    <label className={labelClass} htmlFor="email_new_confirm">Confirm New
                                        Email</label>
                                    <span className={errorClass}>Email address must be valid and match above</span>
                                </div>
                            </div>
                            <div className="change-password">
                                <div className={fieldSetClass}>
                                    <input ref={addInput}
                                           className={inputClass}
                                           type="password"
                                           required={this.isChangePassword()}
                                           id="userpass_new"/>
                                    <label className={labelClass} htmlFor="userpass_new">New Password</label>
                                    <span className={errorClass}>Password required, must match confirmation</span>
                                </div>
                                <div className={fieldSetClass}>
                                    <input ref={addInput}
                                           className={inputClass}
                                           type="password"
                                           required={this.isChangePassword()}
                                           id="userpass_new_confirm"/>
                                    <label className={labelClass} htmlFor="userpass_new_confirm">Confirm New
                                        Password</label>
                                    <span className={errorClass}>Password required, must match above</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mdl-card__actions">
                        <button type="submit"
                                tabIndex={3}
                                className="mdl-button mdl-button--colored
                                           mdl-js-button
                                           mdl-js-ripple-effect">{this.state.submitButtonLabel}
                        </button>
                        {
                            (error) ?
                                <p className="mdl-color-text--red">{error.message}</p> : null
                        }
                    </div>
                    <div className="tochange-email change-links">
                        <p className="change-link">
                            <a onClick={()=>this.setFormState(CHANGE_EMAIL)}
                               href="#tochange-email">Sign up for new account</a>
                        </p>
                    </div>
                </div>
            </form>
        );
    }
}

Login.propTypes = {
    login: React.PropTypes.func.isRequired,
    changeEmail: React.PropTypes.func.isRequired,
    changePassword: React.PropTypes.func.isRequired,
    error: React.PropTypes.object
};

export default connect(
    // Map State to Props (Reducers)
    (state) => state,
    //Map DispatchToProps (Actions)
    {...LoginActions}
)(Login);

