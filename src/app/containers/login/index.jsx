import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getFormData} from '../../index';
import * as LoginActions from './actions';
import {requestHealthCheck} from '../../actions';

/* istanbul ignore next  */
if (__WEBPACK__) {
    require('./style.scss');
}

/*global componentHandler*/

const LOGIN = 'Login';

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
        this.props.requestHealthCheck();
    }

    componentDidUpdate() {
        /* eslint-disable no-undef */
        componentHandler.upgradeDom();
        /* eslint-enable no-undef */
    }

    setFormState(newLabel) {
        this.setState({submitButtonLabel: newLabel});
    }

    isValid(form) {
        return form.querySelectorAll('*:invalid').length === 0;
    }

    /*eslint-disable max-statements, complexity, max-depth */
    onSubmit(form, inputs) {
        form.classList.remove('invalid');
        if (!this.isValid(form)) {
            form.classList.add('invalid');
        } else {
            this.props.login(getFormData(inputs));
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
            <form onSubmit={(event) => event.preventDefault() & this.onSubmit(form, inputs)}
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
                </div>
            </form>
        );
    }
}

Login.propTypes = {
    login: React.PropTypes.func.isRequired,
    error: React.PropTypes.object
};

export default connect(
    // Map State to Props (Reducers)
    (state) => state,
    //Map DispatchToProps (Actions)
    {...LoginActions, requestHealthCheck}
)(Login);

