import React, { Component, PropTypes } from 'react';

import ExplainerLayout from './explainer-layout';
import DescriptionContent from './description-content';


export default class ScaleExplainer extends Component {
  render() {
    const {
      leftNavHandler, rightNavHandler, closeExplainer, radarChartData,
      descriptionCMSContent, subDescriptionCMSContent,
    } = this.props;
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
      areaColor: '#767676',
    };
    const content = (
      <DescriptionContent content={ descriptionCMSContent } subContent={ subDescriptionCMSContent }/>
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
  descriptionCMSContent: PropTypes.object,
  subDescriptionCMSContent: PropTypes.object,
};
