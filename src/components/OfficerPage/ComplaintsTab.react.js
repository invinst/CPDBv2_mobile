import React from 'react';
import u from 'utils/HelperUtil';
import OfficerAllegationItem from 'components/Shared/OfficerAllegationItem.react';
import style from 'styles/OfficerPage/ComplaintsTab.sass';


const ComplaintsTab = React.createClass({
  propTypes: {
    officer: React.PropTypes.object,
    complaints: React.PropTypes.array
  },

  renderComplaintItem(complaint) {
    const officerAllegations = u.fetch(complaint, 'officer_allegation_set', []);
    const officer = this.props.officer;
    const officerAllegation = officerAllegations.find(officerAllegation => officer['id'] == u.fetch(officerAllegation, 'officer.id'));

    return (
      <div key={ complaint['crid'] }>
        <OfficerAllegationItem officerAllegation={ officerAllegation } officerAllegations={ officerAllegations }
          allegation={ complaint }/>
      </div>
    );
  },

  render() {
    const complaints = this.props.complaints;

    return (
      <div className={ style.complaintsTab }>
        { complaints.map(this.renderComplaintItem) }
      </div>
    );
  }
});

export default ComplaintsTab;
