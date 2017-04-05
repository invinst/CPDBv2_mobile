import React, { Component, PropTypes } from 'react';
import style from 'styles/SearchPage.sass';
import { Sticky } from 'react-sticky';
import SearchCategory from 'components/SearchPage/SearchCategory';
import SearchNavbar from 'components/SearchPage/SearchNavbar';
import ClearableInput from 'components/SearchPage/ClearableInput';
import { scrollToElement } from 'utils/NavigationUtil';
import constants from 'constants';
import ReactHeight from 'react-height';

export default class SearchPage extends Component {
  componentDidMount() {
    this.searchInput.inputElement.focus();
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
      this.searchInput.inputElement.blur();
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

  updateLastCategoryHeight(newHeight) {
    this.lastCategoryHeight = newHeight;
    this.forceUpdate();
  }

  renderCategories(categories) {
    const { suggestAllFromCategory, query } = this.props;

    const lastIndex = categories.length - 1;

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

      if (index === lastIndex) {
        // Track last category's DOM element height to use in dynamic bottom padding height calculation
        return (
          <ReactHeight key={ cat.id } onHeightReady={ this.updateLastCategoryHeight.bind(this) }>
            { searchCategory }
          </ReactHeight>
        );

      } else {
        return <div key={ cat.id }>{ searchCategory }</div>;
      }

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
    const { query, activeCategory } = this.props;
    let categories;

    if (!this.isLongEnoughQuery(query)) {
      categories = [
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

    } else {
      categories = this.getCategoriesWithSuggestions();
    }

    return (
      <div className={ style.searchPage }>
        <Sticky
          id='search-page-header'
          onStickyStateChange={ (isSticky) => { this.blurSearchInput(isSticky); } }
          >

          <ClearableInput
            ref={ (instance) => { this.searchInput = instance; } }
            className='sheet-header header query-input'
            value={ query }
            placeholder='Search'
            onChange={ (e) => { this.onInputChange(e); } }
            onClear={ () => { this.props.inputChanged(''); } }
          />

          <SearchNavbar
            categories={ categories }
            activeCategory={ activeCategory }
            scrollToCategory={ this.scrollToCategory }
          />
        </Sticky>

        <div className='category-details-container'>
          { this.renderCategories(categories) }
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

SearchPage.defaultProps = {
  inputChanged: () => {}
};
