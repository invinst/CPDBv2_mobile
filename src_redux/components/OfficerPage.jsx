import React from 'react';

import SimpleTab from 'components/Shared/SimpleTab';
import ComplaintsTab from 'components/OfficerPage/ComplaintsTab';
import SummaryTab from 'components/OfficerPage/SummaryTab';
import RelatedOfficersTab from 'components/OfficerPage/RelatedOfficersTab';
import SearchablePageContainer from 'containers/Shared/SearchablePageContainer';
import OfficerHeader from 'components/OfficerPage/OfficerHeader';
import NotMatchedOfficerPage from 'components/OfficerPage/NotMatchedOfficerPage';
import LoadingPage from 'components/Shared/LoadingPage';
import OfficerPagePresenter from 'presenters/Page/OfficerPagePresenter';
import GaUtil from 'utils/GaUtil';

import style from 'styles/OfficerPage.sass';


const OfficerPage = React.createClass({
  componentDidMount() {
    const { getOfficer, pk } = this.props;
    getOfficer({ pk: pk });
    GaUtil.track('event', 'officer', 'view_detail', location.pathname);
  },

  render() {
    const { loading, found, officer, pk } = this.props;
    const presenter = OfficerPagePresenter(officer);

    if (loading) {
      return (
        <LoadingPage />
      );
    }

    if (!found) {
      return (
        <NotMatchedOfficerPage id={ pk } />
      );
    }

    return (
      <SearchablePageContainer>
        <div className={ style.officerPage }>
          <div className='content'>
            <div className='officer-header'>
              <OfficerHeader officer={ presenter.officerDetail } />
            </div>
            <div className='tabs'>
              <SimpleTab navigation={ true }>
                <div>
                  <div className='tab-summary' tabIdentifier='summary'>Summary</div>
                  <div className='tab-complaints' tabIdentifier='complaints'>Complaints</div>
                  <div className='tab-co-accused' tabIdentifier='coaccused'>Co-accused</div>
                </div>
                <div className='officer-page-content'>
                  <div>
                    <SummaryTab officer={ presenter.officerDetail } distribution={ presenter.distribution } />
                  </div>
                  <div>
                    <ComplaintsTab officer={ presenter.officerDetail } complaints={ presenter.complaints } />
                  </div>
                  <div>
                    <RelatedOfficersTab coAccused={ presenter.coAccused } />
                  </div>
                </div>
              </SimpleTab>
            </div>
          </div>
        </div>
      </SearchablePageContainer>
    );
  }
});

export default OfficerPage;
