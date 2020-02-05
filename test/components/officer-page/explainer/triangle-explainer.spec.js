import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import TriangleExplainer from 'components/officer-page/radar-chart/explainer/triangle-explainer';
import ExplainerLayout from 'components/officer-page/radar-chart/explainer/explainer-layout';
import DescriptionContent from 'components/officer-page/radar-chart/explainer/description-content';
import { EditorState } from 'draft-js';


describe('TriangleExplainer component', function () {
  const data = {
    year: 2017,
    items: [
      { axis: 'Use of Force Reports', value: 80 },
      { axis: 'Civilian Complaints', value: 70 },
      { axis: 'Internal Complaints', value: 60 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white',
  };


  it('should render enough content', function () {
    const closeExplainerSpy = sinon.spy();
    const leftNavHandlerSpy = sinon.spy();
    const rightNavHandlerSpy = sinon.spy();
    const descriptionCMSContent = EditorState.createEmpty();
    const subDescriptionCMSContent = EditorState.createEmpty();

    const wrapper = mount(
      <TriangleExplainer
        radarChartData={ data }
        closeExplainer={ closeExplainerSpy }
        leftNavHandler={ leftNavHandlerSpy }
        rightNavHandler={ rightNavHandlerSpy }
        descriptionCMSContent={ descriptionCMSContent }
        subDescriptionCMSContent={ subDescriptionCMSContent }
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
      areaColor: '#767676',
    });
    layout.prop('leftNavigationText').should.equal('Percentiles by year');
    layout.prop('rightNavigationText').should.equal('What is the scale?');
    layout.prop('leftNavHandler').should.equal(leftNavHandlerSpy);
    layout.prop('rightNavHandler').should.equal(rightNavHandlerSpy);
    layout.prop('title').should.equal('What is this triangle?');
    layout.prop('closeExplainer').should.equal(closeExplainerSpy);

    const descriptionContent = layout.find(DescriptionContent);

    descriptionContent.prop('content').should.equal(descriptionCMSContent);
    descriptionContent.prop('subContent').should.equal(subDescriptionCMSContent);
  });
});
