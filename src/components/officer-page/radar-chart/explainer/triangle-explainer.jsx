import React, { Component, PropTypes } from 'react';

import ExplainerLayout from './explainer-layout';
import DescriptionContent from './description-content';


export default class TriangleExplainer extends Component {
  render() {
    const { leftNavHandler, rightNavHandler, closeExplainer, radarChartData } = this.props;
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
      areaColor: '#767676'
    };
    const content = (
      <DescriptionContent
        content={
          'The corners of the triangle show the percentile score for this officer in each of three types of data: ' +
          'complaints from civilians, complaints from other officers, and self-reported uses of force.'
        }
        subContent={
          'If one corner of the black inner triangle is close to reaching the outer triangle, ' +
          'then this officer is named in a relatively high rate ' +
          'of incidents of that type compared with other officers.'
        }
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
};
