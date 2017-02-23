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

  it('should render suggestions', () => {
    const stubRenderFunc = stub(SearchCategory.prototype, 'getCategorySpecificRenderFunction');
    stubRenderFunc.returns((item) => item);

    const wrapper = shallow(
      <SearchCategory
        title='foo'
        items={ ['dummy1', 'dummy2'] }
      />
    );

    const body = wrapper.find('.body').first();
    body.text().should.eql('dummy1dummy2');

    stubRenderFunc.restore();
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
      const spyClicked = spy();
      const officer = {
        name: 'John',
        url: 'http://localhost',
        extraInfo: 'Badge #1'
      };

      const wrapper = shallow(
        <SearchCategory
          items={ [officer] }
          categoryId='officers'
          clicked={ spyClicked }
        />
      );

      const officerElement = wrapper.find('a[href="http://localhost"]');
      officerElement.exists().should.be.true();
      officerElement.text().should.eql('JohnBadge #1');
    });
  });

  describe('renderFaq', () => {
    it('should render faq correctly', () => {
      const faq = {
        id: '2',
        question: 'foo'
      };

      const wrapper = mount(
        <SearchCategory
          items={ [faq] }
          categoryId='faqs'
          clicked={ () => {} }
        />
      );

      const href = `${constants.FAQ_PATH}/2`;
      const faqLink = wrapper.find('Link');

      faqLink.exists().should.be.true();
      faqLink.hasClass('faq').should.be.true();
      faqLink.prop('to').should.be.eql(href);
      faqLink.text().should.eql('foo');
    });

    it('should dispatch "clicked" action when clicked', () => {
      const spyClicked = spy();
      const faq = {
        id: '3',
        question: 'foo'
      };

      const wrapper = shallow(
        <SearchCategory
          items={ [faq] }
          categoryId='faqs'
          clicked={ spyClicked }
        />
      );
      const faqLink = wrapper.find('Link');

      faqLink.simulate('click');
      spyClicked.calledWith({
        type: 'FAQ',
        title: 'foo',
        url: `${constants.FAQ_PATH}/3`
      }).should.be.true();
    });
  });

  describe('renderReport', () => {
    it('should render report correctly', () => {
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
          clicked={ () => {} }
        />
      );

      const href = `${constants.REPORTING_PATH}/2`;
      const reportLink = wrapper.find('Link');

      reportLink.exists().should.be.true();
      reportLink.hasClass('report-row').should.be.true();
      reportLink.prop('to').should.be.eql(href);
      reportLink.text().should.eql('NYTwheneverfoo');
    });

    it('should dispatch "clicked" action when clicked', () => {
      const spyClicked = spy();
      const report = {
        id: '3',
        title: 'foo',
        publication: 'NYT',
        publishDate: 'whenever'
      };

      const wrapper = shallow(
        <SearchCategory
          items={ [report] }
          categoryId='reports'
          clicked={ spyClicked }
        />
      );
      const reportLink = wrapper.find('Link');

      reportLink.simulate('click');
      spyClicked.calledWith({
        type: 'Report',
        title: 'foo',
        url: `${constants.REPORTING_PATH}/3`
      }).should.be.true();
    });
  });

  describe('renderSuggested', () => {
    it('should render item correctly', () => {
      const item = {
        url: 'localhost',
        type: 'recent',
        title: 'Whatever'
      };

      const wrapper = mount(
        <SearchCategory
          items={ [item] }
          categoryId='recent'
          clicked={ () => {} }
        />
      );
      const itemLink = wrapper.find('Link');

      itemLink.exists().should.be.true();
      itemLink.hasClass('suggested').should.be.true();
      itemLink.prop('to').should.be.eql('localhost');
      itemLink.text().should.eql('recentWhatever');
    });

    it('should dispatch "clicked" action when clicked', () => {
      const spyClicked = spy();
      const item = {
        url: 'localhost',
        type: 'recent',
        title: 'Whatever'
      };

      const wrapper = shallow(
        <SearchCategory
          items={ [item] }
          categoryId='recent'
          clicked={ spyClicked }
        />
      );
      const itemLink = wrapper.find('Link');

      itemLink.simulate('click');
      spyClicked.calledWith(item).should.be.true();
    });
  });

  describe('renderAllButton', () => {
    it('should render correctly', () => {
      const stubRenderFunc = stub(SearchCategory.prototype, 'getCategorySpecificRenderFunction');
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
      const stubRenderFunc = stub(SearchCategory.prototype, 'getCategorySpecificRenderFunction');
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
