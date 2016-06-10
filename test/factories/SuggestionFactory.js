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
    if (faker.random.number(10) % 2 == 0) {
      return f.create('AllegationFactory');
    } else {
      return f.create('OfficerFactory');
    }
  }
});
