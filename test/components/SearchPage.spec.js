import should from 'should';
import React from 'react';

import { shallow, mount } from 'enzyme';
import { stub, spy } from 'sinon';
import { StickyContainer } from 'react-sticky';
import ReactHeight from 'react-height';

import * as NavigationUtil from 'utils/NavigationUtil';
import SearchPage from 'components/SearchPage';
import SearchCategory from 'components/SearchPage/SearchCategory';
import constants from 'constants';

describe('<SearchPage />', () => {
  it('should be renderable', () => {
    const wrapper = mount(
      <StickyContainer>
        <SearchPage query={ '' } />
      </StickyContainer>
    );
    wrapper.should.be.ok();
  });

  it('should render categories returned by getCategoriesWithSuggestions when it has query', () => {
    stub(SearchPage.prototype, 'getCategoriesWithSuggestions').callsFake( () => [
      {
        name: 'Any',
        id: 'any',
        path: 'ANY'
      }
    ]);
    const wrapper = shallow(
      <SearchPage
        query={ 'ab' }
        suggestAllFromCategory={ () => {} }
        any={ { isShowingAll: false } }
        inputChanged={ () => {} }
       />
    );

    wrapper.find('.categories').text().should.eql('Any');
    wrapper.find(SearchCategory).should.have.length(1);

    SearchPage.prototype.getCategoriesWithSuggestions.restore();
  });

  describe('getCategoriesWithSuggestions', () => {
    it('should return defined categories with data from props', () => {
      const wrapper = shallow(
        <SearchPage
          query={ 'ab' }
          suggestAllFromCategory={ () => {} }
          officers={ { data: [1] } }
          faqs={ { data: [] } }
          undefined={ { data: [1] } }
          inputChanged={ () => {} }
         />
      );
      const instance = wrapper.instance();

      instance.getCategoriesWithSuggestions().should.eql([
        {
          id: 'officers',
          name: 'Officers',
          path: 'OFFICER'
        }
      ]);
    });
  });

  describe('scrollToCategory', () => {
    it('should call scrollToElement with a correct selector', () => {
      const stubScrollToElement = stub(NavigationUtil, 'scrollToElement');
      const wrapper = shallow(<SearchPage query={ '' } />);
      wrapper.instance().scrollToCategory('an-id');

      stubScrollToElement.calledWith('#search-category-an-id',
                                     '#search-page-header').should.be.true();
      stubScrollToElement.restore();
    });
  });

  describe('onInputChange', () => {
    it('should dispatch inputChanged action', () => {
      const dummyEvent = { currentTarget: { value: 'foo' } };
      const spyInputChanged = spy();
      const wrapper = shallow(
        <SearchPage
          query={ '' }
          inputChanged={ spyInputChanged }
          suggestTerm={ () => {} }
        />
      );
      const instance = wrapper.instance();

      instance.onInputChange(dummyEvent);

      spyInputChanged.calledWith('foo').should.be.true();
    });

    it('should call suggestTerm if query is of sufficient length', () => {
      const dummyEvent = { currentTarget: { value: 'foo' } };
      const spySuggestTerm = spy();
      const wrapper = shallow(
        <SearchPage
          query={ '' }
          inputChanged={ () => {} }
          suggestTerm={ spySuggestTerm }
        />
      );
      const instance = wrapper.instance();

      instance.onInputChange(dummyEvent);

      spySuggestTerm.calledWith({}, undefined, 'foo/').should.be.true();
    });

    it('should NOT call suggestTerm if query is empty or too short', () => {
      const spySuggestTerm = spy();
      const wrapper = shallow(
        <SearchPage
          query={ '' }
          inputChanged={ () => {} }
          suggestTerm={ spySuggestTerm }
        />
      );
      const instance = wrapper.instance();

      instance.onInputChange({ currentTarget: { value: '' } });
      spySuggestTerm.called.should.be.false();

      instance.onInputChange({ currentTarget: { value: 'f' } });
      spySuggestTerm.called.should.be.false();
    });
  });

  describe('blurSearchInput', () => {
    it('should blur the sticky input element', () => {
      const wrapper = shallow(<SearchPage />);
      const instance = wrapper.instance();
      const spyBlur = spy();

      instance.inputElement = {
        blur: spyBlur
      };
      instance.blurSearchInput(true);

      spyBlur.calledOnce.should.be.true();
    });

    it('should not blur the non-sticky input element', () => {
      const wrapper = shallow(<SearchPage />);
      const instance = wrapper.instance();
      const spyBlur = spy();

      instance.inputElement = {
        blur: spyBlur
      };
      instance.blurSearchInput(false);

      spyBlur.called.should.be.false();
    });
  });

  it('should focus the input element when mounted', () => {
    const wrapper = shallow(<SearchPage />);
    const instance = wrapper.instance();
    const spyFocus = spy();


    instance.inputElement = {
      focus: spyFocus
    };
    instance.componentDidMount();

    spyFocus.calledOnce.should.be.true();
  });

  it('should not render "clear text" button when query is empty', () => {
    const wrapper = shallow(
      <SearchPage
        query={ '' }
        inputChanged={ () => {} }
        suggestTerm={ () => {} }
      />
    );

    wrapper.find('.clear-icon').exists().should.be.false();
  });

  it('should render "clear text" button when query is not empty', () => {
    const wrapper = shallow(
      <SearchPage
        query={ 'a' }
        inputChanged={ () => {} }
        suggestTerm={ () => {} }
      />
    );

    wrapper.find('.clear-icon').exists().should.be.true();
  });

  it('should empty search query when user taps "clear text" button', () => {
    const spyInputChanged = spy();
    const spyFocus = spy();
    const wrapper = shallow(
      <SearchPage
        query={ 'delete me' }
        inputChanged={ spyInputChanged }
        suggestTerm={ () => {} }
      />
    );
    wrapper.instance().inputElement = { focus: spyFocus };

    wrapper.find('.clear-icon').simulate('click');

    spyInputChanged.calledWith('').should.be.true();
    spyFocus.calledWith().should.be.true();
  });

  describe('updateLastCategoryHeight', () => {
    it('should run correctly', () => {
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

  describe('calculateDynamicBottomPaddingStyle', () => {
    it('should return correct height when there is no last category', () => {
      const wrapper = shallow(
        <SearchPage />
      );
      const instance = wrapper.instance();
      instance.lastCategoryHeight = null;

      const result = instance.calculateDynamicBottomPaddingStyle();
      const dynamicBottomPaddingOffset = (
        constants.SHEET_HEADER_HEIGHT +
        constants.SEARCH_CATEGORY_LINKS_HEIGHT
      );
      const height = `calc(100vh - ${dynamicBottomPaddingOffset}px)`;

      result.should.eql({
        height
      });
    });

    it('should return correct height when there is category', () => {
      const wrapper = shallow(
        <SearchPage />
      );
      const instance = wrapper.instance();
      instance.lastCategoryHeight = 1;

      const result = instance.calculateDynamicBottomPaddingStyle();
      const dynamicBottomPaddingOffset = (
        constants.SHEET_HEADER_HEIGHT +
        constants.SEARCH_CATEGORY_LINKS_HEIGHT +
        1
      );
      const height = `calc(100vh - ${dynamicBottomPaddingOffset}px)`;

      result.should.eql({
        height
      });
    });
  });

  describe('renderCategories()', () => {
    it('should render SearchCategory components', () => {
      const stubBoundCallback = stub(SearchPage.prototype.updateLastCategoryHeight, 'bind');
      stubBoundCallback.returns(SearchPage.prototype.updateLastCategoryHeight);

      const officersProp = {
        data: ['data']
      };
      const reportsProp = {
        data: ['data']
      };

      const wrapper = shallow(
        <SearchPage
          saveToRecent={ () => {} }
          query='qa'
          officers={ officersProp }
          reports={ reportsProp }
          suggestAllFromCategory={ () => {} }/>
      );

      const categoryDetails = wrapper.find('.category-details-container').children();

      categoryDetails.should.have.length(2);
      categoryDetails.at(0).childAt(0).type().should.be.eql(SearchCategory);

      // Last component should be wrapped inside ReactHeight:
      const lastCategory = categoryDetails.at(1);
      lastCategory.type().should.be.eql(ReactHeight);
      lastCategory.prop('onHeightReady').should.be.eql(SearchPage.prototype.updateLastCategoryHeight);

      stubBoundCallback.restore();
    });
  });
});
