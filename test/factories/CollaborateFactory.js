import faker from 'faker';
import f from 'utils/tests/f';


f.define('Collaborate', {
  'type'() {
    return 'paragraph';
  },

  'value'() {
    return faker.lorem.words(5);
  }
});
