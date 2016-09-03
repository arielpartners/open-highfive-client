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

    getBackDropClass(show) {
        return cx(
          'h5-modal-backdrop',
          'fade',
          show ? 'in' : ''
        );
    }

    render() {
        const {modalDisplayed} = this.props;
        if (!modalDisplayed.show || !modalDisplayed.config.component) {
            return null;
        }
        const Content = modalDisplayed.config.component;
        const Footer = modalDisplayed.config.footer;

        const displayStyle = {
            display: (modalDisplayed.show ? 'block' : 'none')
        };

        return (
          <div className={ cx('h5-modal-backdrop', 'fade', {in: modalDisplayed.show}) }
               style={displayStyle}>
            <div role="dialog"
                 className= { cx('modal', 'fade', {in: modalDisplayed.show}) }
                 style={displayStyle}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button onClick={()=>this.closeModal()}
                      type="button" className="close" data-dismiss="modal">×</button>
                    <h4 className="modal-title">{modalDisplayed.config.header}</h4>
                  </div>
                  <div className="modal-body text-center">
                    <Content />
                  </div>
                  <div className="modal-footer">
                    <Footer onClick={()=>this.closeModal()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

Modal.propTypes = {
    modalDisplayed: PropTypes.object
};

export default connect(
  // Map State to Props (Reducers)
  (state) => state,
  //Map DispatchToProps (Actions)
  {closeModal}
)(Modal);
