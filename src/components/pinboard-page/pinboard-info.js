import React, { Component, PropTypes } from 'react';
import AppHistory from 'utils/history';

import styles from './pinboard-info.sass';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


export default class PinboardInfo extends Component {
  componentWillReceiveProps(nextProps) {
    const { pinboard } = this.props;
    if (pinboard.url !== nextProps.pinboard.url) {
      AppHistory.replace(nextProps.pinboard.url);
    }
  }

  render() {
    const { pinboard, updatePinboardInfo } = this.props;
    return (
      <div className={ styles.pinboardInfo }>
        <AutosaveTextareaInput
          className='pinboard-title'
          value={ pinboard.title }
          placeholder='Title your pinboard'
          fieldType='title'
          save={ updatePinboardInfo }
          textareaLineHeight={ 31 }
        />
        <AutosaveTextareaInput
          className='pinboard-description'
          value={ pinboard.description }
          placeholder='Now, write something brief, describing your pinboard.'
          fieldType='description'
          save={ updatePinboardInfo }
          textareaLineHeight={ 16 }
        />
      </div>
    );
  }
}

PinboardInfo.propTypes = {
  pinboard: PropTypes.object,
  updatePinboardInfo: PropTypes.func,
};
