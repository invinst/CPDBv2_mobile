import { connect } from 'react-redux';

import TopLawsuits from 'components/landing-page/top-lawsuits';
import { requestTopLawsuits } from 'actions/landing-page';
import { topLawsuitsSelector } from 'selectors/landing-page';
import { cmsSelector } from 'selectors/common/cms';


const mapStateToProps = state => ({
  topLawsuits: topLawsuitsSelector(state),
  description: cmsSelector(state, 'landingPage', 'carousel_lawsuit_desc'),
  title: cmsSelector(state, 'landingPage', 'carousel_lawsuit_title'),
});

const mapDispatchToProps = {
  requestTopLawsuits,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopLawsuits);
