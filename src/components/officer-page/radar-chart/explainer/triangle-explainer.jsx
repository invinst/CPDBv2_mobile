import React, { Component, PropTypes } from 'react';

import ExplainerLayout from './explainer-layout';
import DescriptionContent from './description-content';


export default class TriangleExplainer extends Component {
  render() {
    const {
      leftNavHandler, rightNavHandler, closeExplainer, radarChartData,
      descriptionCMSContent, subDescriptionCMSContent,
    } = this.props;
    const { items } = radarChartData;

    const triangleConfig = {
      data: items,
      backgroundColor: '#dbdbdb',
      showGrid: true,
      gridOpacity: 0.5,
      gridColor: '#adadad',
      showSpineLine: false,
      radius: 141,
      yAxisCenter: 155,
      areaColor: '#767676',
    };
    const content = (
      <DescriptionContent
        content={ descriptionCMSContent }
        subContent={ subDescriptionCMSContent }
      />
    );

    return (
      <ExplainerLayout
        radarChartConfig={ triangleConfig }
        leftNavigationText='Percentiles by year'
        rightNavigationText='What is the scale?'
        leftNavHandler={ leftNavHandler }
        rightNavHandler={ rightNavHandler }
        title='What is this triangle?'
        content={ content }
        closeExplainer={ closeExplainer }
      />
    );
  }
}

TriangleExplainer.propTypes = {
  radarChartData: PropTypes.object,
  closeExplainer: PropTypes.func,
  leftNavHandler: PropTypes.func,
  rightNavHandler: PropTypes.func,
  descriptionCMSContent: PropTypes.object,
  subDescriptionCMSContent: PropTypes.object,
};
