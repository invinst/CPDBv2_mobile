import { connect } from 'react-redux';
import { get } from 'lodash';

import NewDocumentAllegations from 'components/landing-page/new-document-allegations';
import { requestNewDocumentAllegations } from 'actions/landing-page';
import { newDocumentAllegationsSelector } from 'selectors/landing-page';
import { cmsSelector } from 'selectors/common/cms';
import { withRouter } from 'react-router';


const mapStateToProps = (state, ownProps) => ({
  newDocumentAllegations: newDocumentAllegationsSelector(state),
  description: cmsSelector(state, 'landingPage', 'carousel_document_desc'),
  title: cmsSelector(state, 'landingPage', 'carousel_document_title'),
  pathname: get(ownProps, 'location.pathname'),
});

const mapDispatchToProps = {
  requestNewDocumentAllegations
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewDocumentAllegations));
