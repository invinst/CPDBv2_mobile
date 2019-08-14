import React, { Component, PropTypes } from 'react';
import clearIcon from 'img/ic-clear.svg';

export default class ClearableInput extends Component {
  clearQuery() {
    this.props.onClear();
    this.inputElement.focus();
  }

  renderClearIcon() {
    if (!this.props.value) {
      return null;
    }

    return (
      <img
        className='clear-icon'
        src={ clearIcon }
        onClick={ this.clearQuery.bind(this) }
      />
    );
  }

  render() {
    const { onClear, ...inputProps } = this.props; /* eslint no-unused-vars: 0 */

    return (
      <div className='query-input-container'>
        <input
          ref={ (inputElement) => { this.inputElement = inputElement; } }
          { ...inputProps }
        />
        { this.renderClearIcon() }
      </div>
    );
  }
}

ClearableInput.propTypes = {
  onClear: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
};
