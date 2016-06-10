const DeviceUtil = {
  getUserAgent() {
    return navigator.userAgent;
  },

  isiOSDevice() {
    return /iPhone|iPad|iPod/i.test(this.getUserAgent());
  }
};

export default DeviceUtil;
