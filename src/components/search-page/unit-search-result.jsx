import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TwoLineList from 'components/shared/two-line-list';


class UnitSearchResult extends Component {
  render() {
    const { items } = this.props;

    const rows = items.map((unit) => ({
      label: unit.text,
      sublabel: `${unit.memberCount} officers, ${unit.activeMemberCount} active`,
      // TODO: We don't have a dedicated view for Unit on mobile yet, and the provided external url (unit.url)
      // does not support mobile devices.
    }));

    return <TwoLineList rows={ rows } />;
  }
}

UnitSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  items: PropTypes.array,
};

UnitSearchResult.defaultProps = {
  items: [],
};

export default UnitSearchResult;
