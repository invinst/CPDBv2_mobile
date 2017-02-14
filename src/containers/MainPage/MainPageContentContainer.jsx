import { connect } from 'react-redux';

import MainPageContent from 'components/MainPage/MainPageContent';
import { requestLandingPage } from 'actions/landing-page';
import { requestReportingPage } from 'actions/reporting-page';


function mapStateToProps(state, ownProps) {
  return {
    isSearchFocused: state.suggestionApp.isSearchFocused,
    vftgSection: state.landingPage.vftgSection,
    aboutSection: state.landingPage.aboutSection,
    collaborateSection: state.landingPage.collaborateSection,
    faqSection: state.landingPage.faqSection
  };
}

const mapDispatchToProps = {
  requestLandingPage,
  requestReportingPage
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContent);
