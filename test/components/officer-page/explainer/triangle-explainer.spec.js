import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import TriangleExplainer from 'components/officer-page/radar-chart/explainer/triangle-explainer';
import ExplainerLayout from 'components/officer-page/radar-chart/explainer/explainer-layout';
import DescriptionContent from 'components/officer-page/radar-chart/explainer/description-content';


describe('TriangleExplainer component', function () {
  const data = {
    year: 2017,
    items: [
      { axis: 'Use of Force Reports', value: 80 },
      { axis: 'Civilian Complaints', value: 70 },
      { axis: 'Internal Complaints', value: 60 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white'
  };


  it('should render enough content', function () {
    const closeExplainerSpy = spy();
    const leftNavHandlerSpy = spy();
    const rightNavHandlerSpy = spy();

    const wrapper = mount(
      <TriangleExplainer
        radarChartData={ data }
        closeExplainer={ closeExplainerSpy }
        leftNavHandler={ leftNavHandlerSpy }
        rightNavHandler={ rightNavHandlerSpy }
      />
    );

    const layout = wrapper.find(ExplainerLayout);
    layout.prop('radarChartConfig').should.deepEqual({
      data: [
        { axis: 'Use of Force Reports', value: 80 },
        { axis: 'Civilian Complaints', value: 70 },
        { axis: 'Internal Complaints', value: 60 },
      ],
      backgroundColor: '#dbdbdb',
      showGrid: true,
      gridOpacity: 0.5,
      gridColor: '#adadad',
      showSpineLine: false,
      radius: 141,
      yAxisCenter: 155,
      areaColor: '#767676'
    });
    layout.prop('leftNavigationText').should.equal('Percentiles by year');
    layout.prop('rightNavigationText').should.equal('What is the scale?');
    layout.prop('leftNavHandler').should.equal(leftNavHandlerSpy);
    layout.prop('rightNavHandler').should.equal(rightNavHandlerSpy);
    layout.prop('title').should.equal('What is this triangle?');
    layout.prop('closeExplainer').should.equal(closeExplainerSpy);

    const descriptionContent = layout.find(DescriptionContent);

    descriptionContent.prop('content').should.equal(
      'The corners of the triangle show the percentile score for this officer in each of three types of data: ' +
      'complaints from civilians, complaints from other officers, and self-reported uses of force.'
    );
    descriptionContent.prop('subContent').should.equal(
      'If one corner of the black inner triangle is close to reaching the outer triangle, ' +
      'then this officer is named in a relatively high rate ' +
      'of incidents of that type compared with other officers.'
    );
  });
});
