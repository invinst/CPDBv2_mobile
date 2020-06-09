import moment from 'moment';

import {
  pinboardsSelector,
  getShowPinboardsList,
} from 'selectors/pinboard-page/pinboards';


describe('Pinboards selectors', function () {
  describe('pinboardsSelector', function () {
    it('should return correct values', function () {
      const state = {
        pinboardPage: {
          pinboards: [
            {
              'id': '23ffd689',
              'title': 'Watts Crew',
              'created_at': '2020-05-06',
              'last_viewed_at': '2019-03-16T10:15:00',
            },
            {
              'id': '7e1e3c88',
              'title': '',
              'created_at': '2020-05-07',
              'last_viewed_at': '2019-03-16T09:45:30',
            },
            {
              'id': '3a160339',
              'title': '',
              'created_at': '2020-05-08',
              'last_viewed_at': '2019-03-16T09:30:00',
            },
            {
              'id': 'c04ba6f6',
              'title': '',
              'created_at': '2020-05-09',
              'last_viewed_at': '2019-03-16T09:05:00',
            },
          ],
          pinboard: {
            'id': '7e1e3c88',
            'title': 'Updated',
            'created_at': '2020-05-07',
            'last_viewed_at': '2019-03-16T11:45:30',
          },
        },
      };
      const currentTimeString = moment().format('DD/MM/YYYY [at] hh:mm A');
      pinboardsSelector(state).should.eql([
        {
          id: '7e1e3c88',
          title: 'Updated',
          createdAt: 'May 07, 2020',
          url: '/pinboard/7e1e3c88/updated/',
          lastViewedAt: currentTimeString,
          isCurrent: true,
        },
        {
          id: '23ffd689',
          title: 'Watts Crew',
          createdAt: 'May 06, 2020',
          url: '/pinboard/23ffd689/watts-crew/',
          lastViewedAt: '16/03/2019 at 10:15 AM',
          isCurrent: false,
        },
        {
          id: '3a160339',
          title: '',
          createdAt: 'May 08, 2020',
          url: '/pinboard/3a160339/untitled-pinboard/',
          lastViewedAt: '16/03/2019 at 09:30 AM',
          isCurrent: false,
        },
        {
          id: 'c04ba6f6',
          title: '',
          createdAt: 'May 09, 2020',
          url: '/pinboard/c04ba6f6/untitled-pinboard/',
          lastViewedAt: '16/03/2019 at 09:05 AM',
          isCurrent: false,
        },
      ]);
    });
  });

  describe('getShowPinboardsList', function () {
    it('should return correct value', function () {
      getShowPinboardsList({
        pinboardPage: {
          isShownPinboardsList: true,
        },
      }).should.be.true();
      getShowPinboardsList({
        pinboardPage: {
          isShownPinboardsList: false,
        },
      }).should.be.false();
    });
  });
});
