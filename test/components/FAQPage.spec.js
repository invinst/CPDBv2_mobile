import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import FAQPage from 'components/FAQPage';

describe('<FAQPage />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(
      <FAQPage pagination={ { loaded: true } } />
    );
    wrapper.should.be.ok();
  });

  it('should call loadMore on mount if not loaded', () => {
    const loadMoreProp = spy();
    shallow(
      <FAQPage pagination={ { loaded: false } } loadMore={ loadMoreProp } />
    );

    loadMoreProp.called.should.be.true();
  });

  it('should render null if data is not loaded', () => {
    const wrapper = shallow(
      <FAQPage pagination={ { loaded: false } } loadMore={ () => {} }/>
    );

    should(wrapper.type()).equal(null);
  });

  it('should render the page\'s layout if data is loaded', () => {
    const wrapper = shallow(
      <FAQPage pagination={ { loaded: true } } loadMore={ () => {} }/>
    );

    wrapper.find('.sheet-header').text().should.equal('FAQ');
    wrapper.find('.sheet-body').find('InfiniteScroll').exists().should.be.true();
  });

  it('should render FAQ items if data is not empty', () => {
    const faqs = [
      {
        id: 1,
        question: ['What is FAQ?']
      }
    ];
    const wrapper = shallow(
      <FAQPage pagination={ { faqs: faqs } } loadMore={ () => {} }/>
    );

    const faqItems = wrapper.find('.sheet-body').find('InfiniteScroll').children();
    faqItems.length.should.equal(1);

    const item = faqItems.at(0);
    item.find('.question').text().should.eql('What is FAQ?');
  });

  it('should render a FAQ title only if it has children', () => {
    const wrapper = shallow(
      <FAQPage pagination={ { loaded: true } }>
        <hr />
      </FAQPage>
    );

    wrapper.equals(<div>FAQ</div>).should.be.true();
  });

  it('should render InfiniteScroll with correct props', () => {
    const loadMoreProp = spy();
    const hasMoreProp = true;
    const nextParamsProps = {};
    const paginationProp = { loaded: true };

    const wrapper = shallow(
      <FAQPage
        pagination={ paginationProp }
        loadMore={ loadMoreProp }
        hasMore={ hasMoreProp }
        nextParams={ nextParamsProps } />
    );

    const infiniteScroll = wrapper.find('InfiniteScroll');
    infiniteScroll.prop('hasMore').should.be.equal(hasMoreProp);
    infiniteScroll.prop('useWindow').should.be.false();

    infiniteScroll.prop('loadMore')();
    loadMoreProp.called.should.be.true();
  });
});
