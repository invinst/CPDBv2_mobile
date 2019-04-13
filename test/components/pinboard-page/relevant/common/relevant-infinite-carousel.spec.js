import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';
import HorizontalScrolling from 'components/common/horizontal-scrolling';


describe('<RelevantInfiniteCarousel />', function () {
  it('should render enough content', function () {
    const loadMoreStub = spy();
    const wrapper = shallow(
      <RelevantInfiniteCarousel
        childWidth={ 128 }
        title='RelevantInfiniteCarousel Title'
        hasMore={ true }
        loadMore={ loadMoreStub }
      >
        <div className='test--child-1'/>
        <div className='test--child-2'/>
      </RelevantInfiniteCarousel>
    );
    wrapper.find('.relevant-infinite-carousel-title').text().should.eql(
      'RelevantInfiniteCarousel Title'
    );
    wrapper.find('.relevant-infinite-carousel-tip').text().should.eql('<< Swipe for more');

    const carousel = wrapper.find(HorizontalScrolling);
    carousel.prop('hasMore').should.be.true();
    carousel.prop('loadMore').should.eql(loadMoreStub);
    carousel.prop('className').should.eql('relevant-infinite-horizontal-scrolling');
    carousel.prop('spaceBetween').should.eql(4);

    carousel.find('.test--child-1').exists().should.be.true();
    carousel.find('.test--child-2').exists().should.be.true();
  });
});
