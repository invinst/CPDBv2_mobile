import { connect } from 'react-redux';

import TopOfficersByAllegation from 'components/landing-page/top-officers-by-allegation';
import { requestCMS, requestTopOfficersByAllegation } from 'actions/landing-page';
import { topOfficersByAllegationSelector, cmsSelector, getCMSRequested, getEmbed } from 'selectors/landing-page';

const mapStateToProps = (state, ownProps) => ({
  topOfficersByAllegation: topOfficersByAllegationSelector(state),
  description: cmsSelector('carousel_allegation_desc')(state),
  title: cmsSelector('carousel_allegation_title')(state),
  cmsRequested: getCMSRequested(state),
  embed: getEmbed(ownProps),
});

const mapDispatchToProps = {
  requestCMS,
  requestTopOfficersByAllegation
};

export default connect(mapStateToProps, mapDispatchToProps)(TopOfficersByAllegation);
