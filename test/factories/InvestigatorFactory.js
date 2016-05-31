import f from 'utils/tests/f';
import faker from 'faker';


f.define('Investigator', {
  'name'() {
    return faker.name.findName();
  },
  'complaint_count'() {
    return faker.random.number(50);
  },
  'discipline_count'() {
    return faker.random.number(50);
  },
  'current_rank'() {
    return faker.lorem.words(2);
  }
});
