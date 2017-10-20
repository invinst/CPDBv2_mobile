'use strict';
var api = require(__dirname + '/../mock-api');

const mockComplaint = {
  'incident_date': '2012-04-30',
  'involvements': [
    {
      'involved_type': 'Complainant',
      'officers': [
        {
          'abbr_name': 'H. Lodding',
          'id': 21483,
          'extra_info': 'male, white'
        }
      ]
    },
    {
      'involved_type': 'Reporting Member',
      'officers': [
        {
          'abbr_name': 'A. Givens',
          'id': 16886,
          'extra_info': 'male, black'
        }
      ]
    },
    {
      'involved_type': 'Reviewing Supervisor',
      'officers': [
        {
          'abbr_name': 'G. Majerczyk',
          'id': 4436,
          'extra_info': 'male, white'
        }
      ]
    }

  ],
  'complainants': [
    {
      'gender': 'Male',
      'age': 57,
      'race': 'White'
    }
  ],
  'crid': '1053667',
  'point': {
    'lat': 41.846749,
    'long': -87.685141
  },
  'beat': {
    'name': '1034'
  },
  'coaccused': [
    {
      'category': 'Excessive Force',
      'subcategory': 'Firearm Discharge With Hits / On Duty',
      'end_date': '2016-04-30',
      'gender': 'Male',
      'start_date': '2015-10-16',
      'race': 'White',
      'full_name': 'Anthony Rosen',
      'recc_outcome': 'Unknown',
      'final_outcome': 'Unknown',
      'id': 6493,
      'final_finding': 'Sustained'
    }
  ],
  'location': '03',
  'address': '2459 WESTERN AVE, CHICAGO IL 60608'
};

describe('ComplaintPageTest', function () {
  it('should show proper header with CR title, coaccused and accused', function (client) {

    api.mock('GET', '/api/v2/cr/1053667/', 200, mockComplaint);

    client
      .url(`${client.globals.clientUrl}/complaint/1053667/6493/`);

    client.expect.element('.sheet-header').text.to.contain('CR 1053667');
    client.expect.element('.sheet-header .subheader').text.to.contain('1 coaccused');

    client.end();
  });
});
