import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './metric-widget-item.sass';


export default class MetricWidgetItem extends Component {
  render() {
    const { value, name, description, isHighlight, firstChunk, lastChunk } = this.props;
    const active = value > 0;

    return (
      <div
        className={ classnames(style.metricWidgetItem, { 'first-chunk': firstChunk, 'last-chunk': lastChunk }) }>
        <div className={ classnames('value', { active: active, highlight: isHighlight }) }>
          { value }
        </div>
        <div className={ classnames('name', { active: active }) }>
          { name }
        </div>
        <div className='description'>
          { description }
        </div>
      </div>
    );
  }
}

MetricWidgetItem.defaultProps = {
  isHighlight: false,
  description: '',
  firstChunk: false,
  lastChunk: false,
};

MetricWidgetItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.node,
  description: PropTypes.string,
  isHighlight: PropTypes.bool,
  firstChunk: PropTypes.bool,
  lastChunk: PropTypes.bool,
};
