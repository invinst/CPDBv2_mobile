import {
  getPinboard,
  pinboardItemsSelector,
  pinboardICRIDsSelector,
  isEmptyPinboardSelector,
  examplePinboardsSelector,
  isItemPinned,
  pinboardPageLoadingSelector,
  pinboardFeatureUsedSelector,
} from 'selectors/pinboard-page/pinboard';
import { PinboardFactory } from 'utils/tests/factories/pinboard';


describe('Pinboard selectors', function () {
  describe('getPinboard', function () {
    it('should return correct format of null pinboard', function () {
      const state = { pinboardPage: { pinboard: null } };
      getPinboard(state).should.eql({
        id: null,
        title: '',
        officerIds: [],
        crids: [],
        trrIds: [],
        description: '',
        url: '',
        itemsCount: 0,
        ownedByCurrentUser: false,
        crItems: [],
        officerItems: [],
        trrItems: [],
        isPinboardRestored: false,
        hasPendingChanges: false,
      });
    });

    it('should return pinboard with correct format', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            id: 1,
            title: 'Pinboard Title',
            'officer_ids': [12],
            crids: ['abc'],
            'trr_ids': [1],
            description: 'Description',
            ownedByCurrentUser: true,
            crItems: { requesting: false, items: [{ crid: 'abc' }] },
            officerItems: { requesting: false, items: [{ id: 12 }] },
            trrItems: { requesting: false, items: [{ id: 1 }] },
            isPinboardRestored: false,
            hasPendingChanges: true,
          }),
        },
      };

      getPinboard(state).should.eql({
        id: '1',
        title: 'Pinboard Title',
        officerIds: ['12'],
        crids: ['abc'],
        trrIds: ['1'],
        description: 'Description',
        url: '/pinboard/1/pinboard-title/',
        itemsCount: 3,
        ownedByCurrentUser: true,
        crItems: [{ crid: 'abc' }],
        officerItems: [{ id: 12 }],
        trrItems: [{ id: 1 }],
        isPinboardRestored: false,
        hasPendingChanges: true,
      });
    });

    it('should return correct format of pinboard whose title is empty', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            id: 1,
            title: '',
            'officer_ids': [12],
            crids: ['abc'],
            'trr_ids': [1],
            description: 'Description',
            ownedByCurrentUser: true,
            crItems: { requesting: false, items: [{ crid: 'abc' }] },
            officerItems: { requesting: false, items: [{ id: 12 }] },
            trrItems: { requesting: false, items: [{ id: 1 }] },
            isPinboardRestored: false,
            hasPendingChanges: true,
          }),
        },
      };

      getPinboard(state).should.eql({
        id: '1',
        title: '',
        officerIds: ['12'],
        crids: ['abc'],
        trrIds: ['1'],
        description: 'Description',
        url: '/pinboard/1/untitled-pinboard/',
        itemsCount: 3,
        ownedByCurrentUser: true,
        crItems: [{ crid: 'abc' }],
        officerItems: [{ id: 12 }],
        trrItems: [{ id: 1 }],
        isPinboardRestored: false,
        hasPendingChanges: true,
      });
    });
  });

  describe('pinboardItemsSelector', function () {
    it('should return ids of items by types', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [12],
            crids: ['abc'],
            'trr_ids': [1],
          }),
        },
      };

      pinboardItemsSelector(state).should.eql({
        'OFFICER': ['12'],
        'CR': ['abc'],
        'TRR': ['1'],
      });
    });
  });

  describe('pinboardICRIDsSelector', function () {
    it('should return pined crids', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [12],
            crids: ['abc', 'def'],
            'trr_ids': [1],
          }),
        },
      };

      pinboardICRIDsSelector(state).should.eql(['abc', 'def']);
    });
  });

  describe('isEmptyPinboardSelector', function () {
    it('should return false if there is some crid', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: ['abc'],
            'trr_ids': [],
          }),
        },
      };

      isEmptyPinboardSelector(state).should.be.false();
    });

    it('should return false if there is some officer id', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [1],
            crids: [],
            'trr_ids': [],
          }),
        },
      };

      isEmptyPinboardSelector(state).should.be.false();
    });

    it('should return false if there is some trr id', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: [],
            'trr_ids': [1],
          }),
        },
      };

      isEmptyPinboardSelector(state).should.be.false();
    });

    it('should return true if there is no trr, cr or officer', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: [],
            'trr_ids': [],
          }),
        },
      };

      isEmptyPinboardSelector(state).should.be.true();
    });
  });

  describe('examplePinboardsSelector', function () {
    it('should return example pinboards with id, title and description', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: [],
            'trr_ids': [],
            'example_pinboards': [{
              id: '66ef1561',
              title: 'Pinboard 1',
              description: 'Description 1',
            }, {
              id: '66ef1562',
              title: 'Pinboard 2',
              description: 'Description 2',
            }],
          }),
        },
      };

      examplePinboardsSelector(state).should.eql([{
        id: '66ef1561',
        title: 'Pinboard 1',
        description: 'Description 1',
      }, {
        id: '66ef1562',
        title: 'Pinboard 2',
        description: 'Description 2',
      }]);
    });

    it('should return empty if no data', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: [],
            'trr_ids': [],
          }),
        },
      };

      examplePinboardsSelector(state).should.eql([]);
    });
  });

  describe('isItemPinned', function () {
    const pinboardItems = {
      'OFFICER': ['8562', '8563'],
      'CR': ['C12345'],
      'TRR': [],
    };

    it('should return true if item was added to pinboard', function () {
      isItemPinned('OFFICER', 8562, pinboardItems).should.be.true();
    });

    it('should return false if item was not added to pinboard', function () {
      isItemPinned('CR', '123456', pinboardItems).should.be.false();
    });
  });

  describe('pinboardPageLoadingSelector', function () {
    context('should return true', function () {
      it('if pinboard has id and hasPendingChanges is true', function () {
        const state = {
          pinboardPage: {
            pinboard: PinboardFactory.build({
              id: null,
              title: 'Pinboard Title',
              'officer_ids': [12],
              crids: ['abc'],
              'trr_ids': [1],
              description: 'Description',
              isPinboardRestored: false,
              hasPendingChanges: true,
            }),
          },
        };
        pinboardPageLoadingSelector(state).should.be.true();
      });

      it('if pinboard does not have id, but hasPendingChanges and pinnedItemsRequested is false', function () {
        const state = {
          pinboardPage: {
            pinboard: PinboardFactory.build({
              id: 1,
              title: 'Pinboard Title',
              'officer_ids': [12],
              crids: ['abc'],
              'trr_ids': [1],
              description: 'Description',
              isPinboardRestored: false,
              hasPendingChanges: true,
            }),
          },
          pinnedItemsRequested: false,
        };
        pinboardPageLoadingSelector(state).should.be.true();
      });
    });

    context('should return false', function () {
      it('if pinboard does not have id, and hasPendingChanges is false', function () {
        const state = {
          pinboardPage: {
            pinboard: PinboardFactory.build({
              id: 1,
              title: 'Pinboard Title',
              'officer_ids': [12],
              crids: ['abc'],
              'trr_ids': [1],
              description: 'Description',
              isPinboardRestored: false,
              hasPendingChanges: false,
            }),
          },
        };
        pinboardPageLoadingSelector(state).should.be.false();
      });

      it('if pinboard does not have id, and hasPendingChanges and pinnedItemsRequested is true', function () {
        const state = {
          pinboardPage: {
            pinboard: PinboardFactory.build({
              id: 1,
              title: 'Pinboard Title',
              'officer_ids': [12],
              crids: ['abc'],
              'trr_ids': [1],
              description: 'Description',
              isPinboardRestored: false,
              hasPendingChanges: false,
            }),
          },
          pinnedItemsRequested: true,
        };
        pinboardPageLoadingSelector(state).should.be.false();
      });
    });
  });

  describe('pinboardFeatureUsedSelector', function () {
    context('isPinboardRestored is false', function () {
      context('PinnedItems.length = 0', function () {
        it('shoud return false', function () {
          const state = {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                id: '1234fds',
                'officer_ids': [],
                crids: [],
                'trr_ids': [],
                isPinboardRestored: false,
              }),
            },
          };
          pinboardFeatureUsedSelector(state).should.be.false();
        });
      });
    });

    context('isPinboardRestored is true', function () {
      let state;
      beforeEach(function () {
        state = {
          pinboardPage: {
            pinboard: PinboardFactory.build({
              id: '12379',
              'officer_ids': [],
              crids: [],
              'trr_ids': [],
              isPinboardRestored: true,
            }),
          },
        };
      });

      context('PinnedItems.length > 0', function () {
        it('should return true', function () {
          state.pinboardPage.pinboard.crids = ['123'];
          pinboardFeatureUsedSelector(state).should.be.true();
        });
      });
      context('PinnedItems.length = 0', function () {
        it('should return false', function () {
          pinboardFeatureUsedSelector(state).should.be.false();
        });
      });
    });
  });
});
