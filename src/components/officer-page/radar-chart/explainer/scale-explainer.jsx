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
          'The scale is based on this officer’s percentile rank. ' +
          'This is relative to all other officers for whom data is available during the same years.'
        }
        subContent={
          'If an officer’s percentile rank for civilian complaints is 99% ' +
          'then this means that they were accused in more civilian complaints per year than 99 % ' +
          'of other officers for whom data is available during the same years.'
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
