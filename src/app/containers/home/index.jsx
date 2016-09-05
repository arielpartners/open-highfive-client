import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Greeting} from './components/greeting';
import {MyRecognitionCard} from './components/my-recognition-card';
import {RecognitionCard} from './components/recognition-card';
import {RecognitionModal} from './components/recognition-modal';
// import Modal from '../modal';
// import {MyRecognitions} from '../modal/myRecognitions';
import {RecognizePeer} from './components/recognize-peer';
import {bindActionCreators} from 'redux';
import * as HomeActions from './actions';
import * as RecognitionCardActions from './actions/recognition-card';

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
        if(this.props.user && this.props.user.email) {
            this.props.requestMyRecognitions();
        }
        /* eslint-disable no-undef */
        componentHandler.upgradeDom();
        /* eslint-enable no-undef */
    }

    render() {

        const {createRecognition, myRecognitions, recognitions, users, user, modalDisplayed,
            openRecognitionCardModal, closeRecognitionCardModal,
            } = this.props;
        const filteredUsers = users.filter((current) => current.email !== user.email);

        if (!this.props.loggedIn) {
            return null;
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                        <Greeting user={user} myRecognitions={myRecognitions} />
                        { myRecognitions && myRecognitions.length > 0 ?
                            <MyRecognitionCard key={'recognition-' + myRecognitions[0].id}
                                             openModal={() => openRecognitionCardModal(myRecognitions[0])}
                                             {...myRecognitions[0]} />
                            : null }
                    </div>

                    <div className="col-lg-6 h5-mobilehidden">

                        <h2>Recent Recognitions</h2>

                        {
                            recognitions.map(recognition => {
                                return (<RecognitionCard key={'recognition-' + recognition.id}
                                                         openModal={() => openRecognitionCardModal(recognition)}
                                                         {...recognition} />);
                            })
                        }

                        <div className="clearfix"></div>
                    </div>

                    <RecognizePeer users={filteredUsers} createRecognition={createRecognition}/>

                </div>

                <RecognitionModal close={closeRecognitionCardModal} visible={modalDisplayed.view}
                                  {...modalDisplayed.recognition}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return Object.assign({}, state, {
        recognitions : state.recognitions || [],
        users : state.users || [],
        modalDisplay: state.modalDisplay || {view: false, recognition: {}}
    });
};

/* istanbul ignore next */
// export default connect(mapStateToProps)(Home);
export default connect(
    // Map State to Props (Reducers)
    mapStateToProps,
    //Map DispatchToProps (Actions)
    (dispatch) => (bindActionCreators({...HomeActions, ...RecognitionCardActions}, dispatch))
    // {...HomeActions}
)(Home);
