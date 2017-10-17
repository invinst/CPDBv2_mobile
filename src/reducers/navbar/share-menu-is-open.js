import { handleActions } from 'redux-actions';

import {
  SHARE_MENU_OPEN,
  SHARE_MENU_CLOSE
} from 'actions/navbar';


const shareMenuIsOpen = handleActions({
  [SHARE_MENU_OPEN]: () => true,
  [SHARE_MENU_CLOSE]: () => false,
}, false);

export default shareMenuIsOpen;
