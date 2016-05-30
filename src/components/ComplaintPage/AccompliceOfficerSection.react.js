import pluralize from 'pluralize';
import React from 'react';
import Wrapper from 'components/Shared/Wrapper.react';
import OfficerCard from 'components/Shared/OfficerCard.react';
import u from 'utils/HelperUtil';
import OfficerPresenter from 'presenters/OfficerPresenter';
import AppHistory from 'utils/History';


const AccompliceOfficerSection = React.createClass({
  propTypes: {
    officerAllegations: React.PropTypes.array
  },

  _onClick(officerPresenter) {
    AppHistory.pushState(null, officerPresenter.url);
  },

  renderOfficerRow(officerAllegation) {
    const officer = u.fetch(officerAllegation, 'officer', {});
    const officerPresenter = OfficerPresenter(officer);

    return (
      <div onClick={ this._onClick.bind(this, officerPresenter) } key={ officer.id }>
        <OfficerCard
          officerId={ officerPresenter.id }
          allegationsCount={ officerPresenter.allegationsCount }
          displayName={ officerPresenter.displayName }
          description={ officerPresenter.description }
        />
      </div>
    );
  },

  renderOfficerList(officerAllegations) {
    return (
      <div className='officer-list'>
        { officerAllegations.map(this.renderOfficerRow) }
      </div>
    );
  },

  render() {
    const officerAllegations = this.props.officerAllegations || [];
    const numberOfOfficerAllegations = officerAllegations.length;

    return (
      <Wrapper wrapperClass='accomplice-officer-section' visible={ numberOfOfficerAllegations > 0 }>
        <div className='row section-header'>
          <span className='pad'>
            <span className='section-title bold'>
              Accomplice { pluralize('Officer', numberOfOfficerAllegations, false) } &nbsp;
            </span>
            <span className='title-count normal-weight'>({ numberOfOfficerAllegations })</span>
          </span>
        </div>
        { this.renderOfficerList(officerAllegations) }
      </Wrapper>
    );
  }
});

export default AccompliceOfficerSection;
