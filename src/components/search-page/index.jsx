import React, { Component, PropTypes } from 'react';
import ReactHeight from 'react-height';

import constants from 'constants';
import { scrollToElement, goUp } from 'utils/NavigationUtil';
import SearchCategory from './search-category';
import SearchNavbar from './search-navbar';
import ClearableInput from './clearable-input';
import style from './search-page.sass';


export default class SearchPage extends Component {
  componentDidMount() {
    this.searchInput.inputElement.focus();
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

  chooseCategory(category) {
    const { query, suggestAllFromCategory, updateChosenCategory } = this.props;
    suggestAllFromCategory(category.path, query);
    updateChosenCategory(category.id);
  }

  renderCategories(categories) {
    const lastIndex = categories.length - 1;

    return categories.map((cat, index) => {
      const showAllButton = (
        cat.id !== 'recent' &&
        cat.id !== 'suggested' &&
        this.props.chosenCategory === ''
      );
      const searchCategory = (
        <SearchCategory
          categoryId={ cat.id }
          allButtonClickHandler={ this.chooseCategory.bind(this, cat) }
          showAllButton={ showAllButton }
          title={ cat.longName || cat.name }
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
      constants.QUERY_INPUT_HEIGHT +
      constants.SEARCH_CATEGORY_LINKS_HEIGHT +
      2 * constants.NEW_DIVIDER_WEIGHT +
      lastCategoryHeight
    );
    const height = Math.max(constants.BOTTOM_PADDING, window.innerHeight - dynamicBottomPaddingOffset);
    return {
      height: `${height}px`
    };
  }

  render() {
    const { query, activeCategory, chosenCategory, router } = this.props;
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

    } else if (chosenCategory !== '') {
      categories = constants.SEARCH_CATEGORIES.filter(cat => cat.id === chosenCategory);

    } else {
      categories = this.getCategoriesWithSuggestions();
    }

    return (
      <div className={ style.searchPage }>
        <div
          className={ style.sticky }
          id='search-page-header'
          >

          <div className='input-container'>
            <ClearableInput
              ref={ (instance) => { this.searchInput = instance; } }
              className='query-input'
              value={ this.props.query }
              placeholder='Search'
              onChange={ (e) => { this.onInputChange(e); } }
              onClear={ () => { this.props.inputChanged(''); } }
            />

            <button
              className='bt-cancel'
              onClick={ goUp.bind(this, router, window.location.pathname) }>
              Cancel
            </button>
          </div>

          <SearchNavbar
            categories={ categories }
            activeCategory={ activeCategory }
            scrollToCategory={ this.scrollToCategory }
            updateActiveCategory={ this.props.updateActiveCategory }
            chosenCategory={ this.props.chosenCategory }
            clearChosenCategory={ this.props.updateChosenCategory.bind(this, '') }
          />

        </div>

        <div className='category-details-container'>
          { this.renderCategories(categories) }
        </div>

        <div style={ this.calculateDynamicBottomPaddingStyle() } className='bottom-padding'/>
      </div>
    );
  }
}

SearchPage.propTypes = {
  query: PropTypes.string,
  inputChanged: PropTypes.func,
  suggestTerm: PropTypes.func,
  officers: PropTypes.object,
  suggestAllFromCategory: PropTypes.func,
  categories: PropTypes.array,
  saveToRecent: PropTypes.func,
  activeCategory: PropTypes.string,
  chosenCategory: PropTypes.string,
  updateActiveCategory: PropTypes.func,
  updateChosenCategory: PropTypes.func,
  router: PropTypes.object
};

SearchPage.defaultProps = {
  inputChanged: function () {},
  updateChosenCategory: function () {},
  chosenCategory: ''
};
