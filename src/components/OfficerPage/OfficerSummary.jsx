import React, { PropTypes, Component } from 'react';
import { Sticky, StickyContainer } from 'react-sticky';

import GaUtil from 'utils/GaUtil';
import LoadingPage from 'components/Shared/LoadingPage';
import NotMatchedOfficerPage from 'components/OfficerPage/NotMatchedOfficerPage';
import OfficerTopLinks from 'components/OfficerPage/OfficerTopLinks';
import SectionRow from 'components/OfficerPage/SectionRow';
import SummaryStatsSection from 'components/OfficerPage/SummaryStatsSection';
import { scrollToTop } from 'utils/NavigationUtil';

import style from 'styles/OfficerPage/OfficerSummary.sass';


class OfficerSummary extends Component {
  componentDidMount() {
    const { summary, getOfficerSummary, pk } = this.props;
    if (!summary) {
      getOfficerSummary(pk);
    }

    GaUtil.track('event', 'officer', 'view_detail', window.location.pathname);
  }


  render() {
    const { loading, found, summary, pk } = this.props;

    if (loading) {
      return (
        <LoadingPage />
      );
    }

    if (!found || !summary) {
      return (
        <NotMatchedOfficerPage id={ pk } />
      );
    }

    return (
      <StickyContainer className={ style.officerSummary }>
        <Sticky>
          <h1 className='sheet-header header' onClick={ scrollToTop() }>
            { summary.name }
          </h1>
        </Sticky>

        <OfficerTopLinks id={ pk } currentPath='summary' />

        <div className='officer-summary-body'>
          <div className='assignment-detail-section'>
            <SectionRow label='Unit' value={ summary.unit } />
            <SectionRow label='Rank' value={ summary.rank } />
            <SectionRow label='Badge' value={ summary.badge } />
            <SectionRow label='2017 Salary' value={ summary.salary /* TODO: API NOT PROVIDED */ } />
            <SectionRow
              label='Career'
              value={ summary.dateOfAppt }
              extraInfo={ summary.yearsSinceDateOfAppt } />
            <SectionRow label='Race' value={ summary.race } />
            <SectionRow label='Sex' value={ summary.sex } />
          </div>

          <SummaryStatsSection name='Complaints' data={ summary.complaints } />
        </div>


      </StickyContainer>
    );
  }
}

OfficerSummary.propTypes = {
  pk: PropTypes.number,
  getOfficerSummary: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  found: PropTypes.bool,
  summary: PropTypes.object,
  children: PropTypes.object
};

export default OfficerSummary;
