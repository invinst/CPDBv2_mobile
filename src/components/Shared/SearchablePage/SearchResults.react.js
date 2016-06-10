import React from 'react';
import objectAssign from 'object-assign';
import Base from 'components/Base.react';
import FailedSearch from 'components/Shared/SearchablePage/SearchResults/FailedSearch.react';
import SuccessfulSearch from 'components/Shared/SearchablePage/SearchResults/SuccessfulSearch.react';
import Wrapper from 'components/Shared/Wrapper.react';
import SearchResultsStore from 'stores/MainPage/SearchResultsStore';
import LoadingPage from 'components/Shared/LoadingPage.react';


const SearchResults = React.createClass(objectAssign(Base(SearchResultsStore), {
  getInitialState() {
    return {
      'searching': 0,
      'success': false,
      'term': '',
      'suggestions': []
    };
  },

  render() {
    if (this.state.searching) {
      return (
        <LoadingPage />
      );
    }

    if (!this.state.success) {
      return (
        <Wrapper wrapperClass='search-results' visible={ !!this.state.term }>
          <FailedSearch term={ this.state.term } />
        </Wrapper>
      );
    }

    return (
      <Wrapper wrapperClass='search-results' visible={ !!this.state.term }>
        <SuccessfulSearch term={ this.state.term } suggestions={ this.state.suggestions } />
      </Wrapper>
    );
  }
}));

export default SearchResults;
