import React, { PropTypes } from 'react';

import CrItem from './cr-item';


const CRSearchResult = ({ items, saveToRecent, addOrRemoveItemInPinboard }) => {
  return (
    <div>
      {
        items.map((item) => {
          return (
            <CrItem
              key={ item.id }
              item={ item }
              saveToRecent={ saveToRecent }
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
            />
          );
        })
      }
    </div>
  );
};

CRSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  items: PropTypes.array,
  addOrRemoveItemInPinboard: PropTypes.func,
};

CRSearchResult.defaultProps = {
  items: [],
};

export default CRSearchResult;
