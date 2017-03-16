import should from 'should';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub, spy } from 'sinon';
import constants from 'constants';

import SearchCategory from 'components/SearchPage/SearchCategory';

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

  describe('renderOfficer', () => {
    it('should render officer correctly', () => {
      const spySaveToRecent = spy();
      const officer = {
        name: 'John',
        url: '/officer/1',
        extraInfo: 'Badge #1'
      };

      const wrapper = mount(
        <SearchCategory
          items={ [officer] }
          categoryId='officers'
          saveToRecent={ spySaveToRecent }
        />
      );

      const officerElement = wrapper.find('OfficerSearchResult');
      officerElement.exists().should.be.true();
      officerElement.prop('officer').should.be.eql(officer);
      officerElement.prop('saveToRecent').should.be.eql(spySaveToRecent);

    });
  });

  describe('renderFaq', () => {
    it('should render faq correctly', () => {
      const spySaveToRecent = spy();
      const faq = {
        id: '2',
        question: 'foo'
      };

      const wrapper = mount(
        <SearchCategory
          items={ [faq] }
          categoryId='faqs'
          saveToRecent={ spySaveToRecent }
        />
      );

      const faqElement = wrapper.find('FaqSearchResult');
      faqElement.exists().should.be.true();
      faqElement.prop('faq').should.be.eql(faq);
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

      const href = `${constants.REPORTING_PATH}/2`;
      const reportLink = wrapper.find('ReportSearchResult');

      reportLink.exists().should.be.true();
      reportLink.prop('report').should.be.eql(report);
      reportLink.prop('saveToRecent').should.be.eql(spySaveToRecent);
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

});
