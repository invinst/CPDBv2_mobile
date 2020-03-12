import PropTypes from 'prop-types';
import React, { Component } from 'react';
import browserHistory from 'utils/history';

import styles from './pinboard-info.sass';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';
import AutosaveMarkdownTextareaInput from 'components/common/autosave-inputs/autosave-markdown-textarea-input';


export default class PinboardInfo extends Component {
  componentDidUpdate(prevProps) {
    const { pinboard } = this.props;
    if (prevProps.pinboard.url !== pinboard.url) {
      browserHistory.replace(pinboard.url);
    }
  }

  render() {
    const { pinboard, updatePinboardInfo } = this.props;
    return (
      <div className={ styles.pinboardInfo }>
        <AutosaveTextareaInput
          className='pinboard-title'
          value={ pinboard.title }
          placeholder='Give your pinboard a title'
          fieldType='title'
          save={ updatePinboardInfo }
          textareaLineHeight={ 31 }
        />
        <AutosaveMarkdownTextareaInput
          className='pinboard-description'
          value={ pinboard.description }
          placeholder='When you’re ready, add a description for your pinboard here'
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
