import React, { Component, PropTypes } from 'react';
import ReactHeight from 'react-height';

import constants from 'constants';
import { scrollToElement, goUp } from 'utils/navigation-util';
import SearchCategory from './search-category';
import SearchNavbar from './search-navbar';
import ClearableInput from './clearable-input';
import { showIntercomLauncher } from 'utils/intercom';
import style from './search-page.sass';
import * as IntercomTracking from 'utils/intercom-tracking';


export default class SearchPage extends Component {
  componentDidMount() {
    const {
      pushBreadcrumbs, location, routes, params
    } = this.props;
    pushBreadcrumbs({ location, routes, params });
    this.searchInput.inputElement.focus();
    IntercomTracking.trackSearchPage();
    showIntercomLauncher(false);
    this.updateResults();
  }

  componentWillReceiveProps(nextProps) {
    const { location, params, routes, pushBreadcrumbs } = nextProps;
    pushBreadcrumbs({ location, params, routes });
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.updateResults();
    }
  }

  componentWillUnmount() {
    showIntercomLauncher(true);
  }

  updateResults() {
    const { query, suggestTerm, queryChanged } = this.props;

    if (this.isLongEnoughQuery(query)) {
      suggestTerm({ term: query }, undefined, '');
    }
    queryChanged(query);
  }

  onInputChange(event) {
    const { inputChanged } = this.props;
    const query = event.currentTarget.value;

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
          categoryFilter={ cat.filter }
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
          name: 'RECENT',
          id: 'recent'
        },
        {
          name: 'SUGGESTED',
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
  queryChanged: PropTypes.func,
  suggestTerm: PropTypes.func,
  officers: PropTypes.object,
  suggestAllFromCategory: PropTypes.func,
  categories: PropTypes.array,
  saveToRecent: PropTypes.func,
  activeCategory: PropTypes.string,
  chosenCategory: PropTypes.string,
  updateActiveCategory: PropTypes.func,
  updateChosenCategory: PropTypes.func,
  router: PropTypes.object,
  pushBreadcrumbs: PropTypes.func,
  requestLandingPage: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
};

SearchPage.defaultProps = {
  inputChanged: function () {},
  updateChosenCategory: function () {},
  chosenCategory: '',
  pushBreadcrumbs: () => {}
};
