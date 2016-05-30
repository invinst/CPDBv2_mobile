import f from 'utils/tests/f';
import faker from 'faker';
require('tests/factories/OfficerFactory');
require('tests/factories/CategoryFactory');


f.define('OfficerAllegation', {
  'id'() {
    return f.sequence('officerAllegationId');
  },
  'officer'() {
    return f.create('Officer');
  },
  'cat'() {
    return f.create('Category');
  },
  'start_date'() {
    return faker.date.past();
  },
  'end_date'() {
    return faker.date.recent();
  },
  'final_finding'() {
    return 'UN';
  },
  'final_outcome_class'() {
    return 'not-sustained';
  }
});
