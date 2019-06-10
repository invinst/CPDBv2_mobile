import React, { Component, PropTypes } from 'react';
import { isEqual } from 'lodash';

import styles from './pinboard-info.sass';
import AutosaveTextInput from 'components/common/autosave-inputs/autosave-text-input';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


export default class PinboardInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading } = this.state;
    if (isLoading) {
      this.setState({ isLoading: false });
    }
  }

  shouldComponentUpdate(nextState) {
    return !isEqual(this.state, nextState);
  }

  render() {
    const { pinboard, updatePinboardInfo } = this.props;
    return !this.state.isLoading ? (
      <div className={ styles.pinboardInfo }>
        <AutosaveTextInput
          className='pinboard-title'
          value={ pinboard.title }
          placeholder='Title your pinboard'
          fieldType='title'
          save={ updatePinboardInfo }
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
    ) : null;
  }
}

PinboardInfo.propTypes = {
  pinboard: PropTypes.object,
  updatePinboardInfo: PropTypes.func,
};
