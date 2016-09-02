/**
 * Modal dialog
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

/* istanbul ignore next */
if (__WEBPACK__) {
  //require('!style!css!sass!./style.scss');
}

class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    closeModal() {
      // TODO: dispatch close modal action
    }

    render() {
        return (
          <div className={ 'h5-modal-backdrop fade' + (this.props.in ? 'in' : '') }>
            <div role="dialog"
                 className={ 'modal fade ' + (this.props.in ? 'in' : '') }
                 style={{display: (this.props.in ? 'block' : 'none')}}
                 onClick={ this.closeModal }>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">×</button>
                    <h4 className="modal-title">Congratulations!</h4>
                  </div>
                  <div className="modal-body text-center">

                    <img src="https://github.com/arielpartners/highfive-client/raw/master/dev/img/headshot.jpg"
                         className="roundheadshot" alt="Julie Doe"/>
                    <p><a href="#">Julie Doe</a></p>
                    <p>just recognized you for
                    </p><h2>Teamwork</h2>
                    <span className="h5-recognized-pts">20 pts</span><p></p>

                    <h3><span className="glyphicon glyphicon-thumbs-up"></span> Say Thank You</h3>
                  </div>
                  <div className="modal-footer">
                    <button type="reset" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

Modal.propTypes = {
    in: PropTypes.bool
};

export default connect(
  // Map State to Props (Reducers)
  (state) => state,
)(Modal);
