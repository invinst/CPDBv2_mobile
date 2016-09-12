import React from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';

import u from 'utils/HelperUtil';
import Wrapper from 'components/Shared/Wrapper';
import OfficerCard from 'components/Shared/OfficerCard';
import OfficerPresenter from 'presenters/OfficerPresenter';
import AppHistory from 'utils/History';
import style from 'styles/ComplaintPage/AccompliceOfficerSection.sass';


const AccompliceOfficerSection = React.createClass({
  propTypes: {
    officerAllegations: React.PropTypes.array
  },

  onClick(officerPresenter) {
    AppHistory.push(officerPresenter.url);
  },

  renderOfficerRow(officerAllegation) {
    const officer = u.fetch(officerAllegation, 'officer', {});
    const officerPresenter = OfficerPresenter(officer);

    return (
      <div onClick={ this.onClick.bind(this, officerPresenter) } key={ officer.id }>
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
      <Wrapper wrapperClass={ cx(style.accompliceOfficerSection, 'accomplice-officer-section') }
        visible={ numberOfOfficerAllegations > 0 }>
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
