import React, {Component} from 'react';

/* istanbul ignore next */
if (__WEBPACK__) {
    //require('./style.scss');
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
        let {receiver, sender, date, points, corporateValue} = this.props;
        return (
            <div className="h5-recognition-card h5-empowerment">
                <img src="https://github.com/arielpartners/highfive-client/raw/master/dev/img/headshot.jpg"
                     alt="Julie Doe"/>
                <a href="#" className="h5-recognized-person">{receiver}</a> was recognized for
                <span className="h5-recognized-value">{corporateValue}</span> by
                <a href="#" className="h5-recognized-by">{sender}</a>
                <span className="h5-recognized-date">{date}</span>
                <span className="h5-recognized-pts">{points} pts / 300 pts total</span>
                <div className="clearfix"></div>
            </div>
        );
    }
}
