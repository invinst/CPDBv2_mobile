import lodash, { range, some, isEqual, sortBy } from 'lodash';
import { spy } from 'sinon';

import {
  topOfficersByAllegationSelector,
  recentActivitiesSelector,
  newDocumentAllegationsSelector,
  complaintSummariesSelector,
  getCMSRequested,
  getEmbed,
  shuffled,
} from 'selectors/landing-page';
import { RawDocumentCardFactory } from 'utils/tests/factories/attachment';
import { RawOfficerCardFactory } from 'utils/tests/factories/activity-grid';
import { RawComplaintSummaryFactory } from 'utils/tests/factories/complaint';


describe('landing page selectors', function () {
  let state;

  beforeEach(function () {
    state = {
      landingPage: {},
      pinboardPage: {
        pinboard: {
          'officer_ids': ['1', '2', '3'],
          crids: ['1', '2', '3'],
        },
      },
    };
  });

  describe('shuffled', function () {
    it('should return a selector which shuffles items', function () {
      const storeState = { items: range(40) };
      const itemsSelector = state => state.items;
      const shuffledItemsSelector = shuffled(itemsSelector);
      const results = range(30).map(() => shuffledItemsSelector(storeState));

      some(results.map(result => !isEqual(result, storeState.items))).should.be.true();
      results.forEach(result => {
        sortBy(result.slice(0, 12)).should.eql(storeState.items.slice(0, 12));
        sortBy(result.slice(12)).should.eql(storeState.items.slice(12));
      });
    });
  });

  describe('topOfficersByAllegationSelector', function () {
    it('should return empty result', function () {
      topOfficersByAllegationSelector(state).should.eql([]);
    });

    it('should return correct result', function () {
      state.landingPage.topOfficersByAllegation = [{
        id: 123,
        percentile: null,
      }];
      topOfficersByAllegationSelector(state).should.deepEqual([{
        id: 123,
        percentile: null,
        isPinned: false,
      }]);
    });

    it('should add isPinned attr', function () {
      state.landingPage.topOfficersByAllegation = [
        RawOfficerCardFactory.build({ id: 1 }),
        RawOfficerCardFactory.build({ id: 99 }),
      ];

      const cards = topOfficersByAllegationSelector(state);
      cards.should.have.length(2);
      [cards[0].isPinned, cards[1].isPinned].sort().should.be.eql([false, true]);
    });

    it('should shuffle cards', function () {
      const stubShuffle = spy(lodash, 'shuffle');
      state.landingPage.topOfficersByAllegation = lodash.range(40);

      topOfficersByAllegationSelector(state);

      stubShuffle.should.be.calledWith(lodash.range(0, 12));
      stubShuffle.should.be.calledWith(lodash.range(12, 40));

      stubShuffle.restore();
    });
  });

  describe('complaintSummariesSelector', function () {
    it('should return empty result', function () {
      complaintSummariesSelector(state).should.eql([]);
    });

    it('should return correct result', function () {
      state.landingPage.complaintSummaries = [
        {
          'crid': '12345',
          'summary': 'summary',
          'incident_date': '2016-04-18',
        },
        {
          'crid': '12346',
          'summary': 'summary',
          'incident_date': null,
        },
      ];
      sortBy(complaintSummariesSelector(state), 'crid').should.deepEqual([
        {
          crid: '12345',
          summary: 'summary',
          incidentDate: 'Apr 18, 2016',
          isPinned: false,
        },
        {
          crid: '12346',
          summary: 'summary',
          incidentDate: null,
          isPinned: false,
        },
      ]);
    });

    it('should add isPinned attr', function () {
      state.landingPage.complaintSummaries = [
        RawComplaintSummaryFactory.build({ 'crid': '1' }),
        RawComplaintSummaryFactory.build({ 'crid': '99' }),
      ];
      const result = complaintSummariesSelector(state);
      result.should.have.length(2);
      [result[0].isPinned, result[1].isPinned].sort().should.be.eql([false, true]);
    });

    it('should shuffle cards', function () {
      const stubShuffle = spy(lodash, 'shuffle');
      state.landingPage.complaintSummaries = lodash.range(40);

      complaintSummariesSelector(state);

      stubShuffle.should.be.calledWith(lodash.range(0, 12));
      stubShuffle.should.be.calledWith(lodash.range(12, 40));

      stubShuffle.restore();
    });
  });

  describe('recentActivitiesSelector', function () {
    it('should return empty result', function () {
      recentActivitiesSelector(state).should.eql([]);
    });

    it('should return correct result', function () {
      state.landingPage.recentActivities = [{
        id: 1,
        kind: 'single_officer',
      }, {
        id: 9,
        percentile: null,
        kind: 'single_officer',
      }];
      const expectation = {
        1: {
          id: 1,
          percentile: null,
          kind: 'single_officer',
          isPinned: true,
        },
        9: {
          id: 9,
          percentile: null,
          kind: 'single_officer',
          isPinned: false,
        },
      };

      const cards = recentActivitiesSelector(state);
      cards.should.have.length(2);
      cards.forEach(card => card.should.eql(expectation[card.id]));
    });

    it('should shuffle cards', function () {
      const stubShuffle = spy(lodash, 'shuffle');
      state.landingPage.recentActivities = lodash.range(40);

      recentActivitiesSelector(state);

      stubShuffle.should.be.calledWith(lodash.range(0, 12));
      stubShuffle.should.be.calledWith(lodash.range(12, 40));

      stubShuffle.restore();
    });
  });

  describe('newDocumentAllegationsSelector', function () {
    it('should return empty result', function () {
      newDocumentAllegationsSelector(state).should.eql([]);
    });

    it('should return correct result', function () {
      state.landingPage.newDocumentAllegations = [
        {
          'crid': '123214',
          'category': 'Operation/Personnel Violations',
          'incident_date': '2004-04-23',
          'latest_document': {
            'preview_image_url': 'preview_link',
            'id': '123456',
          },
        },
      ];
      newDocumentAllegationsSelector(state).should.deepEqual([{
        crid: '123214',
        document: {
          previewImageUrl: 'preview_link',
          id: '123456',
        },
        category: 'Operation/Personnel Violations',
        incidentDate: 'Apr 23, 2004',
        isPinned: false,
      }]);
    });

    it('should add isPinned attr', function () {
      state.landingPage.newDocumentAllegations = [
        RawDocumentCardFactory.build({ crid: '1' }),
        RawDocumentCardFactory.build({ crid: '99' }),
      ];

      const cards = newDocumentAllegationsSelector(state);
      cards.should.have.length(2);
      cards[0].isPinned.should.be.true();
      cards[1].isPinned.should.be.false();
    });
  });

  describe('getCMSRequested', function () {
    it('should return correct result', function () {
      getCMSRequested({ landingPage: { cmsRequested: true } }).should.be.true();
      getCMSRequested({ landingPage: { cmsRequested: false } }).should.be.false();
    });
  });

  describe('getEmbed', function () {
    it('should return correct result', function () {
      getEmbed({ location: { pathname: 'embed/top-officers-page' } }).should.be.true();
      getEmbed({ location: { pathname: 'top-officers-page' } }).should.be.false();
      getEmbed({}).should.be.false();
    });
  });
});
