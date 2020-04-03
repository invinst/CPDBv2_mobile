import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHeight from 'react-height';
import { isEmpty, noop } from 'lodash';
import cx from 'classnames';

import browserHistory from 'utils/history';
import { instantScrollToTop } from 'utils/navigation-util';
import SearchCategory from './search-category';
import { showIntercomLauncher } from 'utils/intercom';
import style from './search-page.sass';
import * as IntercomTracking from 'utils/intercom-tracking';
import { generatePinboardUrl } from 'utils/pinboard';
import PinboardBar from './pinboard-bar';


export default class SearchPage extends Component {
  componentDidMount() {
    const {
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

  updateLastCategoryHeight = (newHeight) => {
    this.lastCategoryHeight = newHeight;
    this.forceUpdate();
  };

  chooseCategory(category) {
    const { updateChosenCategory } = this.props;
    updateChosenCategory(category.id);
  }

  clearChosenCategory = () => {
    const { updateChosenCategory } = this.props;
    updateChosenCategory('');
  };

  handleGoBack = e => {
    !isEmpty(e) && e.preventDefault();
    const { cancelPathname } = this.props;
    browserHistory.push(cancelPathname);
  };

  backToFullSearchHandler = () => {
    this.clearChosenCategory();
    instantScrollToTop();
  };

  renderCategories() {
    const {
      categories,
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
      const searchCategory = (
        <SearchCategory
          categoryId={ cat.id }
          categoryPath={ cat.path }
          allButtonClickHandler={ this.chooseCategory.bind(this, cat) }
          showAllButton={ cat.showAllButton }
          title={ cat.longName || cat.name }
          items={ cat.items }
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
          <ReactHeight key={ cat.id } onHeightReady={ this.updateLastCategoryHeight }>
            { searchCategory }
          </ReactHeight>
        );

      } else {
        return <div key={ cat.id }>{ searchCategory }</div>;
      }
    });
  }

  handleEmptyPinboardButtonClick = () => {
    const { createPinboard } = this.props;

    createPinboard({ 'officerIds': [], crids: [], 'trrIds': [] }).then(response => {
      const pinboard = response.payload;
      const url = generatePinboardUrl(pinboard);

      if (!isEmpty(url)) {
        browserHistory.push(url);
      }
    });
  };

  render() {
    const { query, queryPrefix, chosenCategory, pinboard } = this.props;

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
              className={ cx('bt-close', { 'active': query !== '' } ) }
              onClick={ this.handleGoBack }>
              Close
            </button>
          </div>

          <PinboardBar
            pinboard={ pinboard }
            onEmptyPinboardButtonClick={ this.handleEmptyPinboardButtonClick } />
        </div>

        <div className='category-details-container'>
          { this.renderCategories() }
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
  fetchRecentSearchItems: PropTypes.func,
  saveToRecent: PropTypes.func,
  activeCategory: PropTypes.string,
  chosenCategory: PropTypes.string,
  updateActiveCategory: PropTypes.func,
  updateChosenCategory: PropTypes.func,
  router: PropTypes.object,
  pinboard: PropTypes.object,
  addOrRemoveItemInPinboard: PropTypes.func,
  createPinboard: PropTypes.func,
  recentSuggestionIds: PropTypes.object,
  recentSuggestionsRequested: PropTypes.bool,
  fetchedEmptyRecentSearchItems: PropTypes.func,
  getSuggestionWithContentType: PropTypes.func,
  nextParams: PropTypes.object,
  hasMore: PropTypes.bool,
  cancelPathname: PropTypes.string,
  categories: PropTypes.array,
};

SearchPage.defaultProps = {
  query: '',
  inputChanged: noop,
  updateChosenCategory: noop,
  chosenCategory: '',
  createPinboard: noop,
  suggestTerm: noop,
  queryChanged: noop,
  saveToRecent: noop,
  fetchRecentSearchItems: noop,
  recentSuggestionIds: {},
  recentSuggestionsRequested: false,
  fetchedEmptyRecentSearchItems: noop,
  cancelPathname: '/',
  categories: [],
};
