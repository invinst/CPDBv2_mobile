import React, { Component, PropTypes } from 'react';
import { chunk, map } from 'lodash';

import MetricWidgetItem from './metric-widget-item';
import style from './metric-widget.sass';


export default class MetricWidget extends Component {
  render() {
    const metricChunks = chunk(this.props.metrics, 2);
    return (
      <div className={ style.metricWidget }>
        <div className='nested-wrapper'>
          {
            map(metricChunks, (metricChunk, chunkIndex) => (
              <div className='chunk' key={ chunkIndex }>
                { map(metricChunk, (metric, metricIndex) => (
                  <MetricWidgetItem
                    key={ metricIndex }
                    firstChunk={ chunkIndex === 0 }
                    lastChunk={ chunkIndex === (metricChunks.length - 1) }
                    { ...metric }
                  />
                )) }
                <div className='clearfix'/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

MetricWidget.propTypes = {
  metrics: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    description: PropTypes.string,
    isHighlight: PropTypes.bool,
  })).isRequired,
};
