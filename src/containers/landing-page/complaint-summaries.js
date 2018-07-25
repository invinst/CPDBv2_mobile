import { connect } from 'react-redux';

import ComplaintSummaries from 'components/landing-page/complaint-summaries';
import { requestComplaintSummaries } from 'actions/landing-page';
import { complaintSummariesSelector, cmsSelector } from 'selectors/landing-page';

const mapStateToProps = state => ({
  complaintSummaries: complaintSummariesSelector(state),
  description: cmsSelector('carousel_complaint_desc')(state),
  title: cmsSelector('carousel_complaint_title')(state)
});

const mapDispatchToProps = {
  requestComplaintSummaries
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintSummaries);
