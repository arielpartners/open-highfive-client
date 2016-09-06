/**
 * Application header with toolbar buttons.
 * These buttons could be moved to a sidebar, menu, or footer.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {logout} from '../login/actions';

import {Menu} from './components/menu';

import pjson from '../../../../package.json';

/* istanbul ignore next */
if (__WEBPACK__) {
    require('./style.scss');
}

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    /* eslint-disable no-shadow */
    render() {
        const {
            healthCheck,
            loggedIn,
            logout,
            routing
        } = this.props;

        return (
            <div className="header-wrapper">
                <div className="container-fluid h5-hdr header-component">
                    <div className="row">
                        <div className="col-lg-12 h5-logo">
                            <a href="#" className="logo"/>
                            {
                                (loggedIn) ?
                                    <span className="pull-right h5-contact-support">
                                        <a href="mailto:ggarno@arielpartners.com">
                                            Feedback, Questions, Comments?
                                        </a>
                                    </span>
                                :
                                  <span>
                                    <a href="/version.txt"
                                       className="version client">Client: v.{pjson.version}</a>
                                    <a href="/api/healthcheck"
                                       className="version server">Server: v.{healthCheck.version}</a>
                                  </span>
                            }
                        </div>
                    </div>
                </div>
                {
                    (loggedIn) ? <Menu logout={logout} routing={routing}/> : null
                }

            </div>
        );
    }
}

Header.propTypes = {
    metrics: PropTypes.object
};

export default connect(
    // Map State to Props (Reducers)
    (state) => state,
    //Map DispatchToProps (Actions)
    (dispatch) => (bindActionCreators({logout}, dispatch))
)(Header);

