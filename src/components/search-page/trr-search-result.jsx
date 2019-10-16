import React, { PropTypes } from 'react';

import TrrItem from './trr-item';


const TRRSearchResult = ({ items, saveToRecent, addOrRemoveItemInPinboard }) => {
  return (
    <div>
      {
        items.map((item) => {
          return (
            <TrrItem
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

TRRSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  items: PropTypes.array,
  addOrRemoveItemInPinboard: PropTypes.func,
};

TRRSearchResult.defaultProps = {
  items: [],
};

export default TRRSearchResult;
