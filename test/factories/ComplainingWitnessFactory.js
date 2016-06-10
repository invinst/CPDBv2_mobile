import f from 'utils/tests/f';
import faker from 'faker';


f.define('ComplainingWitness', {
  'cwit_id'() {
    return faker.random.number(10000);
  },

  'gender'() {
    return 'M';
  },

  'race'() {
    return 'Black';
  },

  'age'() {
    return faker.random.number(50);
  }
});
