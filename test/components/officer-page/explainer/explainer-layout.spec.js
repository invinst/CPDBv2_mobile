import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import StaticRadarChart from 'components/common/radar-chart';
import ExplainerLayout from 'components/officer-page/radar-chart/explainer/explainer-layout';
import ExplainerNav from 'components/officer-page/radar-chart/explainer/explainer-nav';


describe('ExplainerLayout component', function () {
  it('should render enough content', function () {
    const radarChartConfig = { width: 512, height: 392 };
    const leftNavigationText = 'some left navigation text';
    const rightNavigationText = 'some right navigation text';
    const leftNavHandlerSpy = sinon.spy();
    const rightNavHandlerSpy = sinon.spy();
    const title = 'some title';
    const content = <div className='test--explainer-layout-content'/>;

    const wrapper = shallow(
      <ExplainerLayout
        radarChartConfig={ radarChartConfig }
        leftNavigationText={ leftNavigationText }
        rightNavigationText={ rightNavigationText }
        leftNavHandler={ leftNavHandlerSpy }
        rightNavHandler={ rightNavHandlerSpy }
        title={ title }
        content={ content }
      />
    );

    const radarChart = wrapper.find(StaticRadarChart);
    radarChart.prop('width').should.equal(512);
    radarChart.prop('height').should.equal(392);

    const explainerNav = wrapper.find(ExplainerNav);
    explainerNav.prop('leftNavigationText').should.equal('some left navigation text');
    explainerNav.prop('rightNavigationText').should.equal('some right navigation text');
    explainerNav.prop('leftNavHandler').should.equal(leftNavHandlerSpy);
    explainerNav.prop('rightNavHandler').should.equal(rightNavHandlerSpy);

    const explainerContent = wrapper.find('.explainer-content');
    explainerContent.find('.title').text().should.equal('some title');

    explainerContent.find('.test--explainer-layout-content').exists().should.be.true();
  });

  it('should invoke closeExplainer when clicking on the close button', function () {
    const closeExplainerSpy = sinon.spy();

    const wrapper = shallow(
      <ExplainerLayout closeExplainer={ closeExplainerSpy }/>
    );

    wrapper.find('.explainer-close-button').simulate('click');

    closeExplainerSpy.calledOnce.should.be.true();
  });
});
