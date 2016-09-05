import React, {Component} from 'react';
// import cx from 'classnames';

/* istanbul ignore next */
if (__WEBPACK__) {
    // require('./style.scss');
}

export class RecognitionModal extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /* eslint-disable no-undef */
        componentHandler.upgradeDom();
        /* eslint-enable no-undef */
    }

    componentDidUpdate() {
        /* eslint-disable no-undef */
        componentHandler.upgradeDom();
        /* eslint-enable no-undef */
    }

    render() {
        // let {close, visible} = this.props;
        let {visible} = this.props;

        return (
            <div id="recognitionDetails" className="modal fade h5-recognitionDetails" role="dialog">
                { /*
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h2>Teamwork</h2>
                        </div>
                        <div className="modal-body text-center">

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-6 col-sm-12" style="margin-bottom: 20px;">
                                        <img src="photos/headshot.jpg" className="h5-roundheadshot" alt="Julie Doe"/>
                                        <h3><a href="#">Julie Doe</a></h3>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <h4>Recognized by Janice Haverton</h4>
                                        <p><em>&quot;Thanks for pitching in and helping
                                            our team recover from our recent setback...&quot;</em></p>
                                        <p>20 pts / September 13, 2016</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <div className="pull-left hidden"><a href="#">
                                <span className="glyphicon glyphicon-thumbs-up"></span> Like this recognition</a>
                            </div>
                            <button type="reset" className="btn btn-default" data-dismiss="modal"
                                    onClick={close}>Close</button>
                        </div>
                    </div>

                </div>
                */
                }
                <h1> {visible ? 'True' : 'False'} </h1>
            </div>
        );
    }
}
