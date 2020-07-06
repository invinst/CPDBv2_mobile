import { createWithIsPinnedSelector } from 'selectors/common/pinboard';
import { PINBOARD_PAGE } from 'constants';


describe('pinboard common selectors', function () {
  describe('createWithIsPinnedSelector', function () {
    it('should return a selector which adds isPinned attr to officer cards', function () {
      const storeState = {
        pinboardPage: {
          pinboard: {
            'officer_ids': ['1', '2', '3'],
          },
        },
        officerCards: [
          { id: 1, allegationCount: 3 }, { id: 2, allegationCount: 2 }, { id: 99, allegationCount: 1 },
        ],
      };
      const officerCardsSelector = state => state.officerCards;
      const withIsPinnedOfficerCardsSelector = createWithIsPinnedSelector(
        officerCardsSelector, PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER,
      );

      withIsPinnedOfficerCardsSelector(storeState).should.eql([
        { id: 1, isPinned: true, allegationCount: 3 },
        { id: 2, isPinned: true, allegationCount: 2 },
        { id: 99, isPinned: false, allegationCount: 1 },
      ]);
    });

    it('should return a selector which adds isPinned attr to trr cards', function () {
      const storeState = {
        pinboardPage: {
          pinboard: {
            'trr_ids': ['1', '2', '3'],
          },
        },
        trrCards: [
          { id: 1, officerId: 12 }, { id: 2, officerId: 34 }, { id: 99, officerId: 56 },
        ],
      };
      const trrCardsSelector = state => state.trrCards;
      const withIsPinnedTRRCardsSelector = createWithIsPinnedSelector(
        trrCardsSelector, PINBOARD_PAGE.PINNED_ITEM_TYPES.TRR,
      );

      withIsPinnedTRRCardsSelector(storeState).should.eql([
        { id: 1, isPinned: true, officerId: 12 },
        { id: 2, isPinned: true, officerId: 34 },
        { id: 99, isPinned: false, officerId: 56 },
      ]);
    });

    it('should return a selector which adds isPinned attr to cr cards', function () {
      const storeState = {
        pinboardPage: {
          pinboard: {
            'crids': ['1', '2', '3'],
          },
        },
        crCards: [
          { crid: '1', finding: 'Not Sustained' },
          { crid: '2', finding: 'Sustained' },
          { crid: '99', finding: 'Not Sustained' },
        ],
      };
      const crCardsSelector = state => state.crCards;
      const withIsPinnedCRCardsSelector = createWithIsPinnedSelector(
        crCardsSelector, PINBOARD_PAGE.PINNED_ITEM_TYPES.CR,
      );

      withIsPinnedCRCardsSelector(storeState).should.eql([
        { crid: '1', isPinned: true, finding: 'Not Sustained' },
        { crid: '2', isPinned: true, finding: 'Sustained' },
        { crid: '99', isPinned: false, finding: 'Not Sustained' },
      ]);
    });
  });
});
