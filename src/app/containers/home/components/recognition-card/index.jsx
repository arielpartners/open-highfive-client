import React, {Component} from 'react';
import cx from 'classnames';

/* istanbul ignore next */
if (__WEBPACK__) {
    // require('./style.scss');
}

export class RecognitionCard extends Component {

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
        let {receiverName, senderName, points, corporateValueName, description, openModal} = this.props;

        let corporateValue = corporateValueName || '';
        return (
            <div className={ cx('h5-recognition-card', 'h5-' + corporateValue.toLowerCase()) }>
                <h3><i></i>{corporateValue}</h3>
                <blockquote>
                    {description}
                    <span>{points} Points from {senderName}</span>
                </blockquote>

                <div className="h5-recognized-person">
                    <img src="https://github.com/arielpartners/highfive-client/raw/master/dev/img/headshot.jpg"
                         onerror="this.src='images/avatar.png';" alt={receiverName}/>
                    <a href="#">{receiverName}</a>
                </div>

                <div className="h5-recognition-nav-panel">
                    <a href="#" data-toggle="modal"
                       data-target="#recognitionDetails"
                       onClick={openModal}
                    ><span className="glyphicon glyphicon-new-window"></span></a>
                </div>
            </div>
        );
    }
}
