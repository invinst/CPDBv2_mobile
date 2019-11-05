import React from 'react';

import { shallow, mount } from 'enzyme';
import { stub, spy } from 'sinon';
import ReactHeight from 'react-height';
import { noop } from 'lodash';

import * as NavigationUtil from 'utils/navigation-util';
import * as IntercomUtils from 'utils/intercom';
import SearchPage from 'components/search-page';
import SearchCategory from 'components/search-page/search-category';
import constants from 'constants';
import * as IntercomTracking from 'utils/intercom-tracking';

describe('<SearchPage />', function () {
  beforeEach(function () {
    stub(IntercomUtils, 'showIntercomLauncher');
  });

  afterEach(function () {
    IntercomUtils.showIntercomLauncher.restore();
  });

  it('should be renderable', function () {
    const wrapper = shallow(
      <SearchPage query={ '' }/>
    );
    wrapper.should.be.ok();
  });

  it('should render categories returned by getCategoriesWithSuggestions when it has query', function () {
    const dummyCategories = [
      {
        name: 'Any',
        id: 'any',
        path: 'ANY',
      },
    ];
    stub(SearchPage.prototype, 'getCategoriesWithSuggestions').callsFake( () => dummyCategories);

    const wrapper = shallow(
      <SearchPage
        query={ 'ab' }
        suggestAllFromCategory={ noop }
        any={ [] }
        inputChanged={ noop }
        activeCategory='any'
      />
    );

    const navbar = wrapper.find('SearchNavbar');
    navbar.prop('categories').should.equal(dummyCategories);
    navbar.prop('activeCategory').should.be.eql('any');
    navbar.prop('scrollToCategory').should.equal(wrapper.instance().scrollToCategory);

    SearchPage.prototype.getCategoriesWithSuggestions.restore();
  });

  describe('getCategoriesWithSuggestions', function () {
    it('should return defined categories with data from props', function () {
      const wrapper = shallow(
        <SearchPage
          query={ 'ab' }
          suggestAllFromCategory={ noop }
          officers={ [1] }
          undefined={ [1] }
          inputChanged={ noop }
        />
      );
      const instance = wrapper.instance();

      instance.getCategoriesWithSuggestions().should.eql([
        {
          id: 'officers',
          name: 'OFFICERS',
          path: 'OFFICER',
          filter: 'Officers',
          queryPrefix: 'officer',
        },
      ]);
    });
  });

  describe('scrollToCategory', function () {
    it('should call scrollToElement with a correct selector', function () {
      const stubScrollToElement = stub(NavigationUtil, 'scrollToElement');
      const wrapper = shallow(<SearchPage query={ '' } />);
      wrapper.instance().scrollToCategory('an-id');

      stubScrollToElement.calledWith('#search-category-an-id', '#search-page-header').should.be.true();
      stubScrollToElement.restore();
    });
  });

  describe('onInputChange', function () {
    it('should dispatch inputChanged action', function () {
      const dummyEvent = { currentTarget: { value: 'foo' } };
      const spyInputChanged = spy();
      const wrapper = shallow(
        <SearchPage
          query={ '' }
          inputChanged={ spyInputChanged }
          suggestTerm={ noop }
        />
      );
      const instance = wrapper.instance();

      instance.onInputChange(dummyEvent);

      spyInputChanged.calledWith('foo').should.be.true();
    });

    it('should call suggestTerm if query is of sufficient length', function () {
      const dummyEvent = { currentTarget: { value: 'foo' } };
      const spySuggestTerm = spy();
      const wrapper = mount(
        <SearchPage
          query={ '' }
          inputChanged={ noop }
          queryChanged={ noop }
          suggestTerm={ spySuggestTerm }
        />
      );
      const instance = wrapper.instance();

      instance.onInputChange(dummyEvent);

      wrapper.setProps({ query: 'foo' });

      spySuggestTerm.calledWith({ term: 'foo' }, undefined, '').should.be.true();
    });

    it('should NOT call suggestTerm if query is empty or too short', function () {
      const spySuggestTerm = spy();
      const wrapper = mount(
        <SearchPage
          query={ '' }
          inputChanged={ noop }
          queryChanged={ noop }
          suggestTerm={ spySuggestTerm }
        />
      );
      const instance = wrapper.instance();

      instance.onInputChange({ currentTarget: { value: '' } });
      wrapper.setProps({ query: '' });
      spySuggestTerm.called.should.be.false();

      instance.onInputChange({ currentTarget: { value: 'f' } });
      wrapper.setProps({ query: 'f' });
      spySuggestTerm.called.should.be.false();
    });
  });

  it('should call pushBreadcrumb when mounted and updating', function () {
    const pushBreadcrumbsSpy = spy();
    const wrapper = mount(
      <SearchPage
        pushBreadcrumbs={ pushBreadcrumbsSpy }
        queryChanged={ noop }
        location='location'
        routes='routes'
        params='params'
      />
    );
    pushBreadcrumbsSpy.calledWith({
      location: 'location',
      routes: 'routes',
      params: 'params',
    }).should.be.true();

    pushBreadcrumbsSpy.resetHistory();
    wrapper.setProps({ location: 'changed' });
    pushBreadcrumbsSpy.calledWith({
      location: 'changed',
      routes: 'routes',
      params: 'params',
    }).should.be.true();
  });

  it('should focus the input element when mounted', function () {
    const wrapper = shallow(<SearchPage queryChanged={ noop } />);
    const instance = wrapper.instance();
    const spyFocus = spy();


    instance.searchInput = {
      focus: spyFocus,
    };
    instance.componentDidMount();

    spyFocus.calledOnce.should.be.true();
  });

  describe('search <input>', function () {
    beforeEach(function () {
      this.stubOnInputChange = stub(SearchPage.prototype, 'onInputChange');
    });

    afterEach(function () {
      this.stubOnInputChange.restore();
    });

    it('should render query input component', function () {
      const spyInputChanged = spy();

      const wrapper = shallow(
        <SearchPage
          query={ 'meh' }
          inputChanged={ spyInputChanged }
        />
      );

      const queryInput = wrapper.find('.query-input');
      queryInput.prop('value').should.eql('meh');
      queryInput.prop('placeholder').should.eql('Officer name, badge number or date');
      queryInput.prop('spellCheck').should.eql(false);
      queryInput.prop('autoComplete').should.eql('off');
      queryInput.prop('autoCorrect').should.eql('off');
      queryInput.prop('autoCapitalize').should.eql('off');

      queryInput.prop('onChange')();
      this.stubOnInputChange.calledOnce.should.be.true();
    });

    it('should render recent SearchCategory when we have recent', function () {
      const wrapper = shallow(<SearchPage query={ 'j' } recent={ ['data'] }/>);

      const searchCategory = wrapper.find('SearchCategory');

      searchCategory.prop('categoryId').should.eql('recent');
      searchCategory.prop('title').should.eql('RECENT');
      searchCategory.prop('items').should.eql(['data']);
    });

    it('should set this.searchInput ref to its own instance', function () {
      const wrapper = mount(<SearchPage queryChanged={ noop } />);

      const refInstance = wrapper.instance().searchInput;
      (typeof refInstance).should.not.eql('undefined');
    });

    it('should change the search box with correct text if there is queryPrefix', function () {
      const wrapper = shallow(
        <SearchPage
          query={ 'jerome' }
          queryPrefix='officer'
        />
      );
      const clearableInput = wrapper.find('.query-input');
      clearableInput.prop('value').should.eql('officer:jerome');
    });
  });

  describe('updateLastCategoryHeight', function () {
    it('should run correctly', function () {
      const wrapper = shallow(
        <SearchPage />
      );
      const instance = wrapper.instance();
      const spyForceUpdate = spy(instance, 'forceUpdate');

      instance.updateLastCategoryHeight(1);

      instance.lastCategoryHeight.should.eql(1);
      spyForceUpdate.called.should.be.true();

      spyForceUpdate.restore();
    });
  });

  describe('calculateDynamicBottomPaddingStyle', function () {
    it('should return correct height when there is no last category', function () {
      const wrapper = shallow(
        <SearchPage />
      );
      const instance = wrapper.instance();
      instance.lastCategoryHeight = null;

      const result = instance.calculateDynamicBottomPaddingStyle();
      const dynamicBottomPaddingOffset = (
        constants.QUERY_INPUT_HEIGHT +
        constants.SEARCH_CATEGORY_LINKS_HEIGHT +
        2 * constants.NEW_DIVIDER_WEIGHT
      );
      const height = `${window.innerHeight - dynamicBottomPaddingOffset}px`;

      result.should.eql({
        height,
      });
    });

    it('should return correct height when there is category', function () {
      const wrapper = shallow(
        <SearchPage />
      );
      const instance = wrapper.instance();
      instance.lastCategoryHeight = 1;

      const result = instance.calculateDynamicBottomPaddingStyle();
      const dynamicBottomPaddingOffset = (
        constants.QUERY_INPUT_HEIGHT +
        constants.SEARCH_CATEGORY_LINKS_HEIGHT +
        2 * constants.NEW_DIVIDER_WEIGHT +
        1
      );
      const height = `${window.innerHeight - dynamicBottomPaddingOffset}px`;

      result.should.eql({
        height,
      });
    });

    it('should return minimum height when lastCategoryHeight is sufficiently large', function () {
      const wrapper = shallow(
        <SearchPage />
      );
      const instance = wrapper.instance();
      instance.lastCategoryHeight = 9999;

      const result = instance.calculateDynamicBottomPaddingStyle();

      result.should.eql({
        height: '133px',
      });
    });
  });

  describe('renderCategories()', function () {
    beforeEach(function () {
      stub(SearchPage.prototype.updateLastCategoryHeight, 'bind');
      SearchPage.prototype.updateLastCategoryHeight.bind.returns(SearchPage.prototype.updateLastCategoryHeight);
    });

    afterEach(function () {
      SearchPage.prototype.updateLastCategoryHeight.bind.restore();
    });

    it('should render SearchCategory components', function () {
      const officersProp = ['data'];
      const unitsProp = ['data'];

      const wrapper = shallow(
        <SearchPage
          saveToRecent={ noop }
          query='qa'
          officers={ officersProp }
          units={ unitsProp }
          suggestAllFromCategory={ noop }/>
      );

      const categoryDetails = wrapper.find('.category-details-container').children();

      categoryDetails.length.should.eql(2);
      categoryDetails.at(0).childAt(0).type().should.be.eql(SearchCategory);

      // Last component should be wrapped inside ReactHeight:
      const lastCategory = categoryDetails.at(1);
      lastCategory.type().should.be.eql(ReactHeight);
      lastCategory.prop('onHeightReady').should.be.eql(SearchPage.prototype.updateLastCategoryHeight);
    });

    it('should pass correct allButtonClickHandler prop to SearchCategory', function () {
      const stubBoundCallback = stub(SearchPage.prototype.chooseCategory, 'bind');
      stubBoundCallback.returns(SearchPage.prototype.chooseCategory);

      const officersProp = ['data'];
      const unitsProp = ['data'];

      const wrapper = shallow(
        <SearchPage
          saveToRecent={ noop }
          query='qa'
          officers={ officersProp }
          units={ unitsProp }
          suggestAllFromCategory={ noop }/>
      );

      const searchCategory = wrapper.find(SearchCategory).at(0);
      searchCategory.prop('allButtonClickHandler').should.eql(SearchPage.prototype.chooseCategory);

      stubBoundCallback.restore();
    });
  });

  describe('chooseCategory', function () {
    it('should call suggestAllFromCategory & updateChosenCategory with correct args', function () {
      const suggestAllFromCategory = spy();
      const updateChosenCategory = spy();

      const wrapper = shallow(
        <SearchPage
          query='wa'
          suggestAllFromCategory={ suggestAllFromCategory }
          updateChosenCategory={ updateChosenCategory }
        />
      );

      wrapper.instance().chooseCategory({
        path: 'mypath',
        id: 'myid',
      });

      suggestAllFromCategory.calledWith('mypath', 'wa').should.be.true();
      updateChosenCategory.calledWith('myid').should.be.true();
    });
  });

  describe('"view single category" mode', function () {
    it('should only display search results of the chosen single category', function () {
      const crsProp = ['data'];
      const officersProp = ['data'];

      const wrapper = shallow(
        <SearchPage
          query='qa'
          officers={ officersProp }
          crs={ crsProp }
          chosenCategory='crs'
        />
      );

      const searchCategories = wrapper.find('SearchCategory');
      searchCategories.should.have.length(1);
    });
  });

  describe('Intercom', function () {
    describe('Intercom launcher', function () {
      it('should hide intercom launcher when mounted', function () {
        mount(<SearchPage queryChanged={ noop }/>);

        IntercomUtils.showIntercomLauncher.calledWith(false).should.be.true();
      });

      it('should show intercom launcher again when unmounted', function () {
        const wrapper = mount(<SearchPage queryChanged={ noop }/>);
        wrapper.unmount();

        IntercomUtils.showIntercomLauncher.calledWith(true).should.be.true();
      });
    });

    describe('Intercom tracking', function () {
      beforeEach(function () {
        stub(IntercomTracking, 'trackSearchPage');
      });

      afterEach(function () {
        IntercomTracking.trackSearchPage.restore();
      });

      it('should track Intercom with search page', function () {
        mount(<SearchPage queryChanged={ noop }/>);
        IntercomTracking.trackSearchPage.called.should.be.true();
      });
    });
  });

  describe('render back to search link', function () {
    beforeEach(function () {
      this.stubInstantScrollToTop = stub(NavigationUtil, 'instantScrollToTop');
    });

    afterEach(function () {
      this.stubInstantScrollToTop.restore();
    });

    it('should call clearChosenCategory and scroll to top on click', function () {
      const updateChosenCategorySpy = spy();

      const wrapper = mount(
        <SearchPage queryChanged={ noop } chosenCategory='OFFICER' updateChosenCategory={ updateChosenCategorySpy } />
      );

      const backToSearchLink = wrapper.find('.back-to-full-search-link');
      backToSearchLink.simulate('click');
      updateChosenCategorySpy.calledWith('').should.be.true();
      this.stubInstantScrollToTop.should.be.called();
    });

    it('should render correctly', function () {
      const wrapper = mount(
        <SearchPage queryChanged={ noop } chosenCategory='' />
      );

      wrapper.find('.back-to-full-search-link').exists().should.be.false();
    });
  });
});
