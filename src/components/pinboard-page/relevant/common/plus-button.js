import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import styles from './plus-button.sass';
import plus from 'img/ic-clear-plus.svg';
import darkPlus from 'img/ic-clear-plus-dark.svg';


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
      <div className={ cx(styles.plusButton, className) } onClick={ this.handleClick }>
        <img className='inner-plus' src={ darkMode ? darkPlus : plus }/>
      </div>
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
