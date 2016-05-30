import f from 'utils/tests/f';

require('tests/factories/AllegationFactory');
require('tests/factories/OfficerFactory');


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
