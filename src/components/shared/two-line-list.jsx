import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import twoLineListStyle from './two-line-list.sass';


class TwoLineList extends Component {
  renderRow(row, index) {
    const { label, sublabel, url, onClick } = row;
    const color = row.color || '#dbdbdb';

    const contents = [
      <div className='icon' style={ { backgroundColor: color } } key='icon' />,
      <div className='labels' key='label'>
        <div className='label'>{ label }</div>
        <div className='sublabel'>{ sublabel }</div>
      </div>,
    ];

    if (url) {
      return (
        <Link
          to={ url }
          onClick={ onClick }
          className={ 'test--two-line-item ' + twoLineListStyle.itemStyle }
          key={ index }
        >
          { contents }
        </Link>
      );
    } else {
      return (
        <div
          onClick={ onClick }
          className={ 'test--two-line-item ' + twoLineListStyle.itemStyle }
          key={ index }
        >
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

TwoLineList.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      label: PropTypes.string,
      sublabel: PropTypes.string,
      url: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

export default TwoLineList;
