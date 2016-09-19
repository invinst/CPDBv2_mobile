import faker from 'faker';
import f from 'utils/tests/f';

import 'factories/MediaFactory';
import 'factories/InvestigatorFactory';
import 'factories/PointFactory';


f.define('Allegation', {
  'crid'() {
    return faker.random.number(1000000);
  },

  'investigator'() {
    return f.create('Investigator');
  },

  'incident_date'() {
    return '2012-10-07T07:30:00';
  },

  'beat'() {
    return null;
  },

  'location'() {
    return null;
  },

  'add1'() {
    return null;
  },

  'add2'() {
    return null;
  },

  'city'() {
    return null;
  },

  'point'() {
    return f.create('Point');
  },

  'attachment_files': function () {
    return f.createBatch(2, 'Media');
  },

  'officer_allegation_set'() {
    return f.createBatch(2, 'OfficerAllegation');
  }
});
