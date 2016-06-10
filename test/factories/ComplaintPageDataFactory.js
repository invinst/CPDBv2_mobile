import f from 'utils/tests/f';

f.define('ComplaintPageData', {
  'complaining_witnesses'() {
    return f.createBatch(2, 'ComplainingWitness');
  },

  'allegation'() {
    return f.create('Allegation');
  }
});
