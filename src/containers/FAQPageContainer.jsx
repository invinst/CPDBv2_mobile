import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import FAQPage from 'components/FAQPage';
import { requestFAQPage } from 'actions/faq-page';
import { hasMoreSelector, nextParamsSelector } from 'selectors/faq-page';


function mapStateToProps(state, ownProps) {
  return {
    pagination: state.faqPage.pagination,
    hasMore: hasMoreSelector(state),
    nextParams: nextParamsSelector(state)
  };
}

const mapDispatchToProps = {
  loadMore: requestFAQPage
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FAQPage));
