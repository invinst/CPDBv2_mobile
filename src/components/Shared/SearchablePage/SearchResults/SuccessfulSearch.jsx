import React from 'react';
import OfficerResultContainer
  from 'containers/Shared/SearchablePage/SearchResults/SuccessfulSearch/OfficerResultContainer';
import ComplaintResultContainer
  from 'containers/Shared/SearchablePage/SearchResults/SuccessfulSearch/ComplaintResultContainer';
import SuggestionPresenter from 'presenters/SuggestionPresenter';

import style from 'styles/Shared/SearchablePage/SearchResults/SuccessfulSearch.sass';

const SuccessfulSearch = React.createClass({
  propTypes: {
    term: React.PropTypes.string,
    suggestions: React.PropTypes.array
  },

  getSubComponentFor(type) {
    const subComponentMapper = {
      'officer': OfficerResultContainer,
      'officer_allegation': ComplaintResultContainer
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
