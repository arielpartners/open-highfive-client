/**
 * Created by cstrong on 8/5/16.
 */
/**
 * Application header with toolbar buttons.
 * These buttons could be moved to a sidebar, menu, or footer.
 */

import React, {PropTypes} from 'react';
import {Menu} from './components/menu';
import {Recognitions} from './components/recognitions';

/* istanbul ignore next */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}

export const Header = ({loggedIn, routing}) => {
    return (
        <div>{routing}
            <div className="container-fluid h5-hdr header-component">
                <div className="row">
                    <div className="col-lg-12 h5-logo">
                        <a href="#" className="logo"/>
                    </div>
                </div>
            </div>
            <Menu loggedIn={loggedIn}/>
            <Recognitions loggedIn={loggedIn}/>
        </div>
    );
};

Header.propTypes = {
    loggedIn: PropTypes.object
};
