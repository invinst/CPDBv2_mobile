const DataTypeUtil = {
  isNumeric(val) {
    return /^\d+$/.test(val);
  },

  isValidCridQueryFormat(val) {
    return /^(cr|crid)?(\s+)?(\d+)$/.test(val.toLowerCase());
  }
};

export default DataTypeUtil;
