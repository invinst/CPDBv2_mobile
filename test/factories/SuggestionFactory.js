import faker from 'faker';
import f from 'utils/tests/f';

f.define('Suggestion', {
  'text'() {
    return faker.lorem.words(2);
  },

  'url'() {
    return '';
  },

  'resource'() {
    return 'officer_allegation';
  },

  'resource_key'() {
    return faker.random.number(100000);
  },

  'meta'() {
    return f.create('AllegationFactory');
  }
});
