import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {login} from './actions';
/* istanbul ignore next  */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}

/* eslint-disable no-shadow, max-len*/
const _Login = ({login, error}) => {
    const inputs = [];
    // TODO: Support user object when testing locally https://youtrack.hbo.com/youtrack/issue/UT-382
    const devUserObj = {
        firstName: 'Test',
        lastName: 'Testerson',
        tokenSeed: 'JUaHJlZSBFeWVkI'
    };

    return (
      <div className="login-component mdl-card mdl-shadow--6dp">
          <div className="mdl-card__supporting-text">
              <form action="#">
                  <div className="mdl-textfield
                                    mdl-js-textfield
                                    mdl-textfield--floating-label">
                      <input ref={(input)=>inputs.push(input)}
                             className="mdl-textfield__input"
                             required
                             type="text" id="username"/>
                      <label className="mdl-textfield__label" htmlFor="username">Username</label>
                  </div>
                  <div className="mdl-textfield
                                    mdl-js-textfield
                                    mdl-textfield--floating-label">
                      <input ref={(input)=>inputs.push(input)}
                             className="mdl-textfield__input"
                             type="password"
                             required
                             id="userpass"/>
                      <label className="mdl-textfield__label" htmlFor="userpass">Password</label>
                  </div>
              </form>
          </div>
          <div className="mdl-card__actions mdl-card--border">
              <button onClick={()=>login({
                  userName : inputs[0].value,
                  password: inputs[1].value,
                  firstName: devUserObj.firstName,
                  lastName: devUserObj.lastName,
                  token: devUserObj.tokenSeed,
              })
              }
                      type="submit"
                      className="mdl-button
                                   mdl-button--colored
                                   mdl-js-button
                                   mdl-js-ripple-effect">Log in
              </button>
              {
                  (error) ?
                    <p className="mdl-color-text--red">{error.message}</p> : null
              }
          </div>
      </div>
    );
};

_Login.propTypes = {
    login: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = (state) => state;

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
    return {login}
};

const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);

export default Login;