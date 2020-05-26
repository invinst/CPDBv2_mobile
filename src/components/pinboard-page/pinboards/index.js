import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { redirectToCreatedPinboard } from 'utils/pinboard';
import PinboardLinkContainer from 'containers/pinboard-page/pinboard-link-container';
import PinboardItem from './pinboard-item';
import styles from './pinboards.sass';


class Pinboards extends Component {
  componentDidMount() {
    this.props.fetchPinboards();
  }

  handleCreateNewEmptyPinboard = () => {
    const { createNewEmptyPinboard } = this.props;
    createNewEmptyPinboard().then((response) => {
      redirectToCreatedPinboard(response);
    });
  };

  render() {
    const { pinboards, duplicatePinboard, pinboard: currentPinboard } = this.props;

    return (
      <div className={ styles.pinboards }>
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
              isCurrent={ pinboard.id === currentPinboard.id }
              duplicatePinboard={ duplicatePinboard }
            />
          ))
        }
      </div>
    );
  }
}

Pinboards.propTypes = {
  createNewEmptyPinboard: PropTypes.func,
  duplicatePinboard: PropTypes.func,
  pinboards: PropTypes.array,
  fetchPinboards: Pinboards.func,
  pinboard: PropTypes.object,
};

Pinboards.defaultProps = {
  duplicatePinboard: noop,
  fetchPinboards: noop,
  pinboard: {},
};

export default Pinboards;
