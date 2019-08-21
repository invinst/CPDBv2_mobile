import { connect } from 'react-redux';

import AboutPage from 'components/about-page';


function mapStateToProps(state, ownProps) {
  return {
    content: state.landingPage.aboutSection.aboutContent,
  };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
