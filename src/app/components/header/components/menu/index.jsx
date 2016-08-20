import React, {PropTypes} from 'react';

/* istanbul ignore next */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}

export const Menu = ({}) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span> <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Home <span className="sr-only">(current)</span></a></li>
                        <li><a href="#">Spot Recognition</a></li>
                        <li><a href="#">Annual Evaluation</a></li>
                        <li><a href="#">Organization</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#">Settings</a></li>
                        <li><a href="#">Admin</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Menu.propTypes = {
    loggedIn: PropTypes.object
};

