import { connect } from 'react-redux';

import TopOfficersByAllegation from 'components/landing-page/top-officers-by-allegation';
import { requestCMS, requestTopOfficersByAllegation } from 'actions/landing-page';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';
import { topOfficersByAllegationSelector, getCMSRequested, getEmbed } from 'selectors/landing-page';
import { cmsSelector } from 'selectors/common/cms';


const mapStateToProps = (state, ownProps) => ({
  topOfficersByAllegation: topOfficersByAllegationSelector(state),
  description: cmsSelector(state, 'landingPage', 'carousel_allegation_desc'),
  title: cmsSelector(state, 'landingPage', 'carousel_allegation_title'),
  cmsRequested: getCMSRequested(state),
  embed: getEmbed(ownProps),
  pinnable: ownProps.pinnable,
});

const mapDispatchToProps = {
  requestCMS,
  requestTopOfficersByAllegation,
  addOrRemoveItemInPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopOfficersByAllegation);
