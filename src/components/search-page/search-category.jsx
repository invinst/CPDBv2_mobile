import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { QUERY_INPUT_HEIGHT, SEARCH_CATEGORY_LINKS_HEIGHT, NEW_DIVIDER_WEIGHT } from 'constants';
import { getCurrentScrollPosition, instantScrollToTop } from 'utils/navigation-util';
import SearchResult from 'components/search-page/search-result';
import RecentItems from './recent-items';

import style from './search-category.sass';


const fixedHeaderHeight = (
  QUERY_INPUT_HEIGHT + SEARCH_CATEGORY_LINKS_HEIGHT + 2 * NEW_DIVIDER_WEIGHT
);

const resultComponentMappings = {
  dateCRs: SearchResult,
  dateTRRs: SearchResult,
  dateOfficers: SearchResult,
  officers: SearchResult,
  crs: SearchResult,
  investigatorCRs: SearchResult,
  trrs: SearchResult,
  recent: RecentItems,
};

export default class SearchCategory extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.watchActiveState);
    this.unwatchActiveState = () => {
      window.removeEventListener('scroll', this.watchActiveState);
    };
  }

  componentWillUnmount() {
    this.unwatchActiveState();
  }

  watchActiveState = () => {
    // Don't need to do anything if this category is already active
    if (this.props.activeCategory === this.props.categoryId) {
      return;
    }
    const { offsetTop, clientHeight } = this.domNode;
    const scrollPosition = getCurrentScrollPosition();
    const fixedHeaderScrollPosition = scrollPosition + fixedHeaderHeight;
    if (offsetTop <= fixedHeaderScrollPosition && fixedHeaderScrollPosition < offsetTop + clientHeight) {
      this.props.updateActiveCategory(this.props.categoryId);
    }
  };

  renderAllButton() {
    const { showAllButton, allButtonClickHandler, getSuggestionWithContentType, query, categoryPath } = this.props;
    const onClick = () => {
      allButtonClickHandler();
      getSuggestionWithContentType(query, { contentType: categoryPath }).catch(()=>{});
      instantScrollToTop();
    };

    if (showAllButton) {
      return <div className='all' onClick={ onClick }>ALL</div>;
    } else {
      return null;
    }
  }

  renderResults() {
    const {
      categoryId,
      getSuggestionWithContentType,
      query,
      nextParams,
      hasMore,
      items,
    } = this.props;
    const ResultComponent = resultComponentMappings[categoryId];

    if (typeof ResultComponent === 'undefined') {
      return null;
    }

    return (
      <ResultComponent
        itemType={ categoryId }
        items={ items }
        getSuggestionWithContentType={ getSuggestionWithContentType }
        query={ query }
        nextParams={ nextParams }
        hasMore={ hasMore }
      />
    );
  }

  render() {
    const { title, categoryId, activeCategory } = this.props;

    return (
      <div className={ style.searchCategory } ref={ (domNode) => { this.domNode = domNode; } }>
        <div
          className={ cx('title', { active: activeCategory === categoryId }) }
          id={ 'search-category-' + categoryId }
        >
          { title }
        </div>
        <div className={ `results ${categoryId}` }>
          { this.renderResults() }
          { this.renderAllButton() }
        </div>
      </div>
    );
  }
}

SearchCategory.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  categoryId: PropTypes.string,
  showAllButton: PropTypes.bool,
  allButtonClickHandler: PropTypes.func,
  activeCategory: PropTypes.string,
  updateActiveCategory: PropTypes.func,
  fixedHeaderHeight: PropTypes.number,
  getSuggestionWithContentType: PropTypes.func,
  nextParams: PropTypes.object,
  hasMore: PropTypes.bool,
  query: PropTypes.string,
  categoryPath: PropTypes.string,
};
