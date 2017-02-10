import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import FAQDetail from 'components/FAQPage/FAQDetail';
import { requestFAQ } from 'actions/faq-page';


function mapStateToProps(state, ownProps) {
  const id = Number(ownProps.params.id);
  const currentFAQDetail = state.faqPage.detail;

  return {
    id: id,
    faq: currentFAQDetail
  };
}

const mapDispatchToProps = {
  requestFAQ
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FAQDetail));
