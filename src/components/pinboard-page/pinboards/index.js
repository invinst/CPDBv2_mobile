import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Modal from 'react-modal';

import { redirectToCreatedPinboard } from 'utils/pinboard';
import PinboardLinkContainer from 'containers/pinboard-page/pinboard-link-container';
import PinboardItem from './pinboard-item';
import { PINBOARD_ACTIONS_PANE_SPACE } from 'constants';
import styles from './pinboards.sass';


class Pinboards extends Component {
  state = { showActionsPinboardId: null, actionsPanePosition: 'bottom' };

  static getDerivedStateFromProps(props, state) {
    if (!props.isShownPinboardsList) {
      return { showActionsPinboardId: null };
    }
    return null;
  }

  handleCreateNewEmptyPinboard = () => {
    const { createNewEmptyPinboard } = this.props;
    createNewEmptyPinboard().then((response) => {
      redirectToCreatedPinboard(response);
    });
  };

  handleSetShowActionsPinboardId = (pinboardId, actionsButtonBottom) => {
    if (pinboardId) {
      const { bottom: modalBottom } = this.modal.getBoundingClientRect();
      const actionsPaneSpace = modalBottom - actionsButtonBottom;
      this.setState({
        showActionsPinboardId: pinboardId,
        actionsPanePosition: actionsPaneSpace > PINBOARD_ACTIONS_PANE_SPACE ? 'bottom' : 'top',
      });
    } else {
      this.setState({ showActionsPinboardId: null });
    }
  };

  render() {
    const { pinboards, duplicatePinboard, isShownPinboardsList, hideShowPinboardsList, removePinboard } = this.props;
    const { showActionsPinboardId, actionsPanePosition } = this.state;

    return (
      <Modal
        isOpen={ isShownPinboardsList }
        onRequestClose={ () => hideShowPinboardsList(false) }
        className={ styles.pinboardsWrapper }
        overlayClassName={ styles.pinboardsOverlay }
      >
        <div className='pinboards' ref={ el => this.modal = el }>
          <div className='pinboards-title'>
            Pinboards
            <PinboardLinkContainer
              className='new-pinboard-btn'
              onClick={ this.handleCreateNewEmptyPinboard } />
          </div>
          {
            pinboards.map((pinboard) => (
              <PinboardItem
                key={ pinboard.key }
                pinboard={ pinboard }
                actionsPanePosition={ actionsPanePosition }
                duplicatePinboard={ duplicatePinboard }
                removePinboard={ removePinboard }
                shouldShowActions={ pinboard.id === showActionsPinboardId }
                handleSetShowActionsPinboardId={ this.handleSetShowActionsPinboardId }
              />
            ))
          }
        </div>
      </Modal>
    );
  }
}

Pinboards.propTypes = {
  createNewEmptyPinboard: PropTypes.func,
  duplicatePinboard: PropTypes.func,
  removePinboard: PropTypes.func,
  pinboards: PropTypes.array,
  isShownPinboardsList: PropTypes.bool,
  hideShowPinboardsList: PropTypes.func,
};

Pinboards.defaultProps = {
  duplicatePinboard: noop,
  removePinboard: noop,
  isShownPinboardsList: false,
  hideShowPinboardsList: noop,
};

export default Pinboards;
