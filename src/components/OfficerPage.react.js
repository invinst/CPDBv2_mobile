import React from 'react';
import objectAssign from 'object-assign';
import Base from 'components/Base.react';
import SimpleTab from 'components/Shared/SimpleTab.react';
import ComplaintsTab from 'components/OfficerPage/ComplaintsTab.react';
import SearchablePage from 'components/Shared/SearchablePage.react';
import SummaryTab from 'components/OfficerPage/SummaryTab.react';
import RelatedOfficersTab from 'components/OfficerPage/RelatedOfficersTab.react';
import OfficerHeader from 'components/OfficerPage/OfficerHeader.react';
import NotMatchedOfficerPage from 'components/OfficerPage/NotMatchedOfficerPage.react';
import LoadingPage from 'components/Shared/LoadingPage.react';
import OfficerPageServerActions from 'actions/OfficerPage/OfficerPageServerActions';
import OfficerResourceUtil from 'utils/OfficerResourceUtil';
import OfficerPageStore from 'stores/OfficerPage/OfficerPageStore';
import OfficerPagePresenter from 'presenters/Page/OfficerPagePresenter';
import style from 'styles/OfficerPage.sass';


const OfficerPage = React.createClass(objectAssign(Base(OfficerPageStore), {
  getInitialState() {
    return {
      'officer': {
        'detail': null,
        'complaints': [],
        'co_accused': []
      },
      loading: true,
      found: false
    };
  },

  componentWillReceiveProps(nextProps) {
    const id = nextProps.params.id || '';
    //ga('send', 'event', 'officer', 'view_detail', location.pathname);
    OfficerResourceUtil.get(id);
    // The way react-router handle the same resource url leads to the issue that this React component is not remount
    // again, so we need to put this action here. It's not a cool solution anyway.
    OfficerPageServerActions.reload();
  },

  componentDidMount() {
    const id = this.props.params.id || '';
    //ga('send', 'event', 'officer', 'view_detail', location.pathname);
    OfficerPageStore.addChangeListener(this._onChange);
    OfficerResourceUtil.get(id);
  },

  render() {
    const loading = this.state.loading;
    const found = this.state.found;
    const officer = this.state.officer;

    const presenter = OfficerPagePresenter(officer);

    if (loading) {
      return (
        <LoadingPage />
      );
    }

    if (!found) {
      return (
        <NotMatchedOfficerPage id={ this.state.pk } />
      );
    }

    return (
      <SearchablePage>
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
                    <RelatedOfficersTab coAccused={ presenter.coAccused }/>
                  </div>
                </div>
              </SimpleTab>
            </div>
          </div>
        </div>
      </SearchablePage>
    );
  }
}));

export default OfficerPage;
