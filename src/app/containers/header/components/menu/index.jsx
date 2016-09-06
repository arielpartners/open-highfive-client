import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import cx from 'classnames';

/* istanbul ignore next */
if (__WEBPACK__) {
    require('./style.scss');
}

export const Menu = ({logout, routing}) => {
    const homePath = '/home',
          loginPath = '/login',
          reportsPath = '/reports';

    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <input type="checkbox" id="navbar-toggle-cbox"/>
                <div className="navbar-header">
                    <label htmlFor="navbar-toggle-cbox"
                           className="navbar-toggle collapsed"
                           data-toggle="collapse"
                           data-target="#navbar"
                           aria-expanded="false"
                           aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </label>
                </div>

                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="nav navbar-nav">
                        <li className={cx(
                            {active: routing.locationBeforeTransitions.pathname === homePath}
                        )}>
                            <Link to={homePath}>Home</Link>
                        </li>
                        <li className={cx(
                            {active: routing.locationBeforeTransitions.pathname === reportsPath}
                        )}>
                            <Link to={reportsPath}>Reports</Link>
                        </li>
                        {/*<li><a href="#">Spot Recognition</a></li>*/}
                        {/*<li><a href="#">Annual Evaluation</a></li>*/}
                        {/*<li><a href="#">Organization</a></li>*/}
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {/*<li><a href="#">Settings</a></li>*/}
                        {/*<li><a href="#">Admin</a></li>*/}
                        <li>
                            <Link to={loginPath} onClick={logout}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Menu.propTypes = {
    loggedIn: PropTypes.object
};

