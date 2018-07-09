import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import ScaleExplainer from 'components/officer-page/radar-chart/explainer/scale-explainer';
import ExplainerLayout from 'components/officer-page/radar-chart/explainer/explainer-layout';
import DescriptionContent from 'components/officer-page/radar-chart/explainer/description-content';


describe('ScaleExplainer component', function () {
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
      <ScaleExplainer
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
    });
    layout.prop('leftNavigationText').should.equal('What is this triangle?');
    layout.prop('rightNavigationText').should.equal('Percentiles by year');
    layout.prop('leftNavHandler').should.equal(leftNavHandlerSpy);
    layout.prop('rightNavHandler').should.equal(rightNavHandlerSpy);
    layout.prop('title').should.equal('What is the scale?');
    layout.prop('closeExplainer').should.equal(closeExplainerSpy);

    const descriptionContent = layout.find(DescriptionContent);

    descriptionContent.prop('content').should.equal(
      'The scale is based on this officer’s percentile rank. ' +
      'This is relative to all other officers for whom data is available during the same years.'
    );
    descriptionContent.prop('subContent').should.equal(
      'If an officer’s percentile rank for civilian complaints is 99% ' +
      'then this means that they were accused in more civilian complaints per year than 99 % ' +
      'of other officers for whom data is available during the same years.'
    );
  });
});
