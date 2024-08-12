import PropTypes from 'prop-types';
// import React from 'react';
// import cx from 'classnames';
import { noop } from 'lodash';

// import PinboardsMenu from 'components/common/pinboard/pinboards-menu';
// import ItemPinButton from 'components/common/item-pin-button';
// import HeaderButton from 'components/shared/header-button';
// import headerStyles from 'components/shared/with-header.sass';


// const PINBOARDS_MENU_PROPS = [
//   'pinboards', 'item', 'addOrRemoveItemInPinboard', 'createPinboard', 'fetchPinboard',
// ];

const HeaderPinButton = (props) => {
  // const { isPinned, addOrRemoveItemInPinboard, item, showSelectPinboards } = props;
  return (null);
  // (
  //   showSelectPinboards ?
  //     <HeaderButton
  //       name='add-to-pinboard-btn'
  //       buttonClassName={ cx(headerStyles.addToPinboardBtn, 'pinboard-feature') }
  //       Menu={ PinboardsMenu }
  //       menuProps={ pick(props, PINBOARDS_MENU_PROPS) }
  //     />
  //     :
  //     <ItemPinButton
  //       addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
  //       showHint={ false }
  //       className={ headerStyles.addToPinboardBtn }
  //       item={ { ...item, isPinned } }
  //     />
  // );
};

HeaderPinButton.propTypes = {
  item: PropTypes.object,
  pinboards: PropTypes.array,
  isPinned: PropTypes.bool,
  showSelectPinboards: PropTypes.bool,
  addOrRemoveItemInPinboard: PropTypes.func,
  fetchPinboard: PropTypes.func,
  createPinboard: PropTypes.func,
};

HeaderPinButton.defaultProps = {
  item: {},
  pinboards: [],
  isPinned: false,
  showSelectPinboards: false,
  addOrRemoveItemInPinboard: noop,
  fetchPinboard: noop,
  createPinboard: noop,
};

export default HeaderPinButton;
