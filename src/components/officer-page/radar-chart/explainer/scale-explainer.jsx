import React, { Component, PropTypes } from 'react';

import ExplainerLayout from './explainer-layout';
import DescriptionContent from './description-content';


export default class ScaleExplainer extends Component {
  render() {
    const { leftNavHandler, rightNavHandler, closeExplainer, radarChartData } = this.props;
    const { items } = radarChartData;

    const scaleConfig = {
      data: items,
      showValueInsteadOfTitle: true,
      backgroundColor: '#dbdbdb',
      showGrid: true,
      gridOpacity: 0.5,
      gridColor: '#adadad',
      showSpineLine: false,
      showAxisValue: true,
      axisTitleFontSize: 25,
      radius: 141,
      yAxisCenter: 155,
      areaColor: '#767676'
    };
    const content = (
      <DescriptionContent
        content={
          'If an officer’s percentile rank for civilian complaints is 99% ' +
          'then this means that they were accused in more civilian complaints per year than 99% of other officers.'
        }
        subContent={
          'Civilian and internal complaint percentiles are based on data that is only available since 2000, ' +
          'use of force data is only available since 2004. ' +
          'The overall allegation count percentiles displayed on the officer profile page ' +
          'are calculated using data that reaches back to 1988.'
        }
      />
    );

    return (
      <ExplainerLayout
        radarChartConfig={ scaleConfig }
        leftNavigationText='What is this triangle?'
        rightNavigationText='Percentiles by year'
        leftNavHandler={ leftNavHandler }
        rightNavHandler={ rightNavHandler }
        title='What is the scale?'
        content={ content }
        closeExplainer={ closeExplainer }
      />
    );
  }
}

ScaleExplainer.propTypes = {
  radarChartData: PropTypes.object,
  closeExplainer: PropTypes.func,
  leftNavHandler: PropTypes.func,
  rightNavHandler: PropTypes.func,
};
