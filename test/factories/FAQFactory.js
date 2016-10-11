import faker from 'faker';
import f from 'utils/tests/f';


f.define('FAQ', {
  'id'() {
    return f.sequence('faqId');
  },

  'title'() {
    return faker.lorem.words(5);
  },

  'body'() {
    return []
  },
});
