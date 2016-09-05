import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RecognitionCard} from './components/recognition-card';
import {RecognizePeer} from './components/recognize-peer';
import {bindActionCreators} from 'redux';
import * as HomeActions from './actions';

/* istanbul ignore next */
if (__WEBPACK__) {
    //require('./style.scss');
}

export class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /* eslint-disable no-undef */
        componentHandler.upgradeDom();
        /* eslint-enable no-undef */
        this.props.requestRecognitions();
        this.props.requestUsers();
    }

    componentDidUpdate() {
        /* eslint-disable no-undef */
        componentHandler.upgradeDom();
        /* eslint-enable no-undef */
    }

    render() {

        const {recognitions = [], users = [], user = {}} = this.props;
        const filteredUsers =
                        users ?
                        users.filter((current) => current.email !== user.email) :
                        [];

        return (
            <div className="container-fluid">
                <div className="row">
                    <RecognizePeer users={filteredUsers}/>

                    <div className="col-lg-6 h5-mobilehidden">

                        <h2>Recent Recognitions</h2>

                        {
                            recognitions.map(function(recognition) {
                                return <RecognitionCard key={'recognition-' + recognition.id} {...recognition} />;
                            })
                        }

                        <div className="clearfix"></div>
                    </div>

                    <div className="col-lg-3">

                        <h2>For Managers</h2>

                        <ul className="list-unstyled list-group h5-quicklinks">
                            <li className="list-group-item"><a href="#">
                                <span className="glyphicon glyphicon-ok"></span> Approve Recognitions</a>
                            </li>
                            <li className="list-group-item"><a href="#">
                                <span className="glyphicon glyphicon-list"></span> My Organization</a>
                            </li>
                            <li className="list-group-item"><a href="#">
                                <span className="glyphicon glyphicon-user"></span> Manage Users</a>
                            </li>
                            <li className="list-group-item"><a href="#">
                                <span className="glyphicon glyphicon-stats"></span> Program Reports</a>
                            </li>
                        </ul>

                        <h2>For Administrators</h2>

                        <ul className="list-unstyled list-group h5-quicklinks">
                            <li className="list-group-item"><a href="#">
                                <span className="glyphicon glyphicon-cog"></span> Manage Corporate Values</a>
                            </li>
                            <li className="list-group-item"><a href="#">
                                <span className="glyphicon glyphicon-user"></span> Manage Users</a>
                            </li>
                            <li className="list-group-item">
                                <a href="#"><span className="glyphicon glyphicon-shopping-cart"></span> Manage Reward
                                    Store</a>
                            </li>
                            <li className="list-group-item">
                                <a href="#"><span className="glyphicon glyphicon-ok"></span> Approve Recognitions</a>
                            </li>
                            <li className="list-group-item"><a href="#">
                                <span className="glyphicon glyphicon-list"></span> My Organization</a>
                            </li>
                            <li className="list-group-item"><a href="#">
                                <span className="glyphicon glyphicon-stats"></span> Program Reports</a>
                            </li>
                        </ul>

                    </div>

                </div>
            </div>
        );
    }
}

/* istanbul ignore next */
// export default connect(mapStateToProps)(Home);
export default connect(
    // Map State to Props (Reducers)
    (state) => state,
    //Map DispatchToProps (Actions)
    (dispatch) => (bindActionCreators({...HomeActions}, dispatch))
    // {...HomeActions}
)(Home);
