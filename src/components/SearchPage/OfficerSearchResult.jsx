import React, { Component, PropTypes } from 'react';
import TwoLineList from 'components/Shared/TwoLineList';


class OfficerSearchResult extends Component {
  render() {
    const { items, saveToRecent } = this.props;

    const rows = items.map((officer) => ({
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
  items: PropTypes.array
};

export default OfficerSearchResult;
