import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import simpleList from 'styles/Shared/SimpleList.sass';


class SimpleList extends Component {
  renderRow(row, index) {
    const { label, url, onClick } = row;

    const contents = [
      <div className='label' key='label'>{ label }</div>
    ];

    if (url) {
      return (
        <Link
          to={ url }
          onClick={ onClick }
          className={ '--test-simple-list-item ' + simpleList.itemStyle }
          key={ index }
        >
          { contents }
        </Link>
      );
    } else {
      return (
        <div onClick={ onClick } className={ '--test-simple-list-item ' + simpleList.itemStyle } key={ index }>
          { contents }
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        { this.props.rows.map(this.renderRow) }
      </div>
    );
  }
}

SimpleList.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
      onClick: PropTypes.func
    })
  )
};

export default SimpleList;
