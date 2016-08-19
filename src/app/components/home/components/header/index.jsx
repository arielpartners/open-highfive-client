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

export const Header = () => {
    return (
        <div className="header-component">
            <div className="header-content main-content">
                <div className="logo"></div>
                <h1 className="title">High Five</h1>
            </div>
        </div>
    );
};

Header.propTypes = {

};

