import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import HorizontalScrolling from 'components/common/horizontal-scrolling';
import * as tracking from 'utils/tracking';


describe('<HorizontalScrolling />', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<HorizontalScrolling trackingContentType=''/>);
    wrapper.should.be.ok();
  });

  it('should wrap children node', function () {
    const wrapper = shallow(
      <HorizontalScrolling trackingContentType=''>
        <div>Child 1</div>
        <div>Child 2</div>
      </HorizontalScrolling>
    );

    wrapper.find('.swiper-slide').should.have.length(2);
  });

  it('should track swiping action', function () {
    spy(tracking, 'trackSwipeLandingPageCarousel');

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

    tracking.trackSwipeLandingPageCarousel.callCount.should.equal(3);
    tracking.trackSwipeLandingPageCarousel.getCall(0).args.should.eql(['right', 'contentType']);
    tracking.trackSwipeLandingPageCarousel.getCall(1).args.should.eql(['right', 'contentType']);
    tracking.trackSwipeLandingPageCarousel.getCall(2).args.should.eql(['left', 'contentType']);

    tracking.trackSwipeLandingPageCarousel.restore();
  });

  it('should loadMore when almost reaching the end', function () {
    const loadMoreSpy = spy();
    const wrapper = mount(
      <HorizontalScrolling trackingContentType='contentType' hasMore={ true } loadMore={ loadMoreSpy }>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </HorizontalScrolling>
    );

    const instance = wrapper.instance();
    instance.onSnapIndexChange(1, false);

    loadMoreSpy.should.be.called();
  });

  it('should loadMore when reaching the end', function () {
    const loadMoreSpy = spy();
    const wrapper = mount(
      <HorizontalScrolling trackingContentType='contentType' hasMore={ true } loadMore={ loadMoreSpy }>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </HorizontalScrolling>
    );

    const instance = wrapper.instance();
    instance.onSnapIndexChange(0, true);

    loadMoreSpy.should.be.called();
  });
});
