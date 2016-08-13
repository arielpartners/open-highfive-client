/**
 * Created by cstrong on 8/5/16.
 */
/**
 * Application header with toolbar buttons.
 * These buttons could be moved to a sidebar, menu, or footer.
 */
import React from 'react';
import cx from 'classnames';

/* istanbul ignore next */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}

export const Header = ({logout, loggedIn}) => {
    const logoutBtnClasses = cx({
        'logout-btn mdl-button mdl-js-button mdl-button--raised': true,
        'invisible': !loggedIn
    });

    return (
        <div className="header-component">
            <div className="header-content main-content">
                <div className="logo"></div>
                <h1 className="title">High Five</h1>
                <button className={logoutBtnClasses}
                        onClick={logout}>Logout
                </button>
            </div>
        </div>
    );
};

Header.propTypes = {
    logout: React.PropTypes.func.isRequired,
    loggedIn: React.PropTypes.bool.isRequired
};

