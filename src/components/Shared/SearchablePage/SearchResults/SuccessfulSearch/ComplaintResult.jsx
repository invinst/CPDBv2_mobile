import cx from 'classnames';
import React from 'react';
import CollectionUtil from 'utils/CollectionUtil';
import SuggestionPresenter from 'presenters/SuggestionPresenter';
import ComplaintResultPresenter from 'presenters/Page/ComplaintResultPresenter';
import OfficerAllegationItemContainer from 'containers/Shared/OfficerAllegationItemContainer';
import style from 'styles/Shared/SearchablePage/SearchResults/SuccessfulSearch/ComplaintResult.sass';
import GaUtil from 'utils/GaUtil';


const ComplaintResult = React.createClass({
  propTypes: {
    suggestions: React.PropTypes.array
  },

  onClick() {
    const complaint = this.props.suggestions[0];
    const presenter = SuggestionPresenter(complaint);
    GaUtil.track('event', 'filter', presenter.resource, presenter.text);
  },

  renderAllegation(categoryId, officerAllegations, allegation) {
    const firstOfficerAllegation = CollectionUtil.first(officerAllegations);

    return (
      <div key={ categoryId }>
        <OfficerAllegationItemContainer
          officerAllegation={ firstOfficerAllegation }
          officerAllegations={ officerAllegations }
          allegation={ allegation }/>
      </div>
    );
  },

  renderComplaintResultItem(officerAllegationGroups, allegation) {
    let currentOfficerAllegations, categoryId;
    const results = [];

    for (categoryId in officerAllegationGroups) {
      currentOfficerAllegations = officerAllegationGroups[categoryId];
      results.push(this.renderAllegation(categoryId, currentOfficerAllegations, allegation));
    }

    return results;
  },

  render() {
    const complaint = this.props.suggestions[0];
    const presenter = SuggestionPresenter(complaint);
    const complaintResultPresenter = ComplaintResultPresenter(presenter.meta);

    // FIXME: Fix `suggestion-list` bad convention
    return (
      <ul className='suggestion-list'>
        <li className={ cx(style.complaintResult, 'outer-glow') } onClick={ this.onClick }>
          { this.renderComplaintResultItem(complaintResultPresenter.groupByCategory, presenter.meta) }
        </li>
      </ul>
    );
  }
});

export default ComplaintResult;
