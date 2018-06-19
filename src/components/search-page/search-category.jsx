import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import constants from 'constants';
import { getCurrentScrollPosition, instantScrollToTop } from 'utils/navigation-util';
import OfficerSearchResult from './officer-search-result';
import SuggestedSearchResult from './suggested-search-result';
import UnitSearchResult from './unit-search-result';
import style from './search-category.sass';


const fixedHeaderHeight = (
  constants.QUERY_INPUT_HEIGHT + constants.SEARCH_CATEGORY_LINKS_HEIGHT + 2 * constants.NEW_DIVIDER_WEIGHT
);

const resultComponentMappings = {
  officers: OfficerSearchResult,
  units: UnitSearchResult,
  recent: SuggestedSearchResult,
  suggested: SuggestedSearchResult
};

export default class SearchCategory extends Component {

  componentDidMount() {
    const watchActiveState = this.watchActiveState.bind(this);
    window.addEventListener('scroll', watchActiveState);
    this.unwatchActiveState = () => {
      window.removeEventListener('scroll', watchActiveState);
    };
  }

  componentWillUnmount() {
    this.unwatchActiveState();
  }

  watchActiveState() {
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
  }

  renderAllButton() {
    const { showAllButton, allButtonClickHandler } = this.props;
    const onClick = () => {
      allButtonClickHandler();
      instantScrollToTop();
    };

    if (showAllButton) {
      return <div className='all' onClick={ onClick }>ALL</div>;
    } else {
      return null;
    }
  }

  renderResults() {
    const { saveToRecent, categoryId, showAllButton } = this.props;
    const ResultComponent = resultComponentMappings[categoryId];

    if (typeof ResultComponent === 'undefined') {
      return null;
    }

    let items = this.props.items;
    if (showAllButton) {
      items = items.slice(0, 5);
    }

    return <ResultComponent items={ items } saveToRecent={ saveToRecent }/>;
  }

  render() {
    const { title, categoryId, activeCategory } = this.props;
    const results = this.renderResults();

    return (
      <div className={ style.searchCategory } ref={ (domNode) => { this.domNode = domNode; } }>
        <div
          className={ cx('title', { active: activeCategory === categoryId }) }
          id={ 'search-category-' + categoryId }
        >
          { title }
        </div>
        <div className={ `body ${categoryId}` }>
          <div>
            { results }
          </div>
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
  saveToRecent: PropTypes.func,
  activeCategory: PropTypes.string,
  updateActiveCategory: PropTypes.func,
  fixedHeaderHeight: PropTypes.number
};
