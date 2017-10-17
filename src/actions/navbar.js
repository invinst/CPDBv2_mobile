import { createAction } from 'redux-actions';

export const SHARE_MENU_OPEN = 'SHARE_MENU_OPEN';
export const SHARE_MENU_CLOSE = 'SHARE_MENU_CLOSE';

export const openShareMenu = createAction(SHARE_MENU_OPEN);
export const closeShareMenu = createAction(SHARE_MENU_CLOSE);
