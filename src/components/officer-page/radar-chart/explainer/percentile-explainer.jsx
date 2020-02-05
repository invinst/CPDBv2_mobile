import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { last } from 'lodash';

import ExplainerLayout from './explainer-layout';
import style from './percentile-explainer.sass';
import { roundedPercentile } from 'utils/calculation';
import StaticRadarChart from 'components/common/radar-chart';


export default class PercentileExplainer extends Component {
  render() {
    const { leftNavHandler, rightNavHandler, closeExplainer, data } = this.props;
    const { items, visualTokenBackground } = last(data);

    const percentileConfig = {
      data: items,
      backgroundColor: visualTokenBackground,
      showSpineLine: false,
      showGrid: true,
      gridOpacity: 0.5,
      showAxisValue: true,
      radius: 141,
      axisTitleFontSize: 25,
      axisTitleFontWeight: 200,
      textColor: 'white',
      gridColor: '#adadad',
      yAxisCenter: 155,
      areaColor: '#000000',
    };

    const radarConfig = {
      hideAxisText: true,
      showGrid: false,
      showSpineLine: false,
    };

    const tableData = data ? [].concat(data).reverse() : [];

    const content = (
      <div className={ style.percentileExplainer }>
        <div className='table-header'>
          <div className='header-cell'>Internal Complaints</div>
          <div className='header-cell'>Civilian Complaints</div>
          <div className='header-cell'>Use Of Force</div>
        </div>
        <ul className='percentile-table'>
          { tableData && tableData.map((yearlyItem) => {
            const [trrItem, internalComplaintItem, civilComplaintItem] = yearlyItem.items;
            return (
              <li className='percentiles-row' key={ yearlyItem.year }>
                <div className='radar-chart-container'>
                  <StaticRadarChart
                    { ...radarConfig }
                    backgroundColor={ yearlyItem.visualTokenBackground }
                    data={ yearlyItem.items }
                  />
                </div>
                <div className='year'>{ yearlyItem.year }</div>
                <div className='cell'>{ roundedPercentile(internalComplaintItem.value) }</div>
                <div className='cell'>{ roundedPercentile(civilComplaintItem.value) }</div>
                <div className='cell'>{ roundedPercentile(trrItem.value) }</div>
              </li>
            );
          }) }
        </ul>
      </div>
    );

    return (
      <ExplainerLayout
        radarChartConfig={ percentileConfig }
        leftNavigationText='What is the scale?'
        rightNavigationText='What is this triangle?'
        leftNavHandler={ leftNavHandler }
        rightNavHandler={ rightNavHandler }
        title='Cumulative Percentiles by Year'
        content={ content }
        closeExplainer={ closeExplainer }
      />
    );
  }
}

PercentileExplainer.propTypes = {
  data: PropTypes.array,
  closeExplainer: PropTypes.func,
  leftNavHandler: PropTypes.func,
  rightNavHandler: PropTypes.func,
};
