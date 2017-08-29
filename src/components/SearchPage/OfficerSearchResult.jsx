import React, { Component, PropTypes } from 'react';
import TwoLineList from 'components/Shared/TwoLineList';


class OfficerSearchResult extends Component {
  render() {
    const { officers, saveToRecent } = this.props;

    const rows = officers.map((officer) => ({
      label: officer.name,
      sublabel: officer.extraInfo,
      url: officer.url,
      onClick: saveToRecent.bind(undefined, {
        type: 'Officer',
        title: officer.name,
        url: officer.url
      })
    }));

    return <TwoLineList rows={ rows } />;
  }
}

OfficerSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  officers: PropTypes.array
};

export default OfficerSearchResult;
