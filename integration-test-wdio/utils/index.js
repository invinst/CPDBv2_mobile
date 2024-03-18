'use strict';


export const setupPinboardEnabled = (value) => {
  browser.setLocalStorage('PINBOARD_ENABLED', value);
};

export const restorePinboardEnabled = () => {
  browser.removeLocalStorage('PINBOARD_ENABLED');
};
