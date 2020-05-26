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
            { 'id': '23ffd689', 'title': 'Watts Crew', 'created_at': '2020-05-06' },
            { 'id': '7e1e3c88', 'title': '', 'created_at': '2020-05-07' },
            { 'id': '3a160339', 'title': '', 'created_at': '2020-05-08' },
            { 'id': 'c04ba6f6', 'title': '', 'created_at': '2020-05-09' },
          ],
        },
      };
      pinboardsSelector(state).should.eql([
        {
          id: '23ffd689',
          title: 'Watts Crew',
          createdAt: 'May 06, 2020',
          url: '/pinboard/23ffd689/watts-crew/',
        },
        {
          id: '7e1e3c88',
          title: '',
          createdAt: 'May 07, 2020',
          url: '/pinboard/7e1e3c88/untitled-pinboard/',
        },
        {
          id: '3a160339',
          title: '',
          createdAt: 'May 08, 2020',
          url: '/pinboard/3a160339/untitled-pinboard/',
        },
        {
          id: 'c04ba6f6',
          title: '',
          createdAt: 'May 09, 2020',
          url: '/pinboard/c04ba6f6/untitled-pinboard/',
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
