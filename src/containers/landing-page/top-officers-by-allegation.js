import { connect } from 'react-redux';

import TopOfficersByAllegation from 'components/landing-page/top-officers-by-allegation';
import { requestTopOfficersByAllegation } from 'actions/landing-page';
import { topOfficersByAllegationSelector, cmsSelector } from 'selectors/landing-page';

const mapStateToProps = state => ({
  topOfficersByAllegation: topOfficersByAllegationSelector(state),
  description: cmsSelector('carousel_allegation_desc')(state),
  title: cmsSelector('carousel_allegation_title')(state)
});

const mapDispatchToProps = {
  requestTopOfficersByAllegation
};

export default connect(mapStateToProps, mapDispatchToProps)(TopOfficersByAllegation);
