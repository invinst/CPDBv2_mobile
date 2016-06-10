import u from 'utils/HelperUtil';


const CollectionUtil = {
  getMax(items) {
    return items.reduce((p, v) => {
      return ( p > v ? p : v );
    }, 0);
  },

  all(items) {
    return items.reduce((p, v) => {
      return (p && !!v);
    }, true);
  },

  any(items) {
    return items.reduce((p, v) => {
      return (p || v);
    }, false);
  },

  pluck(items, field) {
    return items.map(item => u.fetch(item, field));
  },

  isSameField(items, field) {
    let i;

    for (i=0; i < items.length - 1; i++) {
      if (items[i][field] !== items[i+1][field]) {
        return false;
      }
    }
    return true;
  },

  isSameAllFields(items, fields) {
    let i;

    for (i = 0; i < fields.length; i++) {
      if (!this.isSameField(items, fields[i])) {
        return false;
      }
    }
    return true;
  },

  first(items) {
    return items.length ? items[0] : null;
  },

  groupBy(items, rule) {
    const groups = {};
    let i, group;

    for (i = 0; i < items.length; i++) {
      group = rule(items[i]);

      if (group in groups) {
        groups[group].push(items[i]);
      } else {
        groups[group] = [items[i]];
      }
    }
    return groups;
  }
};

export default CollectionUtil;
