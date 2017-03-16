import React, { Component, PropTypes } from 'react';
import style from 'styles/SearchCategory.sass';
import OfficerSearchResult from 'components/SearchPage/OfficerSearchResult';
import FaqSearchResult from 'components/SearchPage/FaqSearchResult';
import ReportSearchResult from 'components/SearchPage/ReportSearchResult';
import SuggestedSearchResult from 'components/SearchPage/SuggestedSearchResult';

const DEFAULT_CATEGORY_LENGTH = 10;

export default class SearchCategory extends Component {

  renderAllButton(isShowingAll, itemsLength, requestAll) {
    // FIXME: API server should return some kind of `hasMore` value so that we
    // don't have to check manually on client side.
    if (!isShowingAll && itemsLength >= DEFAULT_CATEGORY_LENGTH) {
      return <div className='all' onClick={ requestAll }>ALL</div>;
    } else {
      return null;
    }
  }

  renderResults() {
    const { saveToRecent, categoryId, items } = this.props;

    switch (categoryId) {
      case 'officers':
        return items.map((data, index) => (
          <OfficerSearchResult officer={ data } key={ index } saveToRecent={ saveToRecent }/>
        ));
      case 'faqs':
        return items.map((data, index) => (
          <FaqSearchResult faq={ data } key={ index } saveToRecent={ saveToRecent }/>
        ));
      case 'reports':
        return items.map((data, index) => (
          <ReportSearchResult report={ data } key={ index } saveToRecent={ saveToRecent }/>
        ));
      case 'recent':
      case 'suggested':
        return items.map((data, index) => (
          <SuggestedSearchResult item={ data } key={ index } saveToRecent={ saveToRecent }/>
        ));
      default:
        return null;
    }
  }

  render() {
    const { title, items, categoryId, requestAll, isShowingAll } = this.props;
    const results = this.renderResults();

    return (
      <div className={ style.searchCategory }>
        <div className='title' id={ 'search-category-' + categoryId }>
          { title }
        </div>
        <div className={ `body ${categoryId}` }>
          <div>
            { results }
          </div>
          { this.renderAllButton(isShowingAll, items.length, requestAll) }
        </div>
      </div>
    );
  }
}

SearchCategory.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  categoryId: PropTypes.string,
  isShowingAll: PropTypes.bool,
  requestAll: PropTypes.func,
  saveToRecent: PropTypes.func
};
