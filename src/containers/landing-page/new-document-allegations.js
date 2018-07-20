import { connect } from 'react-redux';

import NewDocumentAllegations from 'components/landing-page/new-document-allegations';
import { requestNewDocumentAllegations } from 'actions/landing-page';
import { newDocumentAllegationsSelector, cmsSelector } from 'selectors/landing-page';

const mapStateToProps = state => ({
  newDocumentAllegations: newDocumentAllegationsSelector(state),
  description: cmsSelector('carousel_document_desc')(state),
  title: cmsSelector('carousel_document_title')(state)
});

const mapDispatchToProps = {
  requestNewDocumentAllegations
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDocumentAllegations);
