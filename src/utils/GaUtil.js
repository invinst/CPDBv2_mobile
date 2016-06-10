const GaUtil = {
  track(type, category, action, label) {
    ga('send', type, category, action, label);
  }
};

export default GaUtil;
