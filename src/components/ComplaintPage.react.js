import React from 'react';
import objectAssign from 'object-assign';
import Base from 'components/Base.react';
import u from 'utils/HelperUtil';
import GaUtil from 'utils/GaUtil';
import AllegationPresenter from 'presenters/AllegationPresenter';
import AccompliceOfficerSection from 'components/ComplaintPage/AccompliceOfficerSection.react';
import AgainstSection from 'components/ComplaintPage/AgainstSection.react';
import AllegationResourceUtil from 'utils/AllegationResourceUtil';
import ComplainingWitness from 'components/ComplaintPage/ComplainingWitness.react';
import ComplaintPagePresenter from 'presenters/Page/ComplaintPagePresenter';
import ComplaintPageStore from 'stores/ComplaintPage/ComplaintPageStore';
import DocumentSection from 'components/ComplaintPage/DocumentSection.react';
import InvestigatorSection from 'components/ComplaintPage/InvestigatorSection.react';
import LoadingPage from 'components/Shared/LoadingPage.react';
import Location from 'components/ComplaintPage/Location.react';
import NotMatchedCategoryPage from 'components/ComplaintPage/NotMatchedCategoryPage.react';
import NotMatchedComplaintPage from 'components/ComplaintPage/NotMatchedComplaintPage.react';
import OfficerAllegationDetail from 'components/ComplaintPage/OfficerAllegationDetail.react';
import SearchablePage from 'components/Shared/SearchablePage.react';
import ToggleComplaintPage from 'components/ComplaintPage/ToggleComplaintPage.react';
import Wrapper from 'components/Shared/Wrapper.react';
import cx from 'classnames';
import style from 'styles/ComplaintPage.sass'


const ComplaintPage = React.createClass(objectAssign(Base(ComplaintPageStore), {
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
    const crid = u.fetch(this.props, 'params.crid', 0);

    GaUtil.track('event', 'allegation', 'view_detail', location.pathname);
    AllegationResourceUtil.get(crid);
    ComplaintPageStore.addChangeListener(this._onChange);
  },


  render() {
    const found = this.state.found;
    const loading = this.state.loading;
    const data = this.state.data;
    const categoryHashId = u.fetch(this.props, 'params.categoryHashId', 0);
    const presenter = ComplaintPagePresenter(data, categoryHashId);
    const toggle = this.state.toggle;
    const classNames = cx('toggle-page', {'content': toggle}, {'animate': !toggle});
    const allegationPresenter = AllegationPresenter(presenter.allegation);

    // TODO: Think about refactoring this later
    if (loading) {
      return (
        <LoadingPage />
      );
    }

    if (!found) {
      return (
        <NotMatchedComplaintPage crid={ this.state.crid }/>
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
          <ToggleComplaintPage officerAllegations={ presenter.officerAllegations }
            allegation={ presenter.allegation }
            numberOfAllegations={ presenter.numberOfOfficerAllegations }/>
        </div>
        <Wrapper visible={ !toggle }>
          <div >
            <SearchablePage>
              <div className={ style.complaintPage }>
                <div className='container content'>
                  <div className='main-content'>
                    <OfficerAllegationDetail allegation={ presenter.allegation }
                      currentOfficerAllegation={ presenter.currentOfficerAllegation }
                      numberOfAllegations={ presenter.numberOfOfficerAllegations }/>
                    <DocumentSection documents={ allegationPresenter.documents } />
                    <AgainstSection allegation={ presenter.allegation }
                      officerAllegations={ presenter.againstOfficerAllegations }/>
                    <ComplainingWitness complainingWitnesses={ presenter.complainingWitnesses }/>
                    <AccompliceOfficerSection officerAllegations={ presenter.accompliceOfficerAllegation }/>
                    <InvestigatorSection allegation={ presenter.allegation }/>
                    <Location allegation={ presenter.allegation }/>
                  </div>
                </div>
              </div>
            </SearchablePage>
          </div>
        </Wrapper>
      </div>
    );
  }
}));

export default ComplaintPage;
