/**
 * Modal dialog
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';

import {closeModal} from '../../actions';

/* istanbul ignore next */
if (__WEBPACK__) {
  //require('!style!css!sass!./style.scss');
}

class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    closeModal() {
        this.props.closeModal();
    }

    render() {
        const {modalDisplayed} = this.props;

        const backDropClass = cx(
            'h5-modal-backdrop',
            'fade',
            modalDisplayed ? 'in' : ''
        );

        const dialogClass = cx(
            'modal',
            'fade',
            modalDisplayed ? 'in' : ''
        );

        const displayStyle = {
            display: (modalDisplayed ? 'block' : 'none')
        };

        return (
          <div className={ backDropClass }
               style={displayStyle}>
            <div role="dialog"
                 className={ dialogClass }
                 style={displayStyle}
                 onClick={()=>this.closeModal()}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button onClick={()=>this.closeModal()}
                      type="button" className="close" data-dismiss="modal">×</button>
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
                    <button onClick={()=>this.closeModal()}
                      type="reset" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

Modal.propTypes = {
    modalDisplayed: PropTypes.bool
};

export default connect(
  // Map State to Props (Reducers)
  (state) => state,
  //Map DispatchToProps (Actions)
  {closeModal}
)(Modal);
