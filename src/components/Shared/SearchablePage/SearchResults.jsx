import React from 'react';
import FailedSearch from 'components/Shared/SearchablePage/SearchResults/FailedSearch';
import SuccessfulSearch from 'components/Shared/SearchablePage/SearchResults/SuccessfulSearch';
import Wrapper from 'components/Shared/Wrapper';
import LoadingPage from 'components/Shared/LoadingPage';


const SearchResults = React.createClass({
  propTypes: {
    isRequesting: React.PropTypes.bool,
    query: React.PropTypes.string,
    suggestions: React.PropTypes.array,
    isSuccess: React.PropTypes.bool,
    isSearchFocused: React.PropTypes.number
  },

  render() {
    const { isRequesting, query, suggestions, isSuccess, isSearchFocused } = this.props;

    if (isRequesting) {
      return (
        <LoadingPage />
      );
    }

    if (!isSuccess) {
      return (
        <Wrapper wrapperClass='search-results' visible={ !!query }>
          <FailedSearch term={ query } />
        </Wrapper>
      );
    }

    return (
      <Wrapper wrapperClass='search-results' visible={ !!isSearchFocused && !!query }>
        <SuccessfulSearch term={ query } suggestions={ suggestions } />
      </Wrapper>
    );
  }
});

export default SearchResults;
