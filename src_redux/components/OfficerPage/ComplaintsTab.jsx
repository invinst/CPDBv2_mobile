import React, { PropTypes } from 'react';
import u from 'utils/HelperUtil';
import OfficerAllegationItemContainer from 'containers/Shared/OfficerAllegationItemContainer';
import style from 'styles/OfficerPage/ComplaintsTab.sass';


const ComplaintsTab = React.createClass({
  propTypes: {
    officer: PropTypes.object,
    complaints: PropTypes.array
  },

  renderComplaintItem(complaint) {
    const officerAllegations = u.fetch(complaint, 'officer_allegation_set', []);
    const officer = this.props.officer;
    const officerAllegation =
      officerAllegations.find(officerAllegation => officer['id'] == u.fetch(officerAllegation, 'officer.id'));

    return (
      <div key={ complaint['crid'] }>
        <OfficerAllegationItemContainer
          officerAllegation={ officerAllegation }
          officerAllegations={ officerAllegations }
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

ComplaintsTab.defaultProps = {
  officer: {},
  complaints: []
};

export default ComplaintsTab;
