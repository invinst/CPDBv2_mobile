import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Modal from 'react-modal';

import { redirectToCreatedPinboard } from 'utils/pinboard';
import PinboardLinkContainer from 'containers/pinboard-page/pinboard-link-container';
import PinboardItem from './pinboard-item';
import styles from './pinboards.sass';


class Pinboards extends Component {
  handleCreateNewEmptyPinboard = () => {
    const { createNewEmptyPinboard } = this.props;
    createNewEmptyPinboard().then((response) => {
      redirectToCreatedPinboard(response);
    });
  };

  render() {
    const { pinboards, duplicatePinboard, isShownPinboardsList, hideShowPinboardsList } = this.props;

    return (
      <Modal
        isOpen={ isShownPinboardsList }
        onRequestClose={ () => hideShowPinboardsList(false) }
        className={ styles.pinboards }
        overlayClassName={ styles.pinboardsOverlay }
      >
        <div className='pinboards-title'>
          Pinboards
          <PinboardLinkContainer
            className='new-pinboard-btn'
            onClick={ this.handleCreateNewEmptyPinboard } />
        </div>
        {
          pinboards.map((pinboard) => (
            <PinboardItem
              key={ pinboard.id }
              pinboard={ pinboard }
              duplicatePinboard={ duplicatePinboard }
            />
          ))
        }
      </Modal>
    );
  }
}

Pinboards.propTypes = {
  createNewEmptyPinboard: PropTypes.func,
  duplicatePinboard: PropTypes.func,
  pinboards: PropTypes.array,
  isShownPinboardsList: PropTypes.bool,
  hideShowPinboardsList: PropTypes.func,
};

Pinboards.defaultProps = {
  duplicatePinboard: noop,
  isShownPinboardsList: false,
  hideShowPinboardsList: noop,
};

export default Pinboards;
