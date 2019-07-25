import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import styles from './plus-button.sass';


export class PlusButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    const { className, darkMode } = this.props;
    return (
      <div className={ cx(styles.plusButton, className, { 'dark-mode': darkMode }) } onClick={ this.handleClick } />
    );
  }
}

PlusButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
};

PlusButton.defaultProps = {
  darkMode: false
};

export default PlusButton;
