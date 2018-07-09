import { breadcrumbify } from 'redux-breadcrumb-trail';
import { connect } from 'react-redux';

import { breadcrumbTextSelector } from 'selectors/common/breadcrumbs';
import BreadcrumbItem from 'components/shared/breadcrumbs/breadcrumb-item';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    label: breadcrumbTextSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(breadcrumbify(BreadcrumbItem));
