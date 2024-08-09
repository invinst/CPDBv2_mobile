// import React from 'react';
import PropTypes from 'prop-types';
// import cx from 'classnames';
import { every, isEmpty } from 'lodash';

import withPinnable from 'components/common/with-pinnable';
// import styles from 'components/common/item-pin-button.sass';


function ItemPinButton(props) {
  const { item, items } = props;
  // const isPinned = every(isEmpty(items) ? [item] : items, item => item.isPinned);

  return (null);
  // (
  //   <div className={ cx(
  //     'pinboard-feature',
  //     styles.itemPinButton,
  //     { 'is-pinned': isPinned, 'show-introduction': showIntroduction },
  //     className
  //   ) }/>
  // );
}

ItemPinButton.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPinned: PropTypes.bool,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPinned: PropTypes.bool,
  })),
  addOrRemoveItemInPinboard: PropTypes.func,
  className: PropTypes.string,
  showHint: PropTypes.bool,
  showIntroduction: PropTypes.bool,
  visitPinButtonIntroduction: PropTypes.func,
  isPinButtonIntroductionVisited: PropTypes.bool,
};

ItemPinButton.defaultProps = {
  showHint: true,
  items: [],
};

export default withPinnable(ItemPinButton);
