import React from 'react';

import { shallow, mount } from 'enzyme';
import { stub, spy } from 'sinon';
import ReactHeight from 'react-height';
import { Promise } from 'es6-promise';
import { browserHistory } from 'react-router';

import * as IntercomUtils from 'utils/intercom';
import SearchPage from 'components/search-page';
import SearchCategory from 'components/search-page/search-category';
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
      <SearchPage />
    );
    wrapper.should.be.ok();
  });

  describe('componentDidMount', function () {
    it('should call pushBreadcrumb when mounted', function () {
      const pushBreadcrumbsSpy = spy();
      mount(
        <SearchPage
          pushBreadcrumbs={ pushBreadcrumbsSpy }
          location='location'
          routes='routes'
          params='params'
          recent={ { data: [] } }
        />
      );
      pushBreadcrumbsSpy.calledWith({
        location: 'location',
        routes: 'routes',
        params: 'params',
      }).should.be.true();
    });

    it('should focus the input element when mounted', function () {
      const wrapper = shallow(<SearchPage recent={ { data: [] } } />);
      const instance = wrapper.instance();
      const spyFocus = spy();


      instance.searchInput = {
        inputElement: {
          focus: spyFocus,
        },
      };
      instance.componentDidMount();

      spyFocus.calledOnce.should.be.true();
    });

    describe('fetchRecentSearchItems', function () {
      it('should be called if recentSuggestionIds is not empty and recentSuggestionsRequested is false', function () {
        const fetchRecentSearchItemsSpy = spy();
        const recentSuggestionIds = {
          officerIds: [8562],
          crids: ['123456'],
          trrIds: [456789],
        };
        mount(
          <SearchPage
            recentSuggestionIds={ recentSuggestionIds }
            fetchRecentSearchItems={ fetchRecentSearchItemsSpy }
            recentSuggestionsRequested={ false }
          />
        );

        fetchRecentSearchItemsSpy.should.be.calledWith(
          [8562],
          ['123456'],
          [456789],
        );
      });

      it('should not be called if recentSuggestionIds is empty', function () {
        const fetchRecentSearchItemsSpy = spy();
        mount(
          <SearchPage
            recentSuggestionIds={ {} }
            fetchRecentSearchItems={ fetchRecentSearchItemsSpy }
            recentSuggestionsRequested={ false }
          />
        );

        fetchRecentSearchItemsSpy.should.not.be.called();
      });

      it('should not be called if recentSuggestionsRequested is true', function () {
        const fetchRecentSearchItemsSpy = spy();
        const recentSuggestionIds = {
          officerIds: [8562],
          crids: ['123456'],
          trrIds: [456789],
        };
        mount(
          <SearchPage
            recentSuggestionIds={ recentSuggestionIds }
            fetchRecentSearchItems={ fetchRecentSearchItemsSpy }
            recentSuggestionsRequested={ true }
          />
        );

        fetchRecentSearchItemsSpy.should.not.be.called();
      });
    });

    describe('fetchedEmptyRecentSearchItems', function () {
      it('should be called if recentSuggestionsRequested is false and recentSuggestionIds is empty', function () {
        const fetchedEmptyRecentSearchItemsSpy = spy();
        mount(
          <SearchPage
            recentSuggestionIds={ {} }
            fetchedEmptyRecentSearchItems={ fetchedEmptyRecentSearchItemsSpy }
            recentSuggestionsRequested={ false }
          />
        );
        fetchedEmptyRecentSearchItemsSpy.should.be.called();
      });
    });
  });

  describe('getCategoriesWithSuggestions', function () {
    it('should return defined categories with data from props', function () {
      const wrapper = shallow(
        <SearchPage
          query={ 'ab' }
          officers={ { data: [1] } }
          undefined={ { data: [1] } }
        />
      );
      const instance = wrapper.instance();

      instance.getCategoriesWithSuggestions().should.eql([
        {
          id: 'officers',
          name: 'OFFICERS',
          path: 'OFFICER',
          filter: 'Officers',
        },
      ]);
    });
  });

  describe('onInputChange', function () {
    it('should dispatch inputChanged action', function () {
      const dummyEvent = { currentTarget: { value: 'foo' } };
      const spyInputChanged = spy();
      const wrapper = shallow(
        <SearchPage
          inputChanged={ spyInputChanged }
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
          suggestTerm={ spySuggestTerm }
          recent={ { data: [] } }
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
          suggestTerm={ spySuggestTerm }
          recent={ { data: [] } }
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

  describe('<ClearableInput>', function () {
    beforeEach(function () {
      this.stubOnInputChange = stub(SearchPage.prototype, 'onInputChange');
    });

    afterEach(function () {
      this.stubOnInputChange.restore();
    });

    it('should render ClearableInput component', function () {
      const spyInputChanged = spy();

      const wrapper = shallow(
        <SearchPage
          query={ 'meh' }
          inputChanged={ spyInputChanged }
        />
      );

      const clearableInput = wrapper.find('ClearableInput');
      clearableInput.prop('value').should.eql('meh');
      clearableInput.prop('placeholder').should.eql('Officer name, badge number or date');
      clearableInput.prop('spellCheck').should.eql(false);
      clearableInput.prop('autoComplete').should.eql('off');
      clearableInput.prop('autoCorrect').should.eql('off');
      clearableInput.prop('autoCapitalize').should.eql('off');

      clearableInput.prop('onChange')();
      this.stubOnInputChange.calledOnce.should.be.true();

      clearableInput.prop('onClear')();
      spyInputChanged.calledWith('').should.be.true();
    });

    it('should set this.searchInput ref to its own instance', function () {
      const wrapper = mount(<SearchPage recent={ { data: [] } }/>);

      const refInstance = wrapper.instance().searchInput;
      (typeof refInstance).should.not.eql('undefined');
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

  describe('renderCategories()', function () {
    beforeEach(function () {
      stub(SearchPage.prototype.updateLastCategoryHeight, 'bind');
      SearchPage.prototype.updateLastCategoryHeight.bind.returns(SearchPage.prototype.updateLastCategoryHeight);
    });

    afterEach(function () {
      SearchPage.prototype.updateLastCategoryHeight.bind.restore();
    });

    it('should render SearchCategory components', function () {
      const officersProp = {
        data: ['data'],
      };

      const unitsProp = {
        data: ['data'],
      };

      const wrapper = shallow(
        <SearchPage
          query='qa'
          officers={ officersProp }
          units={ unitsProp } />
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

      const officersProp = {
        data: ['data'],
      };
      const unitsProp = {
        data: ['data'],
      };

      const wrapper = shallow(
        <SearchPage
          query='qa'
          officers={ officersProp }
          units={ unitsProp } />
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
      const crsProp = {
        data: ['data'],
      };
      const officersProp = {
        data: ['data'],
      };

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
        mount(<SearchPage recent={ { data: [] } } />);

        IntercomUtils.showIntercomLauncher.calledWith(false).should.be.true();
      });

      it('should show intercom launcher again when unmounted', function () {
        const wrapper = mount(<SearchPage recent={ { data: [] } } />);
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
        mount(<SearchPage recent={ { data: [] } } />);
        IntercomTracking.trackSearchPage.called.should.be.true();
      });
    });
  });

  it('should handle when click on pinboard button if pinboard does not exist', function (done) {
    const createPinboard = stub().usingPromise(Promise).resolves({
      payload: {
        id: '5cd06f2b',
        url: '/pinboard/5cd06f2b/',
      },
    });

    const wrapper = mount(
      <SearchPage
        createPinboard={ createPinboard }
        recent={ { data: [] } }
      />
    );

    const browserHistoryPush = stub(browserHistory, 'push');
    const pinboardButton = wrapper.find('.test--pinboard-bar');
    pinboardButton.simulate('click');
    createPinboard.calledWith({ officerIds: [], trrIds: [], crids: [] }).should.be.true();
    setTimeout(() => {
      browserHistoryPush.called.should.be.true();
      browserHistoryPush.restore();
      done();
    }, 50);
  });

  it('should show toast on toast prop change', function () {
    const showToastStub = spy(SearchPage.prototype, 'showToast');

    const wrapper = shallow(
      <SearchPage />
    );
    wrapper.setProps({
      toast: {
        type: 'OFFICER',
        actionType: 'added',
      },
    });

    showToastStub.should.be.calledWith('OFFICER added', 'added');
  });
});
