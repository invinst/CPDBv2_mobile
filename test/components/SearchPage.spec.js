import should from 'should';
import React from 'react';
// Since SearchPage uses <Sticky>, it must be render inside a <StickyContainer>
import { StickyContainer } from 'react-sticky';
import { mount, shallow } from 'enzyme';
import { stub, spy } from 'sinon';

import * as NavigationUtil from 'utils/NavigationUtil';
import SearchPage from 'components/SearchPage';
import SearchCategory from 'components/SearchPage/SearchCategory';
import constants from 'constants';

describe('<SearchPage />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<SearchPage query={ '' } />);
    wrapper.should.be.ok();
  });

  it('should call suggestEmptyTerm on mount', () => {
    const suggestEmptyTerm = spy();
    mount(
      <StickyContainer>
        <SearchPage
          query={ '' }
          suggestEmptyTerm={ suggestEmptyTerm }
        />
      </StickyContainer>);
    suggestEmptyTerm.calledOnce.should.be.true();
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
       />
    );

    wrapper.find('.categories').text().should.eql('Any');
    wrapper.find(SearchCategory).should.have.length(1);

    SearchPage.prototype.getCategoriesWithSuggestions.restore();
  });

  describe('getCategoriesWithSuggestions', () => {
    it('should return defined categories with data from props', () => {
      constants.SEARCH_CATEGORIES = [
        {
          id: 'defined_1',
          name: 'Define 1',
          path: 'DEFINED_1'
        },
        {
          id: 'defined_2',
          name: 'Define 2',
          path: 'DEFINED_2'
        }
      ];
      const wrapper = shallow(
        <SearchPage
          query={ 'ab' }
          suggestAllFromCategory={ () => {} }
          defined_1={ { data: [1] } }
          defined_2={ { data: [] } }
          undefined={ { data: [1] } }
         />
      );
      const instance = wrapper.instance();

      instance.getCategoriesWithSuggestions().should.eql([
        {
          id: 'defined_1',
          name: 'Define 1',
          path: 'DEFINED_1'
        }
      ]);
    });
  });

  describe('scrollToCategory', () => {
    it('should call scrollToElement with a correct selector', () => {
      const stubScrollToElement = stub(NavigationUtil, 'scrollToElement');
      const wrapper = shallow(<SearchPage query={ '' } />);
      const instance = wrapper.instance();
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
});
