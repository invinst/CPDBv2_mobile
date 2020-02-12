import { connect } from 'react-redux';
import queryString from 'query-string';

import Officers from 'components/embed/officers';
import { officersSelector } from 'selectors/embed';
import { requestOfficers } from 'actions/embed';

const mapStateToProps = (state, ownProps) => {
  const { ids, title, description } = queryString.parse(ownProps.location.search);
  return {
    title,
    description,
    officerIds: ids,
    officers: officersSelector(state),
  };
};

const mapDispatchToProps = {
  requestOfficers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Officers);
