import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import HorizontalScrolling from 'components/common/horizontal-scrolling';
import * as GATracking from 'utils/google_analytics_tracking';


describe('<HorizontalScrolling />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<HorizontalScrolling trackingContentType=''/>);
    wrapper.should.be.ok();
  });

  it('should wrap children node', () => {
    const wrapper = shallow(
      <HorizontalScrolling trackingContentType=''>
        <div>Child 1</div>
        <div>Child 2</div>
      </HorizontalScrolling>
    );

    wrapper.find('.swiper-slide').should.have.length(2);
  });

  it('should track swiping action', () => {
    spy(GATracking, 'trackSwipeLanddingPageCarousel');

    const wrapper = mount(
      <HorizontalScrolling trackingContentType='contentType'>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </HorizontalScrolling>
    );
    const instance = wrapper.instance();

    wrapper.find('.swiper-slide').should.have.length(3);

    instance.swiper.slideNext();
    instance.swiper.slideNext();
    instance.swiper.slidePrev();

    GATracking.trackSwipeLanddingPageCarousel.callCount.should.equal(3);
    GATracking.trackSwipeLanddingPageCarousel.getCall(0).args.should.eql(['right', 'contentType']);
    GATracking.trackSwipeLanddingPageCarousel.getCall(1).args.should.eql(['right', 'contentType']);
    GATracking.trackSwipeLanddingPageCarousel.getCall(2).args.should.eql(['left', 'contentType']);

    GATracking.trackSwipeLanddingPageCarousel.restore();
  });
});
