import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';
import { noop } from 'lodash';

import browserHistory from 'utils/history';
import * as NavigationUtil from 'utils/navigation-util';
import * as IntercomUtils from 'utils/intercom';
import SearchPage from 'components/search-page';
import SearchCategory from 'components/search-page/search-category';
import * as IntercomTracking from 'utils/intercom-tracking';


describe('<SearchPage />', function () {
  beforeEach(function () {
    stub(IntercomUtils, 'showIntercomLauncher');
  });

  it('should be renderable', function () {
    const wrapper = shallow(
      <SearchPage />,
      { disableLifecycleMethods: true },
    );
    wrapper.should.be.ok();
  });

  it('should call browserHistory.push when user click on back button', function () {
    const browserHistoryPush = stub(browserHistory, 'push');

    const wrapper = shallow(
      <SearchPage cancelPathname='/pinboard/123abc/'/>,
      { disableLifecycleMethods: true },
    );

    const closeButton = wrapper.find('.bt-close');
    closeButton.text().should.eql('Close');
    closeButton.simulate('click', { preventDefault: noop });

    browserHistoryPush.should.be.calledOnce();
    browserHistoryPush.should.be.calledWith('/pinboard/123abc/');
  });

  describe('componentDidMount', function () {
    it('should focus the input element when mounted', function () {
      const wrapper = shallow(
        <SearchPage />,
        { disableLifecycleMethods: true },
      );
      const instance = wrapper.instance();
      const spyFocus = spy();


      instance.searchInput = {
        focus: spyFocus,
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

  describe('onInputChange', function () {
    it('should dispatch inputChanged action', function () {
      const dummyEvent = { currentTarget: { value: 'foo' } };
      const spyInputChanged = spy();
      const wrapper = shallow(
        <SearchPage inputChanged={ spyInputChanged }/>,
        { disableLifecycleMethods: true },
      );
      const instance = wrapper.instance();

      instance.onInputChange(dummyEvent);

      spyInputChanged.calledWith('foo').should.be.true();
    });

    it('should call suggestTerm if query is of sufficient length', function () {
      const dummyEvent = { currentTarget: { value: 'foo' } };
      const spySuggestTerm = spy();
      const wrapper = mount(
        <SearchPage suggestTerm={ spySuggestTerm }/>
      );
      const instance = wrapper.instance();

      instance.onInputChange(dummyEvent);

      wrapper.setProps({ query: 'foo' });

      spySuggestTerm.calledWith({ term: 'foo' }, undefined, '').should.be.true();
    });

    it('should NOT call suggestTerm if query is empty or too short', function () {
      const spySuggestTerm = spy();
      const wrapper = mount(
        <SearchPage suggestTerm={ spySuggestTerm }/>
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

  describe('search <input>', function () {
    beforeEach(function () {
      this.stubOnInputChange = stub(SearchPage.prototype, 'onInputChange');
    });

    it('should render query input component', function () {
      const spyInputChanged = spy();

      const wrapper = shallow(
        <SearchPage
          query={ 'meh' }
          inputChanged={ spyInputChanged }
        />,
        { disableLifecycleMethods: true },
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
      const wrapper = shallow(
        <SearchPage
          query={ 'j' }
          recent={ ['data'] }
          categories={ [{
            name: 'RECENT',
            id: 'recent',
            items: ['data'],
            showAllButton: false,
          }] }
        />,
        { disableLifecycleMethods: true },
      );

      const searchCategory = wrapper.find('SearchCategory');

      searchCategory.prop('categoryId').should.eql('recent');
      searchCategory.prop('title').should.eql('RECENT');
      searchCategory.prop('items').should.eql(['data']);
    });

    it('should set this.searchInput ref to its own instance', function () {
      const wrapper = mount(<SearchPage />);

      const refInstance = wrapper.instance().searchInput;
      (typeof refInstance).should.not.eql('undefined');
    });

    it('should change the search box with correct text if there is queryPrefix', function () {
      const wrapper = shallow(
        <SearchPage
          query={ 'jerome' }
          queryPrefix='officer'
        />,
        { disableLifecycleMethods: true },
      );
      const clearableInput = wrapper.find('.query-input');
      clearableInput.prop('value').should.eql('officer:jerome');
    });
  });

  describe('updateLastCategoryHeight', function () {
    it('should run correctly', function () {
      const wrapper = shallow(
        <SearchPage />,
        { disableLifecycleMethods: true },
      );
      const instance = wrapper.instance();
      const spyForceUpdate = spy(instance, 'forceUpdate');

      instance.updateLastCategoryHeight(1);

      instance.lastCategoryHeight.should.eql(1);
      spyForceUpdate.called.should.be.true();
    });
  });

  describe('renderCategories()', function () {
    it('should render SearchCategory components', function () {
      const cr1 = {
        category: 'Use Of Force',
        crid: '1027271',
        highlight: {
          summary: ['On July', 'an off-duty'],
        },
        id: '1027271',
        'incident_date': '2009-06-13',
      };
      const cr2 = {
        category: 'Domestic',
        crid: '1049273',
        highlight: {
          summary: ['On October', 'regarding an incident that occurred'],
        },
        id: '1049273',
        'incident_date': '2011-10-13',
      };
      const categories = [{
        name: 'DATE → OFFICERS',
        filter: 'DATE > OFFICERS',
        id: 'dateOfficers',
        path: 'DATE > OFFICERS',
        queryPrefix: 'date-officer',
        showAllButton: true,
        items: [{
          id: 123,
          itemRank: 1,
          name: 'Jerome Finnigan',
          badge: 'Badge #56789',
          percentile: {},
          url: '/officer/123/jerome-finnigan/',
          type: 'OFFICER',
          isPinned: false,
          recentItemData: {
            'id': '1',
            'name': 'Name',
            'badge': '12314',
            'percentile': {},
          },
        }],
      }, {
        name: 'COMPLAINT RECORDS (CRs)',
        filter: 'CR',
        id: 'crs',
        path: 'CR',
        queryPrefix: 'cr',
        showAllButton: true,
        items: [
          {
            crid: '1027271',
            itemRank: 2,
            url: '/complaint/1027271/',
            category: 'Use Of Force',
            incidentDate: '06/13/2009',
            type: 'CR',
            isPinned: false,
            recentItemData: cr1,
          },
          {
            crid: '1049273',
            itemRank: 3,
            url: '/complaint/1049273/',
            category: 'Domestic',
            incidentDate: '10/13/2011',
            type: 'CR',
            isPinned: true,
            recentItemData: cr2,
          },
        ],
      }];

      const wrapper = shallow(
        <SearchPage query='qa' categories={ categories }/>,
        { disableLifecycleMethods: true },
      );

      const categoryDetails = wrapper.find('.category-details-container').children();

      categoryDetails.length.should.eql(2);
      categoryDetails.at(0).type().should.be.eql(SearchCategory);
    });

    it('should pass correct props to SearchCategory', function () {
      const stubBoundCallback = stub(SearchPage.prototype.chooseCategory, 'bind');
      stubBoundCallback.returns(SearchPage.prototype.chooseCategory);
      const spyUpdateActiveCategory = spy();
      const spyGetSuggestionWithContentType = spy();

      const categories = [{
        name: 'OFFICERS',
        filter: 'Officers',
        id: 'officers',
        path: 'OFFICER',
        queryPrefix: 'officer',
        showAllButton: true,
        items: [{
          id: '1',
          itemRank: 4,
          name: 'Name',
          badge: 'Badge #12314',
          url: '/officer/1/name/',
          percentile: {},
          isPinned: true,
          type: 'OFFICER',
          recentItemData: {
            id: '1',
            name: 'Name',
            badge: '12314',
            percentile: {},
          },
        }],
      }];

      const wrapper = shallow(
        <SearchPage
          query='qa'
          categories={ categories }
          chosenCategory='officers'
          activeCategory='officers'
          updateActiveCategory={ spyUpdateActiveCategory }
          getSuggestionWithContentType={ spyGetSuggestionWithContentType }
          nextParams={ {
            contentType: 'OFFICER',
            limit: '30',
            offset: '60',
            term: '123',
          } }
          hasMore={ true }
        />,
        { disableLifecycleMethods: true },
      );

      const searchCategory = wrapper.find(SearchCategory).at(0);
      searchCategory.prop('categoryId').should.equal('officers');
      searchCategory.prop('categoryPath').should.equal('OFFICER');
      searchCategory.prop('allButtonClickHandler').should.eql(SearchPage.prototype.chooseCategory);
      searchCategory.prop('showAllButton').should.be.true();
      searchCategory.prop('title').should.equal('OFFICERS');
      searchCategory.prop('items').should.eql(categories[0].items);
      searchCategory.prop('updateActiveCategory').should.eql(spyUpdateActiveCategory);
      searchCategory.prop('activeCategory').should.equal('officers');
      searchCategory.prop('getSuggestionWithContentType').should.eql(spyGetSuggestionWithContentType);
      searchCategory.prop('query').should.equal('qa');
      searchCategory.prop('nextParams').should.eql({
        contentType: 'OFFICER',
        limit: '30',
        offset: '60',
        term: '123',
      });
      searchCategory.prop('hasMore').should.be.true();
    });
  });

  describe('chooseCategory', function () {
    it('should call updateChosenCategory with correct args', function () {
      const updateChosenCategory = spy();

      const wrapper = shallow(
        <SearchPage
          query='wa'
          updateChosenCategory={ updateChosenCategory }
        />,
        { disableLifecycleMethods: true },
      );

      wrapper.instance().chooseCategory({
        path: 'mypath',
        id: 'myid',
      });

      updateChosenCategory.calledWith('myid').should.be.true();
    });
  });

  describe('"view single category" mode', function () {
    it('should only display search results of the chosen single category', function () {
      const cr1 = {
        category: 'Use Of Force',
        crid: '1027271',
        highlight: {
          summary: ['On July', 'an off-duty'],
        },
        id: '1027271',
        'incident_date': '2009-06-13',
      };
      const cr2 = {
        category: 'Domestic',
        crid: '1049273',
        highlight: {
          summary: ['On October', 'regarding an incident that occurred'],
        },
        id: '1049273',
        'incident_date': '2011-10-13',
      };
      const categories = [{
        name: 'COMPLAINT RECORDS (CRs)',
        filter: 'CR',
        id: 'crs',
        path: 'CR',
        queryPrefix: 'cr',
        showAllButton: false,
        items: [
          {
            crid: '1027271',
            itemRank: 2,
            url: '/complaint/1027271/',
            category: 'Use Of Force',
            incidentDate: '06/13/2009',
            type: 'CR',
            isPinned: false,
            recentItemData: cr1,
          },
          {
            crid: '1049273',
            itemRank: 3,
            url: '/complaint/1049273/',
            category: 'Domestic',
            incidentDate: '10/13/2011',
            type: 'CR',
            isPinned: true,
            recentItemData: cr2,
          },
        ],
      }];

      const wrapper = shallow(
        <SearchPage
          query='qa'
          categories={ categories }
          chosenCategory='crs'
        />,
        { disableLifecycleMethods: true },
      );

      const searchCategories = wrapper.find('SearchCategory');
      searchCategories.should.have.length(1);
    });
  });

  describe('Intercom', function () {
    describe('Intercom launcher', function () {
      it('should hide intercom launcher when mounted', function () {
        mount(<SearchPage />);

        IntercomUtils.showIntercomLauncher.calledWith(false).should.be.true();
      });

      it('should show intercom launcher again when unmounted', function () {
        const wrapper = mount(<SearchPage />);
        wrapper.unmount();

        IntercomUtils.showIntercomLauncher.calledWith(true).should.be.true();
      });
    });

    describe('Intercom tracking', function () {
      beforeEach(function () {
        stub(IntercomTracking, 'trackSearchPage');
      });

      it('should track Intercom with search page', function () {
        mount(<SearchPage />);
        IntercomTracking.trackSearchPage.called.should.be.true();
      });
    });
  });

  describe('render back to search link', function () {
    beforeEach(function () {
      this.stubInstantScrollToTop = stub(NavigationUtil, 'instantScrollToTop');
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

  context('pinboard is empty', function () {
    it('should not display PinboardBar', function () {
      const wrapper = mount(<SearchPage pinboard={ { isPinboardRestored: true, itemsCount: 0 } } />);
      wrapper.find('PinboardBar').childAt(0).prop('className').should.not.containEql('slide-in');
    });

    context('query is not long enough', function () {
      it('should render PinboardIntroduction', function () {
        const wrapper = mount(
          <SearchPage
            pinboard={ { itemsCount: 0 } }
            query=''
          />
        );
        wrapper.find('PinboardIntroduction').exists().should.be.true();
      });
    });

    context('query is long enough', function () {
      it('should not render PinboardIntroduction', function () {
        const wrapper = mount(
          <SearchPage
            pinboard={ { itemsCount: 0 } }
            query='1234'
          />
        );
        wrapper.find('PinboardIntroduction').exists().should.be.false();
      });
    });
  });

  context('pinboard is not empty', function () {
    it('should display PinboardBar', function () {
      const wrapper = mount(<SearchPage pinboard={ { isPinboardRestored: true, itemsCount: 1 } } />);
      wrapper.find('PinboardBar').childAt(0).prop('className').should.containEql('slide-in');
    });

    context('query is not long enough', function () {
      it('should not render PinboardIntroduction', function () {
        const wrapper = mount(
          <SearchPage
            pinboard={ { itemsCount: 2 } }
            query=''
          />
        );
        wrapper.find('PinboardIntroduction').exists().should.be.false();
      });
    });

    context('query is long enough', function () {
      it('should render PinboardIntroduction', function () {
        const wrapper = mount(<SearchPage
          query='1234'
          pinboard={ { itemsCount: 2 } } />);
        wrapper.find('PinboardIntroduction').exists().should.be.false();
      });
    });
  });
});
