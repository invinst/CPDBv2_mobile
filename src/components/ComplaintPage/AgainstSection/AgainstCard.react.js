import React from 'react';
import AppHistory from 'utils/History';
import u from 'utils/HelperUtil';
import InvestigationTimeline from 'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline.react';
import OfficerCard from 'components/Shared/OfficerCard.react';
import OfficerPresenter from 'presenters/OfficerPresenter';
import Wrapper from 'components/Shared/Wrapper.react';


const AgainstCard = React.createClass({
  propTypes: {
    allegation: React.PropTypes.object,
    officerAllegation: React.PropTypes.object,
    shouldRenderTimelineOutside: React.PropTypes.bool
  },

  _onClick(officerPresenter) {
    AppHistory.push(officerPresenter.url);
  },

  render() {
    const officerAllegation = this.props.officerAllegation;
    const officerPresenter = OfficerPresenter(u.fetch(officerAllegation, 'officer', {}));
    const allegation = this.props.allegation;

    return (
      <div className='against-card'>
        <div onClick={ this._onClick.bind(this, officerPresenter) }>
          <OfficerCard displayName={ officerPresenter.displayName }
            description={ officerPresenter.description }
            officerId={ officerPresenter.id }
            allegationsCount={ officerPresenter.allegationsCount }/>
        </div>
        <Wrapper visible={ !this.props.shouldRenderTimelineOutside } wrapperClass='timeline'>
          <InvestigationTimeline allegation={ allegation } officerAllegation={ officerAllegation }/>
        </Wrapper>
      </div>
    );
  }
});

export default AgainstCard;
