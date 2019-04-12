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
    const { className } = this.props;
    return (
      <div className={ cx(styles.plusButton, className) } onClick={ this.handleClick }>
        <div className='inner-circle'/>
      </div>
    );
  }
}

PlusButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default PlusButton;
