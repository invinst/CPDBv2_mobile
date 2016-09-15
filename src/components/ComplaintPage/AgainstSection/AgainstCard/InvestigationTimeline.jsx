import React from 'react';
import AllegationPresenter from 'presenters/AllegationPresenter';
import OfficerAllegationPresenter from 'presenters/OfficerAllegationPresenter';
import ThreeNodesTimeline from
  'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline/ThreeNodesTimeline';
import TwoNodesTimeline from
  'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline/TwoNodesTimeline';
import Wrapper from 'components/Shared/Wrapper';
import style from 'styles/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline.sass';


const InvestigationTimeline = React.createClass({
  propTypes: {
    allegation: React.PropTypes.object,
    officerAllegation: React.PropTypes.object
  },

  renderTimeline(startInvestigatingAtIncidentDate) {
    const TimelineComponent = startInvestigatingAtIncidentDate ? TwoNodesTimeline : ThreeNodesTimeline;

    return (
      <TimelineComponent allegation={ this.props.allegation } officerAllegation={ this.props.officerAllegation }/>
    );
  },

  render() {
    const presenter = OfficerAllegationPresenter(this.props.officerAllegation);
    const allegationPresenter = AllegationPresenter(this.props.allegation);
    const incidentDate = allegationPresenter.incidentDate;

    const startInvestigatingAtIncidentDate = presenter.startInvestigatingAt(incidentDate);

    return (
      <Wrapper visible={ presenter.haveEnoughDataForTimeline(incidentDate) }
        wrapperClass={ style.investigationTimeline }>
        { this.renderTimeline(startInvestigatingAtIncidentDate) }
      </Wrapper>
    );
  }
});

export default InvestigationTimeline;
