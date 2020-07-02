import should from 'should';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';
import * as NavigationUtil from 'utils/navigation-util';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { mountWithRouter } from 'utils/tests';
import { QUERY_INPUT_HEIGHT, SEARCH_CATEGORY_LINKS_HEIGHT, NEW_DIVIDER_WEIGHT } from 'constants';
import SearchCategory from 'components/search-page/search-category';
import SearchResult from 'components/search-page/search-result';
import RecentItems from 'components/search-page/recent-items';


const fixedHeaderHeight = (
  QUERY_INPUT_HEIGHT + SEARCH_CATEGORY_LINKS_HEIGHT + 2 * NEW_DIVIDER_WEIGHT
);

describe('<SearchCategory />', function () {
  it('should be renderable', function () {
    const wrapper = shallow(
      <SearchCategory
        title='foo'
        items={ [] }
        categoryId='crs'
      />
    );
    wrapper.should.be.ok();
  });

  it('should add scroll listener when mounted', function () {
    const wrapper = shallow(
      <SearchCategory
        title='foo'
        categoryId='crs'
      />
    );
    const instance = wrapper.instance();

    const stubAddEventListener = stub(window, 'addEventListener');
    stub(instance.watchActiveState, 'bind').returns(instance.watchActiveState);

    instance.componentDidMount();

    stubAddEventListener.calledWith('scroll', instance.watchActiveState).should.be.true();
  });

  it('should define function to remove scroll listener', function () {
    const wrapper = shallow(
      <SearchCategory
        title='foo'
        items={ [] }
        categoryId='crs'
      />
    );
    const instance = wrapper.instance();

    stub(window, 'addEventListener');
    const stubRemoveEventListener = stub(window, 'removeEventListener');
    stub(instance.watchActiveState, 'bind').returns(instance.watchActiveState);

    instance.componentDidMount();

    (typeof instance.unwatchActiveState).should.be.eql('function');

    instance.unwatchActiveState();

    stubRemoveEventListener.calledWith('scroll', instance.watchActiveState).should.be.true();
  });

  it('should unwatch active state when unmounted', function () {
    const wrapper = shallow(
      <SearchCategory
        title='foo'
        items={ [] }
        categoryId='crs'
      />
    );
    const instance = wrapper.instance();

    const spyUnwatchActiveState = spy();
    instance.unwatchActiveState = spyUnwatchActiveState;


    instance.componentWillUnmount();
    spyUnwatchActiveState.calledWith().should.be.true();
  });

  it('should render title', function () {
    const wrapper = shallow(
      <SearchCategory
        title='foo'
        items={ [] }
        categoryId='crs'
      />
    );

    const title = wrapper.find('.title').first();
    title.text().should.eql('foo');
  });

  describe('render recent', function () {
    it('should render item correctly', function () {
      const items = [{
        url: 'localhost',
        type: 'recent',
        title: 'Whatever',
      }];

      const wrapper = mount(
        <SearchCategory
          items={ items }
          categoryId='recent'
        />
      );
      const itemLink = wrapper.find(RecentItems);

      itemLink.exists().should.be.true();
      itemLink.prop('items').should.be.eql(items);
    });
  });

  describe('renderAllButton', function () {
    beforeEach(function () {
      this.stubRenderFunc = stub(SearchCategory.prototype, 'renderResults');
      this.stubRenderFunc.returns((item) => item);
      this.stubInstantScrollToTop = stub(NavigationUtil, 'instantScrollToTop');
    });

    it('should render correctly', function () {
      const items = new Array(11);
      const wrapper = mount(
        <SearchCategory
          items={ items }
          showAllButton={ true }
        />
      );

      const showAllButton = wrapper.find('.all');

      showAllButton.exists().should.be.true();
      showAllButton.text().should.eql('ALL');
    });

    it('should call allButtonClickHandler() and scroll to top on click', function () {
      const spyAllButtonClickHandler = spy();
      const spyGetSuggestionWithContentType = stub().returns({ catch: spy() });

      const wrapper = mount(
        <SearchCategory
          items={ [] }
          showAllButton={ true }
          allButtonClickHandler={ spyAllButtonClickHandler }
          getSuggestionWithContentType={ spyGetSuggestionWithContentType }
          query='qa'
          categoryPath='OFFICER'
        />
      );

      const allButton = wrapper.find('.all');
      allButton.simulate('click');

      spyAllButtonClickHandler.should.be.calledOnce();
      spyGetSuggestionWithContentType.should.be.calledOnce();
      spyGetSuggestionWithContentType.should.be.calledWith('qa', { contentType: 'OFFICER' });
      this.stubInstantScrollToTop.should.be.calledOnce();
    });
  });

  describe('renderResults', function () {
    let store;
    beforeEach(function () {
      store = MockStore()({
        pinboardIntroduction: {
          isPinButtonIntroductionVisited: true,
        },
      });
    });

    it('should render ResultComponent with correct props', function () {
      const spyGetSuggestionWithContentType = spy();

      const wrapper = shallow(
        <SearchCategory
          title='OFFICERS'
          items={ [{ id: '1234' }, { id: '5678' }] }
          categoryId='officers'
          getSuggestionWithContentType={ spyGetSuggestionWithContentType }
          query={ 'qa' }
          nextParams={ {
            contentType: 'OFFICER',
            limit: '30',
            offset: '60',
            term: '123',
          } }
          hasMore={ true }
        />
      );
      const searchResult = wrapper.find(SearchResult);
      searchResult.prop('items').should.eql([{ id: '1234' }, { id: '5678' }]);
      searchResult.prop('getSuggestionWithContentType').should.eql(spyGetSuggestionWithContentType);
      searchResult.prop('query').should.equal('qa');
      searchResult.prop('nextParams').should.eql({
        contentType: 'OFFICER',
        limit: '30',
        offset: '60',
        term: '123',
      });
      searchResult.prop('hasMore').should.be.true();
    });

    it('should return null if given invalid category id', function () {

      const wrapper = shallow(
        <SearchCategory
          items={ [] }
          categoryId='invalid'
        />
      );

      const result = wrapper.instance().renderResults();
      should.equal(result, null);
    });

    it('should render officer correctly', function () {
      const officers = [
        {
          name: 'John',
          url: '/officer/1/john/',
          badge: 'Badge #1',
          percentile: {},
        },
        {
          name: 'Snow',
          url: '/officer/2/snow/',
          badge: 'Badge #2',
          percentile: {},
        },
      ];

      const wrapper = mountWithRouter(
        <Provider store={ store }>
          <SearchCategory
            items={ officers }
            categoryId='officers'
          />
        </Provider>
      );

      const searchElement = wrapper.find(SearchResult);
      searchElement.exists().should.be.true();
      searchElement.prop('items').should.be.eql(officers);

    });

    it('should render crs with cr component', function () {
      const crs = [
        {
          crid: '1',
          url: '/complaint/1',
        },
        {
          crid: '2',
          url: '/complaint/2',
        },
      ];

      const wrapper = mountWithRouter(
        <Provider store={ store }>
          <SearchCategory
            items={ crs }
            categoryId='crs'
          />
        </Provider>
      );

      const searchElement = wrapper.find(SearchResult);
      searchElement.exists().should.be.true();
      searchElement.prop('items').should.be.eql(crs);
    });

    it('should render trrs with trr component', function () {
      const trrs = [
        {
          id: '1',
          url: '/trr/1',
        },
        {
          id: '2',
          url: '/trr/2',
        },
      ];

      const wrapper = mountWithRouter(
        <Provider store={ store }>
          <SearchCategory
            items={ trrs }
            categoryId='trrs'
          />
        </Provider>
      );

      const searchElement = wrapper.find(SearchResult);
      searchElement.exists().should.be.true();
      searchElement.prop('items').should.be.eql(trrs);
    });

    it('should render dateCRs with cr component', function () {
      const dateCRs = [
        {
          crid: '1',
          url: '/complaint/1',
        },
        {
          crid: '2',
          url: '/complaint/2',
        },
      ];

      const wrapper = mountWithRouter(
        <Provider store={ store }>
          <SearchCategory
            items={ dateCRs }
            categoryId='dateCRs'
          />
        </Provider>
      );

      const searchElement = wrapper.find(SearchResult);
      searchElement.exists().should.be.true();
      searchElement.prop('items').should.be.eql(dateCRs);
    });

    it('should render dateTRRs with trr component', function () {
      const dateTRRs = [
        {
          id: '1',
          url: '/trr/1',
        },
        {
          id: '2',
          url: '/trr/2',
        },
      ];

      const wrapper = mountWithRouter(
        <Provider store={ store }>
          <SearchCategory
            items={ dateTRRs }
            categoryId='dateTRRs'
          />
        </Provider>
      );

      const searchElement = wrapper.find(SearchResult);
      searchElement.exists().should.be.true();
      searchElement.prop('items').should.be.eql(dateTRRs);
    });

    it('should render dateOfficers with officer component', function () {
      const officers = [
        {
          name: 'Jerome Finnigan',
          url: '/officer/1',
          badge: 'Badge #1',
          percentile: {},
        },
        {
          name: 'Edward May',
          url: '/officer/2',
          badge: 'Badge #2',
          percentile: {},
        },
      ];

      const wrapper = mountWithRouter(
        <Provider store={ store }>
          <SearchCategory
            items={ officers }
            categoryId='dateOfficers'
          />
        </Provider>
      );

      const searchElement = wrapper.find(SearchResult);
      searchElement.exists().should.be.true();
      searchElement.prop('items').should.be.eql(officers);
    });
  });

  describe('watchActiveState', function () {
    beforeEach(function () {
      this.stubGetCurrentScrollPosition = stub(NavigationUtil, 'getCurrentScrollPosition');
      this.stubGetCurrentScrollPosition.returns(900);
    });

    it('should not do anything if category is already active', function () {
      const spyUpdateActiveCategory = spy();
      const wrapper = shallow(
        <SearchCategory
          title='foo'
          items={ [] }
          activeCategory='crs'
          categoryId='crs'
          updateActiveCategory={ spyUpdateActiveCategory }
        />
      );
      const instance = wrapper.instance();

      instance.watchActiveState();

      this.stubGetCurrentScrollPosition.called.should.be.false();
      spyUpdateActiveCategory.called.should.be.false();
    });

    it('should not set active if category is above header bottom', function () {
      const spyUpdateActiveCategory = spy();
      const wrapper = shallow(
        <SearchCategory
          title='foo'
          items={ [] }
          activeCategory='units'
          categoryId='crs'
          updateActiveCategory={ spyUpdateActiveCategory }
        />
      );
      const instance = wrapper.instance();
      instance.domNode = {
        offsetTop: 100,
        clientHeight: 200,
      };

      instance.watchActiveState();

      spyUpdateActiveCategory.called.should.be.false();
    });

    it('should not set active if category is below header bottom', function () {
      const spyUpdateActiveCategory = spy();
      const wrapper = shallow(
        <SearchCategory
          title='foo'
          items={ [] }
          activeCategory='units'
          categoryId='crs'
          updateActiveCategory={ spyUpdateActiveCategory }
        />
      );
      const instance = wrapper.instance();
      instance.domNode = {
        offsetTop: 900 + fixedHeaderHeight + 1,
      };

      instance.watchActiveState();

      spyUpdateActiveCategory.called.should.be.false();
    });

    it('should set active if category has touched header bottom', function () {
      const spyUpdateActiveCategory = spy();
      const wrapper = shallow(
        <SearchCategory
          title='foo'
          items={ [] }
          activeCategory='units'
          categoryId='crs'
          updateActiveCategory={ spyUpdateActiveCategory }
        />
      );
      const instance = wrapper.instance();
      instance.domNode = {
        offsetTop: 900,
        clientHeight: fixedHeaderHeight + 1,
      };

      instance.watchActiveState();

      spyUpdateActiveCategory.calledWith('crs').should.be.true();
    });
  });

});
