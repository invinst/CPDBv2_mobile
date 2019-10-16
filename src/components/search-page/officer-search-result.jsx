import React, { PropTypes } from 'react';

import OfficerItem from './officer-item';


const OfficerSearchResult = ({ items, saveToRecent, addOrRemoveItemInPinboard }) => {
  return (
    <div>
      {
        items.map(officer => (
          <OfficerItem
            key={ officer.id }
            item={ officer }
            saveToRecent={ saveToRecent }
            addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
          />
        ))
      }
    </div>
  );
};

OfficerSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  items: PropTypes.array,
  addOrRemoveItemInPinboard: PropTypes.func,
};

OfficerSearchResult.defaultProps = {
  saveToRecent: () => {},
};

export default OfficerSearchResult;
