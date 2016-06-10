import AppConstants from 'constants/AppConstants';
import LocalStorageUtil from 'utils/LocalStorageUtil';


const InterfaceTextUtil = {
  getLocalStorageItem() {
    return LocalStorageUtil.getItem('interfaceTexts') ? JSON.parse(LocalStorageUtil.getItem('interfaceTexts')) : {};
  },

  isExpired() {
    const expiredTime = LocalStorageUtil.getItem('interfaceTextExpiredTime');
    return !expiredTime || expiredTime < Date.now();
  },

  isCached() {
    return !!LocalStorageUtil.getItem('interfaceTexts') && !this.isExpired();
  },

  saveToLocalStorage(interfaceTexts) {
    LocalStorageUtil.setItem('interfaceTexts', JSON.stringify(interfaceTexts));
    LocalStorageUtil.setItem('interfaceTextExpiredTime', Date.now() + AppConstants.INTERFACE_TEXT_EXPIRED_TIMESPAN);
  }
};

export default InterfaceTextUtil;
