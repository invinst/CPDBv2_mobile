import f from 'utils/tests/f';
import faker from 'faker';


f.define('Category', {
  'id'() {
    return faker.random.number(1000);
  },
  'allegation_name'() {
    return faker.lorem.words(4);
  },
  'category'() {
    return faker.lorem.words(2);
  }
});
