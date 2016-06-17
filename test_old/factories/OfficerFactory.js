import f from 'utils/tests/f';
import faker from 'faker';


f.define('Officer', {
  'id'() {
    return faker.random.number(50);
  },

  'officer_first'() {
    return faker.name.firstName();
  },

  'officer_last'() {
    return faker.name.lastName();
  },

  'race'() {
    return 'Black';
  },

  'gender'() {
    return 'M';
  },

  'allegations_count'() {
    return faker.random.number(50);
  },

  'star'() {
    return faker.random.number(1000);
  }
});
