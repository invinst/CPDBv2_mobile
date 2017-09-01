import should from 'should';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub, spy } from 'sinon';
import { range } from 'lodash';
import * as NavigationUtil from 'utils/NavigationUtil';

import SearchCategory from 'components/SearchPage/SearchCategory';
import constants from 'constants';

const fixedHeaderHeight = (
  constants.QUERY_INPUT_HEIGHT + constants.SEARCH_CATEGORY_LINKS_HEIGHT + 2 * constants.NEW_DIVIDER_WEIGHT
);

describe('<SearchCategory />', function () {
  it('should be renderable', function () {
    const wrapper = shallow(
      <SearchCategory
        title='foo'
        items={ [] }
        categoryId='faqs'
      />
    );
    wrapper.should.be.ok();
  });

  it('should add scroll listener when mounted', function () {
    const wrapper = shallow(
      <SearchCategory
        title='foo'
        items={ [] }
        categoryId='faqs'
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
        categoryId='faqs'
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
        categoryId='faqs'
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
        categoryId='faqs'
      />
    );

    const title = wrapper.find('.title').first();
    title.text().should.eql('foo');
  });

  describe('render officers', function () {
    it('should render officer correctly', function () {
      const spySaveToRecent = spy();
      const officers = [
        {
          name: 'John',
          url: '/officer/1',
          extraInfo: 'Badge #1'
        },
        {
          name: 'Snow',
          url: '/officer/2',
          extraInfo: 'Badge #2'
        }
      ];

      const wrapper = mount(
        <SearchCategory
          items={ officers }
          categoryId='officers'
          saveToRecent={ spySaveToRecent }
        />
      );

      const officerElement = wrapper.find('OfficerSearchResult');
      officerElement.exists().should.be.true();
      officerElement.prop('items').should.be.eql(officers);
      officerElement.prop('saveToRecent').should.be.eql(spySaveToRecent);

    });
  });

  describe('render FAQs', function () {
    it('should render faq correctly', function () {
      const spySaveToRecent = spy();
      const faqs = [
        {
          id: '1',
          question: 'foo'
        },
        {
          id: '2',
          question: 'bar'
        }
      ];

      const wrapper = mount(
        <SearchCategory
          items={ faqs }
          categoryId='faqs'
          saveToRecent={ spySaveToRecent }
        />
      );

      const faqElement = wrapper.find('FaqSearchResult');
      faqElement.exists().should.be.true();
      faqElement.prop('items').should.be.eql(faqs);
      faqElement.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });

  });

  describe('renderReport', function () {
    it('should render report correctly', function () {
      const spySaveToRecent = spy();
      const reports = [{
        id: '2',
        title: 'foo',
        publication: 'NYT',
        publishDate: 'whenever'
      }];

      const wrapper = mount(
        <SearchCategory
          items={ reports }
          categoryId='reports'
          saveToRecent={ spySaveToRecent }
        />
      );

      const reportLink = wrapper.find('ReportSearchResult');

      reportLink.exists().should.be.true();
      reportLink.prop('items').should.be.eql(reports);
      reportLink.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });
  });

  describe('render units', function () {
    it('should render units correctly', function () {
      const spySaveToRecent = spy();
      const units = [
        {
          text: '001',
          memberCount: 2,
          activeMemberCount: 1
        },
        {
          text: '002',
          memberCount: 4,
          activeMemberCount: 3
        }
      ];

      const wrapper = shallow(
        <SearchCategory
          items={ units }
          categoryId='units'
          saveToRecent={ spySaveToRecent }
        />
      );

      const officerElement = wrapper.find('UnitSearchResult');
      officerElement.exists().should.be.true();
      officerElement.prop('items').should.be.eql(units);
      officerElement.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });
  });

  describe('renderSuggested', function () {
    it('should render item correctly', function () {
      const spySaveToRecent = spy();
      const items = [{
        url: 'localhost',
        type: 'recent',
        title: 'Whatever'
      }];

      const wrapper = mount(
        <SearchCategory
          items={ items }
          categoryId='recent'
          saveToRecent={ spySaveToRecent }
        />
      );
      const itemLink = wrapper.find('SuggestedSearchResult');

      itemLink.exists().should.be.true();
      itemLink.prop('items').should.be.eql(items);
      itemLink.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });
  });

  describe('renderAllButton', function () {
    beforeEach(function () {
      this.stubRenderFunc = stub(SearchCategory.prototype, 'renderResults');
      this.stubRenderFunc.returns((item) => item);
    });

    afterEach(function () {
      this.stubRenderFunc.restore();
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
      const allButtonClickHandler = spy();

      const wrapper = mount(
        <SearchCategory
          items={ [] }
          showAllButton={ true }
          allButtonClickHandler={ allButtonClickHandler }
        />
      );

      const allButton = wrapper.find('.all');
      allButton.simulate('click');
      allButtonClickHandler.calledWith().should.be.true();
    });
  });

  describe('renderResults', function () {
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

    it('should return only the first 10 items if not in single category mode', function () {
      const items = range(11);
      const wrapper = shallow(
        <SearchCategory
          items={ items }
          categoryId='faqs'
          showAllButton={ true }
        />
      );

      const faqSearchResult = wrapper.find('FaqSearchResult');
      faqSearchResult.prop('items').should.eql(range(10));
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
          activeCategory='faqs'
          categoryId='faqs'
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
          activeCategory='reports'
          categoryId='faqs'
          updateActiveCategory={ spyUpdateActiveCategory }
        />
      );
      const instance = wrapper.instance();
      instance.domNode = {
        offsetTop: 100,
        clientHeight: 200
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
          activeCategory='reports'
          categoryId='faqs'
          updateActiveCategory={ spyUpdateActiveCategory }
        />
      );
      const instance = wrapper.instance();
      instance.domNode = {
        offsetTop: 900 + fixedHeaderHeight + 1
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
          activeCategory='reports'
          categoryId='faqs'
          updateActiveCategory={ spyUpdateActiveCategory }
        />
      );
      const instance = wrapper.instance();
      instance.domNode = {
        offsetTop: 900,
        clientHeight: fixedHeaderHeight + 1
      };

      instance.watchActiveState();

      spyUpdateActiveCategory.calledWith('faqs').should.be.true();
    });
  });

});
