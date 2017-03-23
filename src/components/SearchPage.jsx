import React, { Component, PropTypes } from 'react';
import style from 'styles/SearchPage.sass';
import { Sticky } from 'react-sticky';
import SearchCategory from 'components/SearchPage/SearchCategory';
import { scrollToElement } from 'utils/NavigationUtil';
import constants from 'constants';
import clearIcon from 'img/ic-clear.svg';

export default class SearchPage extends Component {
  componentDidMount() {
    this.inputElement.focus();
  }

  blurSearchInput(isSticky) {
    /*
      iOS Safari has a bug: if a focused <input> tag has `position: fixed`, it
      will jump around (in our case: disappear from viewport). Because sticky
      header relies on `position: fixed` to work, we'll have to manually
      unfocus our search input tag whenever it becomes sticky to avoid this
      bug.
    */
    if (isSticky) {
      this.inputElement.blur();
    }

  }

  onInputChange(event) {
    const { suggestTerm, inputChanged } = this.props;
    const query = event.currentTarget.value;

    if (this.isLongEnoughQuery(query)) {
      suggestTerm({}, undefined, query + '/');
    }

    inputChanged(query);
  }

  isLongEnoughQuery(query) {
    return typeof query === 'string' && query.length >= 2;
  }

  scrollToCategory(categoryId) {
    const target = '#search-category-' + categoryId;
    scrollToElement(target, '#search-page-header');
  }

  getCategoriesWithSuggestions() {
    return constants.SEARCH_CATEGORIES.filter((cat) => {
      const suggestions = this.props[cat.id];
      return !!suggestions && suggestions.data.length > 0;
    });
  }

  renderCategoryLinks(categories) {

    const links = categories.map(
      (category, index) => (
        <button key={ index }
          onClick={ this.scrollToCategory.bind(this, category.id) }
          className='category-link'
          >
          { category.name }
        </button>
      )
    );

    return (
      <div className='categories'>
        { links }
      </div>
    );
  }

  clearQuery() {
    this.props.inputChanged('');
    this.inputElement.focus();
  }

  renderClearIcon() {
    const { query } = this.props;

    if (!query) {
      return null;
    }

    return (
      <img
        className='clear-icon'
        src={ clearIcon }
        onClick={ this.clearQuery.bind(this) }
        />
    );
  }

  renderCategories(categories) {
    const { suggestAllFromCategory, query } = this.props;

    return categories.map((cat) => (
      <SearchCategory
        key={ cat.id }
        categoryId={ cat.id }
        requestAll={ suggestAllFromCategory.bind(this, cat.path, query) }
        title={ cat.name }
        isShowingAll={ this.props[cat.id].isShowingAll }
        items={ this.props[cat.id].data }
        saveToRecent={ this.props.saveToRecent }
        />
    ));
  }

  render() {
    const { query } = this.props;
    let categoryLinks, categoryDetails;

    if (!this.isLongEnoughQuery(query)) {
      const categories = [
        {
          name: 'Recent',
          id: 'recent'
        },
        {
          name: 'Suggested',
          id: 'suggested'
        }
      ].filter((cat) => {
        const suggestions = this.props[cat.id];
        return !!suggestions && suggestions.data.length > 0;
      });
      categoryLinks = this.renderCategoryLinks(categories);
      categoryDetails = this.renderCategories(categories);

    } else {
      const categoriesWithSuggestions = this.getCategoriesWithSuggestions();
      categoryLinks = this.renderCategoryLinks(categoriesWithSuggestions);
      categoryDetails = this.renderCategories(categoriesWithSuggestions);
    }

    return (
      <div className={ style.searchPage }>
        <Sticky
          id='search-page-header'
          onStickyStateChange={ this.blurSearchInput.bind(this) }
          >

          <div className='query-input-container'>
            <input
              className='sheet-header header query-input'
              value={ query }
              placeholder='Search'
              ref={ (inputElement) => { this.inputElement = inputElement; } }
              onChange={ this.onInputChange.bind(this) }
              />
            { this.renderClearIcon() }
          </div>


          { categoryLinks }
        </Sticky>

        { categoryDetails }

        <div className='bottom-padding'></div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  query: PropTypes.string,
  inputChanged: PropTypes.func,
  suggestTerm: PropTypes.func,
  officers: PropTypes.object,
  faqs: PropTypes.object,
  suggestAllFromCategory: PropTypes.func,
  categories: PropTypes.array,
  saveToRecent: PropTypes.func
};
