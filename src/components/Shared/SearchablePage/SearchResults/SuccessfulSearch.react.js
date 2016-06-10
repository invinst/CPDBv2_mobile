import React from 'react';
import OfficerResult from 'components/Shared/SearchablePage/SearchResults/SuccessfulSearch/OfficerResult.react';
import ComplaintResult from 'components/Shared/SearchablePage/SearchResults/SuccessfulSearch/ComplaintResult.react';
import SuggestionPresenter from 'presenters/SuggestionPresenter';

import style from 'styles/Shared/SearchablePage/SearchResults/SuccessfulSearch.sass';

const SuccessfulSearch = React.createClass({
  propTypes: {
    term: React.PropTypes.string,
    suggestions: React.PropTypes.array
  },

  getSubComponentFor(type) {
    const subComponentMapper = {
      'officer': OfficerResult,
      'officer_allegation': ComplaintResult
    };

    return subComponentMapper[type];
  },

  renderSuggestionItem() {
    const suggestions = this.props.suggestions;
    const suggestionType = SuggestionPresenter(suggestions[0]).resource;
    const term = this.props.term;
    const SubComponent = this.getSubComponentFor(suggestionType);

    return (
      <SubComponent term={ term } suggestions={ suggestions }/>
    );
  },

  render() {
    return (
      <div className={ style.successfulSearch }>
        { this.renderSuggestionItem() }
      </div>
    );
  }
});

export default SuccessfulSearch;
