import should from 'should';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub, spy } from 'sinon';
import * as NavigationUtil from 'utils/NavigationUtil';

import SearchCategory from 'components/SearchPage/SearchCategory';
import constants from 'constants';

const fixedHeaderHeight = (
  constants.QUERY_INPUT_HEIGHT + constants.SEARCH_CATEGORY_LINKS_HEIGHT + 2 * constants.NEW_DIVIDER_WEIGHT
);

describe('<SearchCategory />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(
      <SearchCategory
        title='foo'
        items={ [] }
        categoryId='faqs'
      />
    );
    wrapper.should.be.ok();
  });

  it('should add scroll listener when mounted', () => {
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

  it('should define function to remove scroll listener', () => {
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

  it('should unwatch active state when unmounted', () => {
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

  it('should render title', () => {
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

  it('should render "All" button', () => {
    const stubRenderAllButton = stub(SearchCategory.prototype, 'renderAllButton');
    stubRenderAllButton.returns('renderall');

    shallow(
      <SearchCategory
        isShowingAll={ false }
        requestAll='requestAll'
        items={ [] }
        categoryId='faqs'
      />
    );

    stubRenderAllButton.calledWith(false, 0, 'requestAll').should.be.true();
    stubRenderAllButton.restore();
  });

  describe('render officers', () => {
    it('should render officer correctly', () => {
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
      officerElement.prop('officers').should.be.eql(officers);
      officerElement.prop('saveToRecent').should.be.eql(spySaveToRecent);

    });
  });

  describe('render FAQs', () => {
    it('should render faq correctly', () => {
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
      faqElement.prop('faqs').should.be.eql(faqs);
      faqElement.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });

  });

  describe('renderReport', () => {
    it('should render report correctly', () => {
      const spySaveToRecent = spy();
      const report = {
        id: '2',
        title: 'foo',
        publication: 'NYT',
        publishDate: 'whenever'
      };

      const wrapper = mount(
        <SearchCategory
          items={ [report] }
          categoryId='reports'
          saveToRecent={ spySaveToRecent }
        />
      );

      const reportLink = wrapper.find('ReportSearchResult');

      reportLink.exists().should.be.true();
      reportLink.prop('report').should.be.eql(report);
      reportLink.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });
  });

  describe('render units', () => {
    it('should render units correctly', () => {
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

      const wrapper = mount(
        <SearchCategory
          items={ units }
          categoryId='units'
          saveToRecent={ spySaveToRecent }
        />
      );

      const officerElement = wrapper.find('UnitSearchResult');
      officerElement.exists().should.be.true();
      officerElement.prop('units').should.be.eql(units);
      officerElement.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });
  });

  describe('renderSuggested', () => {
    it('should render item correctly', () => {
      const spySaveToRecent = spy();
      const item = {
        url: 'localhost',
        type: 'recent',
        title: 'Whatever'
      };

      const wrapper = mount(
        <SearchCategory
          items={ [item] }
          categoryId='recent'
          saveToRecent={ spySaveToRecent }
        />
      );
      const itemLink = wrapper.find('SuggestedSearchResult');

      itemLink.exists().should.be.true();
      itemLink.prop('item').should.be.eql(item);
      itemLink.prop('saveToRecent').should.be.eql(spySaveToRecent);
    });
  });

  describe('renderAllButton', () => {
    it('should render correctly', () => {
      const stubRenderFunc = stub(SearchCategory.prototype, 'renderResults');
      stubRenderFunc.returns((item) => item);

      const items = new Array(11);
      const dummyRequestAll = () => 'dummyRequestAll';

      const wrapper = mount(
        <SearchCategory
          items={ items }
          requestAll={ dummyRequestAll }
          isShowingAll={ false }
        />
      );

      const showAllButton = wrapper.find('.all');

      showAllButton.exists().should.be.true();
      showAllButton.prop('onClick').should.be.eql(dummyRequestAll);
      showAllButton.text().should.eql('ALL');

      stubRenderFunc.restore();
    });

    it('should not render if already isShowingAll', () => {
      const stubRenderFunc = stub(SearchCategory.prototype, 'renderResults');
      stubRenderFunc.returns((item) => item);

      const items = new Array(11);
      const dummyRequestAll = () => 'dummyRequestAll';

      const wrapper = mount(
        <SearchCategory
          items={ items }
          requestAll={ dummyRequestAll }
          isShowingAll={ true }
        />
      );

      const showAllButton = wrapper.find('.all');

      showAllButton.exists().should.be.false();

      stubRenderFunc.restore();
    });
  });

  describe('renderResults', () => {
    it('should return null if given invalid category id', () => {

      const wrapper = shallow(
        <SearchCategory
          items={ [] }
          categoryId='invalid'
        />
      );

      const result = wrapper.instance().renderResults();
      should.equal(result, null);
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
