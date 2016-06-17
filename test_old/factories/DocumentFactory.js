import faker from 'faker';
import f from 'utils/tests/f';


f.define('Document', {
  'id'() {
    return f.sequence('documentId');
  },

  'documentcloud_id'() {
    return faker.random.number(1000);
  },

  'normalized_title'() {
    return 'cr-274811';
  },

  'requested'() {
    return false;
  },

  'pending'() {
    return false;
  },

  'type'() {
    return 'CPB';
  }
});
