import React, { Component, PropTypes } from 'react';
import ReactHeight from 'react-height';
import { browserHistory } from 'react-router';
import { isEmpty, noop } from 'lodash';
import cx from 'classnames';

import constants from 'constants';
import { goUp, instantScrollToTop } from 'utils/navigation-util';
import SearchCategory from './search-category';
import { showIntercomLauncher } from 'utils/intercom';
import style from './search-page.sass';
import * as IntercomTracking from 'utils/intercom-tracking';
import { generatePinboardUrl } from 'utils/pinboard';
import PinboardBar from './pinboard-bar';


const RECENT_CATEGORY = {
  name: 'RECENT',
  id: 'recent',
};

export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.handleEmptyPinboardButtonClick = this.handleEmptyPinboardButtonClick.bind(this);
    this.clearChosenCategory = this.clearChosenCategory.bind(this);
    this.backToFullSearchHandler = this.backToFullSearchHandler.bind(this);
  }

  componentDidMount() {
    const {
      pushBreadcrumbs,
      location,
      routes,
      params,
      recentSuggestionIds,
      fetchRecentSearchItems,
      recentSuggestionsRequested,
      fetchedEmptyRecentSearchItems,
    } = this.props;

    if (!recentSuggestionsRequested) {
      if (isEmpty(recentSuggestionIds)) {
        fetchedEmptyRecentSearchItems();
      } else {
        const { officerIds, crids, trrIds } = recentSuggestionIds;
        fetchRecentSearchItems(officerIds, crids, trrIds);
      }
    }

    pushBreadcrumbs({ location, routes, params });
    this.searchInput.focus();
    IntercomTracking.trackSearchPage();
    showIntercomLauncher(false);
    this.updateResults();
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

  getCategoriesWithSuggestions() {
    return constants.SEARCH_CATEGORIES.filter((cat) => !isEmpty(this.props[cat.id]));
  }

  updateLastCategoryHeight(newHeight) {
    this.lastCategoryHeight = newHeight;
    this.forceUpdate();
  }

  chooseCategory(category) {
    const { updateChosenCategory } = this.props;
    updateChosenCategory(category.id);
  }

  clearChosenCategory() {
    const { updateChosenCategory } = this.props;
    updateChosenCategory('');
  }

  backToFullSearchHandler() {
    this.clearChosenCategory();
    instantScrollToTop();
  }

  renderCategories(categories) {
    const {
      chosenCategory,
      saveToRecent,
      updateActiveCategory,
      activeCategory,
      addOrRemoveItemInPinboard,
      getSuggestionWithContentType,
      query,
      nextParams,
      hasMore,
    } = this.props;
    const lastIndex = categories.length - 1;

    return categories.map((cat, index) => {
      const showAllButton = (
        cat.id !== 'recent' &&
        chosenCategory === ''
      );

      const searchCategory = (
        <SearchCategory
          categoryId={ cat.id }
          categoryPath={ cat.path }
          allButtonClickHandler={ this.chooseCategory.bind(this, cat) }
          showAllButton={ showAllButton }
          title={ cat.longName || cat.name }
          items={ this.props[cat.id] }
          saveToRecent={ saveToRecent }
          updateActiveCategory={ updateActiveCategory }
          activeCategory={ activeCategory }
          addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
          getSuggestionWithContentType={ getSuggestionWithContentType }
          query={ query }
          nextParams={ nextParams }
          hasMore={ hasMore }
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

  handleEmptyPinboardButtonClick() {
    const { createPinboard } = this.props;

    createPinboard({ 'officerIds': [], crids: [], 'trrIds': [] }).then(response => {
      const pinboard = response.payload;
      const url = generatePinboardUrl(pinboard);

      if (!isEmpty(url)) {
        browserHistory.push(url);
      }
    });
  }

  render() {
    const { query, queryPrefix, chosenCategory, router, pinboard, recent } = this.props;
    let categories = [];

    if (!this.isLongEnoughQuery(query)) {
      if (!isEmpty(recent)) {
        categories = [RECENT_CATEGORY];
      }
    } else if (chosenCategory !== '') {
      categories = constants.SEARCH_CATEGORIES.filter(cat => cat.id === chosenCategory);
    } else {
      categories = this.getCategoriesWithSuggestions();
    }

    const searchText = `${queryPrefix ? `${queryPrefix}:` : ''}${query}`;

    return (
      <div className={ style.searchPage }>
        <div
          className={ style.sticky }
          id='search-page-header'
        >

          <div className='input-container'>
            <input
              ref={ (instance) => { this.searchInput = instance; } }
              className='query-input'
              value={ searchText }
              spellCheck={ false }
              autoComplete='off'
              autoCorrect='off'
              autoCapitalize='off'
              placeholder='Officer name, badge number or date'
              onChange={ (e) => { this.onInputChange(e); } }
            />

            <button
              className={ cx('bt-cancel', { 'active': query !== '' } ) }
              onClick={ goUp.bind(this, router, window.location.pathname) }>
              Cancel
            </button>
          </div>

          <PinboardBar
            pinboard={ pinboard }
            onEmptyPinboardButtonClick={ this.handleEmptyPinboardButtonClick } />
        </div>

        <div className='category-details-container'>
          { this.renderCategories(categories) }
        </div>
        {
          !isEmpty(chosenCategory) &&
          (
            <a className='back-to-full-search-link' onClick={ this.backToFullSearchHandler }>
              Return to full search results
            </a>
          )
        }
        <a className='back-to-front-page-link' href='/'>Back to Front Page</a>
      </div>
    );
  }
}

SearchPage.propTypes = {
  query: PropTypes.string,
  queryPrefix: PropTypes.string,
  inputChanged: PropTypes.func,
  queryChanged: PropTypes.func,
  suggestTerm: PropTypes.func,
  officers: PropTypes.array,
  crs: PropTypes.array,
  trrs: PropTypes.array,
  dateCRs: PropTypes.array,
  investigatorCRs: PropTypes.array,
  dateTRRs: PropTypes.array,
  dateOfficers: PropTypes.array,
  recent: PropTypes.array,
  fetchRecentSearchItems: PropTypes.func,
  saveToRecent: PropTypes.func,
  activeCategory: PropTypes.string,
  chosenCategory: PropTypes.string,
  updateActiveCategory: PropTypes.func,
  updateChosenCategory: PropTypes.func,
  router: PropTypes.object,
  pushBreadcrumbs: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
  pinboard: PropTypes.object,
  addOrRemoveItemInPinboard: PropTypes.func,
  createPinboard: PropTypes.func,
  recentSuggestionIds: PropTypes.object,
  recentSuggestionsRequested: PropTypes.bool,
  fetchedEmptyRecentSearchItems: PropTypes.func,
  getSuggestionWithContentType: PropTypes.func,
  nextParams: PropTypes.object,
  hasMore: PropTypes.bool,
};

SearchPage.defaultProps = {
  query: '',
  inputChanged: noop,
  updateChosenCategory: noop,
  chosenCategory: '',
  pushBreadcrumbs: noop,
  createPinboard: noop,
  suggestTerm: noop,
  queryChanged: noop,
  saveToRecent: noop,
  fetchRecentSearchItems: noop,
  recentSuggestionIds: {},
  recentSuggestionsRequested: false,
  fetchedEmptyRecentSearchItems: noop,
};
