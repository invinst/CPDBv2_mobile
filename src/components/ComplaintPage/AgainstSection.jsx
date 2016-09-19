import React from 'react';
import CollectionUtil from 'utils/CollectionUtil';
import AgainstCard from 'components/ComplaintPage/AgainstSection/AgainstCard';
import InvestigationTimeline from 'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline';
import Wrapper from 'components/Shared/Wrapper';


const AgainstSection = React.createClass({
  propTypes: {
    allegation: React.PropTypes.object,
    officerAllegations: React.PropTypes.array
  },

  renderAgainstCard(shouldRenderTimelineOutside) {
    const allegation = this.props.allegation;

    return officerAllegation => {
      return (
        <AgainstCard key={ officerAllegation.id } allegation={ allegation }
          officerAllegation={ officerAllegation }
          shouldRenderTimelineOutside={ shouldRenderTimelineOutside } />
      );
    };
  },

  render() {
    const officerAllegations = this.props.officerAllegations || [];
    const officerAllegation = CollectionUtil.first(officerAllegations);
    const numberOfOfficerAllegations = officerAllegations.length || 1;
    const sameTimeline = CollectionUtil.isSameAllFields(officerAllegations, ['start_date', 'end_date']);
    const moreThanOneOfficer = numberOfOfficerAllegations > 1;
    const shouldRenderTimelineOutside = sameTimeline && moreThanOneOfficer;

    return (
      <div className='against-section'>
        <Wrapper visible={ shouldRenderTimelineOutside } wrapperClass='timeline'>
          <InvestigationTimeline allegation={ this.props.allegation } officerAllegation={ officerAllegation }/>
        </Wrapper>
        <div className='row section-header'>
          <span className='section-title bold pad'>Against ({ numberOfOfficerAllegations })</span>
        </div>
        { officerAllegations.map(this.renderAgainstCard(shouldRenderTimelineOutside)) }
      </div>
    );
  }
});

export default AgainstSection;
