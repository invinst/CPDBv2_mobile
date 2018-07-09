import React, { Component, PropTypes } from 'react';

import OfficerItem from './officer-item';


class OfficerSearchResult extends Component {
  render() {
    const { items, saveToRecent } = this.props;

    return (
      <div>
        {
          items.map(officer => (
            <OfficerItem
              key={ officer.id }
              saveToRecent={ saveToRecent }
              { ...officer }
            />
          ))
        }
      </div>
    );
  }
}

OfficerSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  items: PropTypes.array
};

OfficerSearchResult.defaultProps = {
  saveToRecent: () => {}
};

export default OfficerSearchResult;
