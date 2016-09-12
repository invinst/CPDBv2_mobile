import React, { PropTypes } from 'react';
import cx from 'classnames';

import u from 'utils/HelperUtil';
import GaUtil from 'utils/GaUtil';
import ComplaintPagePresenter from 'presenters/Page/ComplaintPagePresenter';
import Wrapper from 'components/Shared/Wrapper';
import LoadingPage from 'components/Shared/LoadingPage';
import NotMatchedComplaintPage from 'components/ComplaintPage/NotMatchedComplaintPage';
import NotMatchedCategoryPage from 'components/ComplaintPage/NotMatchedCategoryPage';
import SearchablePageContainer from 'containers/Shared/SearchablePageContainer';
import ToggleComplaintPageContainer from 'containers/ComplaintPage/ToggleComplaintPageContainer';
import OfficerAllegationDetailContainer from 'containers/ComplaintPage/OfficerAllegationDetailContainer';
import AgainstSection from 'components/ComplaintPage/AgainstSection';
import ComplainingWitness from 'components/ComplaintPage/ComplainingWitness';
import AccompliceOfficerSection from 'components/ComplaintPage/AccompliceOfficerSection';
import InvestigatorSection from 'components/ComplaintPage/InvestigatorSection';
import Location from 'components/ComplaintPage/Location';
// import DocumentSection from 'components/ComplaintPage/DocumentSection';
import style from 'styles/ComplaintPage.sass';


const ComplaintPage = React.createClass({
  propTypes: {
    getComplaint: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    found: PropTypes.bool,
    crid: PropTypes.string,
    complaint: PropTypes.object,
    toggle: PropTypes.bool
  },

  getInitialState() {
    return {
      'data': {
        'complaining_witnesses': [],
        'allegation': {}
      },
      loading: true,
      toggle: false
    };
  },

  componentDidMount() {
    const { crid, getComplaint } = this.props;

    GaUtil.track('event', 'allegation', 'view_detail', location.pathname);
    getComplaint({ crid: crid });
  },


  render() {
    const { loading, found, complaint, crid, toggle } = this.props;
    const categoryHashId = u.fetch(this.props, 'params.categoryHashId', 0);
    const presenter = ComplaintPagePresenter(complaint, categoryHashId);
    const classNames = cx('toggle-page', { 'content': toggle }, { 'animate': !toggle });

    // TODO: Think about refactoring this later
    if (loading) {
      return (
        <LoadingPage />
      );
    }

    if (!found) {
      return (
        <NotMatchedComplaintPage crid={ crid }/>
      );
    }

    if (presenter.isInvalidCategory) {
      return (
        <NotMatchedCategoryPage />
      );
    }

    return (
      <div>
        <div className={ classNames }>
          <ToggleComplaintPageContainer
            officerAllegations={ presenter.officerAllegations }
            allegation={ presenter.allegation }
            numberOfAllegations={ presenter.numberOfOfficerAllegations }/>
        </div>
        <Wrapper visible={ !toggle }>
          <div >
            <SearchablePageContainer>
              <div className={ style.complaintPage }>
                <div className='container content'>
                  <div className='main-content'>
                    <OfficerAllegationDetailContainer
                      allegation={ presenter.allegation }
                      currentOfficerAllegation={ presenter.currentOfficerAllegation }
                      numberOfAllegations={ presenter.numberOfOfficerAllegations }/>
                    <AgainstSection
                      allegation={ presenter.allegation }
                      officerAllegations={ presenter.againstOfficerAllegations }/>
                    <ComplainingWitness complainingWitnesses={ presenter.complainingWitnesses }/>
                    <AccompliceOfficerSection officerAllegations={ presenter.accompliceOfficerAllegation }/>
                    <InvestigatorSection allegation={ presenter.allegation }/>
                    <Location allegation={ presenter.allegation }/>
                  </div>
                </div>
              </div>
            </SearchablePageContainer>
          </div>
        </Wrapper>
      </div>
    );
  }
});

export default ComplaintPage;
