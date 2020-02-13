import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import ExplainerNav from 'components/officer-page/radar-chart/explainer/explainer-nav';


describe('ExplainerNav component', function () {
  it('should render leftNavigationText and rightNavigationText', function () {
    const wrapper = shallow(
      <ExplainerNav
        leftNavigationText='some left text'
        rightNavigationText='some right text'
      />
    );

    wrapper.find('.left-nav').find('.text').text().should.equal('some left text');
    wrapper.find('.right-nav').find('.text').text().should.equal('some right text');
  });

  it('should invoke leftNavHandler and rightNavHandler when clicking on navigation buttons', function () {
    const leftNavHandlerSpy = spy();
    const rightNavHandlerSpy = spy();
    const wrapper = shallow(
      <ExplainerNav
        leftNavigationText='some left text'
        rightNavigationText='some right text'
        leftNavHandler={ leftNavHandlerSpy }
        rightNavHandler={ rightNavHandlerSpy }
      />
    );

    wrapper.find('.left-nav').simulate('click');
    wrapper.find('.right-nav').simulate('click');

    leftNavHandlerSpy.calledOnce.should.be.true();
    rightNavHandlerSpy.calledOnce.should.be.true();
  });
});
