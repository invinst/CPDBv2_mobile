import should from 'should';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub, spy } from 'sinon';
import { range } from 'lodash';
import * as NavigationUtil from 'utils/navigation-util';

import constants from 'constants';
import SearchCategory from 'components/search-page/search-category';
import SuggestedSearchResult from 'components/search-page/suggested-search-result';
import SearchResult from 'components/search-page/search-result';
import RecentItems from 'components/search-page/recent-items';


const fixedHeaderHeight = (
  constants.QUERY_INPUT_HEIGHT + constants.SEARCH_CATEGORY_LINKS_HEIGHT + 2 * constants.NEW_DIVIDER_WEIGHT
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
    const stubWatchActiveStateBind = stub(instance.watchActiveState, 'bind').returns(instance.watchActiveState);

    instance.componentDidMount();

    stubAddEventListener.calledWith('scroll', instance.watchActiveState).should.be.true();

    stubAddEventListener.restore();
    stubWatchActiveStateBind.restore();
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

    const stubAddEventListener = stub(window, 'addEventListener');
    const stubRemoveEventListener = stub(window, 'removeEventListener');
    const stubWatchActiveStateBind = stub(instance.watchActiveState, 'bind').returns(instance.watchActiveState);

    instance.componentDidMount();

    (typeof instance.unwatchActiveState).should.be.eql('function');

    instance.unwatchActiveState();

    stubRemoveEventListener.calledWith('scroll', instance.watchActiveState).should.be.true();

    stubAddEventListener.restore();
    stubRemoveEventListener.restore();
    stubWatchActiveStateBind.restore();
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

  describe('renderSuggested', function () {
    it('should render item correctly', function () {
      const spySaveToRecent = spy();
      const items = [{
        url: 'localhost',
        type: 'suggested',
        title: 'Whatever',
      }];

      const wrapper = mount(
        <SearchCategory
          items={ items }
          categoryId='suggested'
          saveToRecent={ spySaveToRecent }
        />
      );
      const itemLink = wrapper.find(SuggestedSearchResult);

      itemLink.exists().should.be.true();
      itemLink.prop('items').should.be.eql(items);
      itemLink.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });
  });

  describe('renderRecent', function () {
    it('should render item correctly', function () {
      const spySaveToRecent = spy();
      const items = [{
        url: 'localhost',
        type: 'recent',
        title: 'Whatever',
      }];

      const wrapper = mount(
        <SearchCategory
          items={ items }
          categoryId='recent'
          saveToRecent={ spySaveToRecent }
        />
      );
      const itemLink = wrapper.find(RecentItems);

      itemLink.exists().should.be.true();
      itemLink.prop('items').should.be.eql(items);
      itemLink.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });
  });

  describe('renderAllButton', function () {
    beforeEach(function () {
      this.stubRenderFunc = stub(SearchCategory.prototype, 'renderResults');
      this.stubRenderFunc.returns((item) => item);
      this.stubInstantScrollToTop = stub(NavigationUtil, 'instantScrollToTop');
    });

    afterEach(function () {
      this.stubRenderFunc.restore();
      this.stubInstantScrollToTop.restore();
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
    it('should render ResultComponent with correct props', function () {
      const spyAddOrRemoveItemInPinboard = spy();
      const spyGetSuggestionWithContentType = spy();
      const spySaveToRecent = spy();

      const wrapper = shallow(
        <SearchCategory
          title='OFFICERS'
          items={ [{ id: '1234' }, { id: '5678' }] }
          categoryId='officers'
          addOrRemoveItemInPinboard={ spyAddOrRemoveItemInPinboard }
          getSuggestionWithContentType={ spyGetSuggestionWithContentType }
          saveToRecent={ spySaveToRecent }
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
      searchResult.prop('saveToRecent').should.eql(spySaveToRecent);
      searchResult.prop('addOrRemoveItemInPinboard').should.eql(spyAddOrRemoveItemInPinboard);
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

    it('should return only the first 5 items if not in single category mode', function () {
      const items = range(11);
      const wrapper = shallow(
        <SearchCategory
          items={ items }
          categoryId='officers'
          showAllButton={ true }
        />
      );

      const searchResult = wrapper.find(SearchResult);
      searchResult.prop('items').should.eql(range(5));
    });

    it('should render officer correctly', function () {
      const spySaveToRecent = spy();
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

      const wrapper = mount(
        <SearchCategory
          items={ officers }
          categoryId='officers'
          saveToRecent={ spySaveToRecent }
        />
      );

      const searchElement = wrapper.find(SearchResult);
      searchElement.exists().should.be.true();
      searchElement.prop('items').should.be.eql(officers);
      searchElement.prop('saveToRecent').should.be.eql(spySaveToRecent);

    });

    it('should render crs with cr component', function () {
      const spySaveToRecent = spy();
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

      const wrapper = mount(
        <SearchCategory
          items={ crs }
          categoryId='crs'
          saveToRecent={ spySaveToRecent }
        />
      );

      const searchElement = wrapper.find(SearchResult);
      searchElement.exists().should.be.true();
      searchElement.prop('items').should.be.eql(crs);
      searchElement.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });

    it('should render trrs with trr component', function () {
      const spySaveToRecent = spy();
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

      const wrapper = mount(
        <SearchCategory
          items={ trrs }
          categoryId='trrs'
          saveToRecent={ spySaveToRecent }
        />
      );

      const searchElement = wrapper.find(SearchResult);
      searchElement.exists().should.be.true();
      searchElement.prop('items').should.be.eql(trrs);
      searchElement.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });

    it('should render dateCRs with cr component', function () {
      const spySaveToRecent = spy();
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

      const wrapper = mount(
        <SearchCategory
          items={ dateCRs }
          categoryId='dateCRs'
          saveToRecent={ spySaveToRecent }
        />
      );

      const searchElement = wrapper.find(SearchResult);
      searchElement.exists().should.be.true();
      searchElement.prop('items').should.be.eql(dateCRs);
      searchElement.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });

    it('should render dateTRRs with trr component', function () {
      const spySaveToRecent = spy();
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

      const wrapper = mount(
        <SearchCategory
          items={ dateTRRs }
          categoryId='dateTRRs'
          saveToRecent={ spySaveToRecent }
        />
      );

      const searchElement = wrapper.find(SearchResult);
      searchElement.exists().should.be.true();
      searchElement.prop('items').should.be.eql(dateTRRs);
      searchElement.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });

    it('should render dateOfficers with officer component', function () {
      const spySaveToRecent = spy();
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

      const wrapper = mount(
        <SearchCategory
          items={ officers }
          categoryId='dateOfficers'
          saveToRecent={ spySaveToRecent }
        />
      );

      const searchElement = wrapper.find(SearchResult);
      searchElement.exists().should.be.true();
      searchElement.prop('items').should.be.eql(officers);
      searchElement.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });
  });

  describe('watchActiveState', function () {
    beforeEach(function () {
      this.stubGetCurrentScrollPosition = stub(NavigationUtil, 'getCurrentScrollPosition');
      this.stubGetCurrentScrollPosition.returns(900);
    });

    afterEach(function () {
      this.stubGetCurrentScrollPosition.restore();
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
