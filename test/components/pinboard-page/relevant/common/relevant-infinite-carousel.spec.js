import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';
import HorizontalScrolling from 'components/common/horizontal-scrolling';
import LoadingSpinner from 'components/common/loading-spinner';


describe('<RelevantInfiniteCarousel />', function () {
  it('should render enough content', function () {
    const loadMoreStub = sinon.spy();
    const wrapper = shallow(
      <RelevantInfiniteCarousel
        childWidth={ 128 }
        title='RelevantInfiniteCarousel Title'
        hasMore={ true }
        loadMore={ loadMoreStub }
        requesting={ false }
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

  it('should render nothing if there is no child and not requesting', function () {
    const loadMoreStub = sinon.spy();
    const wrapper = shallow(
      <RelevantInfiniteCarousel
        childWidth={ 128 }
        title='RelevantInfiniteCarousel Title'
        hasMore={ true }
        loadMore={ loadMoreStub }
        requesting={ false }
      />
    );

    wrapper.find('div').should.have.length(0);
  });

  it('should render LoadingSpinner if there is no child and questing is true', function () {
    const loadMoreStub = sinon.stub();
    const wrapper = shallow(
      <RelevantInfiniteCarousel
        childWidth={ 128 }
        title='RelevantInfiniteCarousel Title'
        hasMore={ true }
        loadMore={ loadMoreStub }
        requesting={ true }
      />
    );

    const loadingSpinner = wrapper.find(LoadingSpinner);
    loadingSpinner.prop('className').should.containEql('relevant-carousel-loading');
    loadingSpinner.prop('fill').should.equal('white');
  });
});
