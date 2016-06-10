const HelperUtil = {
  hasOwnProperty(obj, key) {
    const proto = obj.__proto__ || obj.constructor.prototype;
    return (key in obj) &&
      (!(key in proto) || proto[key] !== obj[key]);
  },

  fetch(obj, path, defaultValue) {
    const paths = path.split('.');
    let i, key;

    for (i = 0; i < paths.length; i++) {
      key = paths[i];
      // TODO: Refactor this function, its funtionality need to be clearer
      if (!obj || typeof(obj) != 'object' || !this.hasOwnProperty(obj, key) || obj[key] == null || obj[key] === '') {
        return defaultValue;
      }

      obj = obj[key];
    }

    return obj;
  },

  format(str, replacements) {
    const re = /{([^{}]+)}/g;

    return str.replace(re, (match, val) => {
      let prop = replacements;
      val.split('.').forEach(key => {
        prop = prop[key];
      });

      return prop;
    });
  },

  hasAnyProperties(obj, properties) {
    const util = this;
    return properties.reduce((p, v) => p || !!util.fetch(obj, v, ''), false);
  }
};

export default HelperUtil;
