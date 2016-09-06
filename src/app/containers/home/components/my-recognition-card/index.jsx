import React, {Component} from 'react';
import cx from 'classnames';

/* istanbul ignore next */
if (__WEBPACK__) {
    // require('./style.scss');
}

export class MyRecognitionCard extends Component {

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
        let {date, senderName, points, corporateValueName = '', description, openModal} = this.props;

        let corporateValue = corporateValueName || '';

        return (
            <div className={ cx('h5-recognition-receipt', 'h5-' + corporateValue.toLowerCase()) }>
                <h2>
                    <span>
                        <a href="#">
                            <strong> {senderName}</strong>
                        </a> awarded you for {points} for</span> {corporateValue}</h2>

                <blockquote>{description}<span>{date}</span></blockquote>

                <div className="h5-recognition-nav-panel">
                    <a href="#"
                       data-toggle="modal"
                       data-target="#recognitionDetails"
                       onClick={openModal}>
                        <span class="glyphicon glyphicon-new-window"></span>
                    </a>
                </div>

            </div>
        );
    }
}
