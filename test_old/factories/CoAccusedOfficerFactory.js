import f from 'utils/tests/f';
import faker from 'faker';


// FIXME: We will merge this factory with `OfficerFactory` when we change the API since there's too much changes if we
// do it now
f.define('CoAccusedOfficer', {
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

  'num_allegations'() {
    return faker.random.number(1000);
  }
});
