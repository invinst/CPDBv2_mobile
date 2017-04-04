import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import style from 'styles/SearchPage.sass';
import { Sticky } from 'react-sticky';
import SearchCategory from 'components/SearchPage/SearchCategory';
import { scrollToElement } from 'utils/NavigationUtil';
import constants from 'constants';
import clearIcon from 'img/ic-clear.svg';
import ReactHeight from 'react-height';

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
    let { activeCategory } = this.props;

    // Make first category active by default
    if (!activeCategory && categories.length > 0) {
      activeCategory = categories[0].id;
    }

    const links = categories.map(
      (category, index) => {
        const classNames = cx(
          'category-link',
          { 'active': activeCategory === category.id }
        );

        return (
          <button key={ index }
            onClick={ this.scrollToCategory.bind(this, category.id) }
            className={ classNames }
            >
            { category.name }
          </button>
        );
      }
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

  updateLastCategoryHeight(newHeight) {
    this.lastCategoryHeight = newHeight;
    this.forceUpdate();
  }

  renderCategories(categories) {
    const { suggestAllFromCategory, query } = this.props;

    return categories.map((cat, index) => {
      const searchCategory = (
        <SearchCategory
          categoryId={ cat.id }
          requestAll={ suggestAllFromCategory.bind(this, cat.path, query) }
          title={ cat.name }
          isShowingAll={ this.props[cat.id].isShowingAll }
          items={ this.props[cat.id].data }
          saveToRecent={ this.props.saveToRecent }
          updateActiveCategory={ this.props.updateActiveCategory }
          activeCategory={ this.props.activeCategory }
          />
      );

      if (index === categories.length - 1) {
        return (
          <ReactHeight key={ cat.id } onHeightReady={ this.updateLastCategoryHeight.bind(this) }>
            { searchCategory }
          </ReactHeight>
        );
      }

      return <div key={ cat.id }>{ searchCategory }</div>;
    });
  }

  calculateDynamicBottomPaddingStyle() {
    const lastCategoryHeight = this.lastCategoryHeight || 0;
    const dynamicBottomPaddingOffset = (
      constants.SHEET_HEADER_HEIGHT +
      constants.SEARCH_CATEGORY_LINKS_HEIGHT +
      lastCategoryHeight
    );
    const height = `calc(100vh - ${dynamicBottomPaddingOffset}px)`;
    return { height };
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

        <div className='category-details-container'>
          { categoryDetails }
        </div>

        <div style={ this.calculateDynamicBottomPaddingStyle() } className='bottom-padding'></div>
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
  saveToRecent: PropTypes.func,
  activeCategory: PropTypes.string,
  updateActiveCategory: PropTypes.func
};
