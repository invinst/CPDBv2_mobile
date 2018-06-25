import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import style from './metric-widget-item.sass';


export default class MetricWidgetItem extends Component {
  render() {
    const { value, name, description, isHighlight, firstChunk, lastChunk } = this.props;
    const active = value > 0;
    const paddingBottom = firstChunk ? '8px' : '0';
    const paddingTop = lastChunk ? '8px' : '0';

    return (
      <div className={ style.metricWidgetItem } style={ { paddingBottom, paddingTop } }>
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
