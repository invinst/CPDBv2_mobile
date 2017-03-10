import React, { PropTypes } from 'react';

import GaUtil from 'utils/GaUtil';
import LoadingPage from 'components/Shared/LoadingPage';
import NotMatchedOfficerPage from 'components/OfficerPage/NotMatchedOfficerPage';

import style from 'styles/OfficerPage.sass';


const OfficerPage = React.createClass({
  propTypes: {
    getOfficer: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    found: PropTypes.bool,
    pk: PropTypes.string,
    officer: PropTypes.object
  },

  componentDidMount() {
    const { getOfficer, pk } = this.props;
    getOfficer({ pk: pk });
    GaUtil.track('event', 'officer', 'view_detail', location.pathname);
  },


  render() {
    const { loading, found, officer, pk } = this.props;

    if (loading) {
      return (
        <LoadingPage />
      );
    }

    if (!found) {
      return (
        <NotMatchedOfficerPage id={ pk } />
      );
    }

    return (
      <div>
        { JSON.stringify(officer) }
      </div>
    );
  }
});

export default OfficerPage;
