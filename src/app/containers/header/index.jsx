/**
 * Application header with toolbar buttons.
 * These buttons could be moved to a sidebar, menu, or footer.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RecognitionActions from './actions';
import {logout} from '../login/actions';

import {Menu} from './components/menu';
import {Recognitions} from './components/recognitions';

/* istanbul ignore next */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestRecognitions();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.recognitions !== nextProps.recognitions) {
            //this.props.requestRecognitions();
        }
    }

    render() {
        const {
            recognitions,
            loggedIn,
            logout
        } = this.props;

        return (
            <div>
                <div className="container-fluid h5-hdr header-component">
                    <div className="row">
                        <div className="col-lg-12 h5-logo">
                            <a href="#" className="logo"/>
                        </div>
                    </div>
                </div>
                <Menu logout={logout}/>
                <Recognitions loggedIn={loggedIn} recognitions={recognitions}/>
            </div>
        );
    }
}

Header.propTypes = {
    recognitions: PropTypes.object,
    logout: PropTypes.object
};

export default connect(
    // Map State to Props (Reducers)
    (state) => state,
    //Map DispatchToProps (Actions)
    (dispatch) => (bindActionCreators({...RecognitionActions, logout}, dispatch))
)(Header);

