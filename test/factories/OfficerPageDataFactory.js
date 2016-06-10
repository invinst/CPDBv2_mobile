import f from 'utils/tests/f';

import AllegationFactory from 'factories/AllegationFactory';
import OfficerFactory from 'factories/OfficerFactory';


f.define('OfficerPageData', {
  'detail'() {
    return f.create('Officer');
  },

  'complaints'() {
    return f.createBatch(2, 'Allegation');
  },

  'co_accused'() {
    return [];
  },

  'distribution'() {
    return [];
  }
});
