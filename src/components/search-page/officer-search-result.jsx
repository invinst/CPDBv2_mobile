import React, { Component, PropTypes } from 'react';

import OfficerItem from './officer-item';


class OfficerSearchResult extends Component {
  render() {
    const { items, saveToRecent, categoryFilter, addItemToPinboard } = this.props;

    return (
      <div>
        {
          items.map(officer => (
            <OfficerItem
              key={ officer.id }
              saveToRecent={ saveToRecent }
              categoryFilter={ categoryFilter }
              item={ officer }
              addItemToPinboard={ addItemToPinboard }
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
  items: PropTypes.array,
  categoryFilter: PropTypes.string,
  addItemToPinboard: PropTypes.func,
};

OfficerSearchResult.defaultProps = {
  saveToRecent: () => {}
};

export default OfficerSearchResult;
