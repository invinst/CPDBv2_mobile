import faker from 'faker';

import f from 'utils/tests/f';


f.define('Media', {
  'title'() {
    return faker.random.words();
  },
  'url'() {
    return faker.internet.url();
  },
  'file_type'() {
    return 'video';
  },
  'additional_info'() {
    return {};
  }
});
