import filter from 'reducers/officer-page/timeline/filter';
import { OFFICER_TIMELINE_ITEMS_CHANGE_FILTER } from 'actions/officer-page/timeline';
import { TIMELINE_ITEMS } from 'constants/officer-page/tabbed-pane-section/timeline.js';
import { RESET_TIME_LINE_FILTER } from 'constants/officer-page';


describe('filter reducer', function () {
  it('should have initial state', function () {
    filter(undefined, {}).should.eql({
      label: 'All',
      kind: ['CR', 'FORCE', 'AWARD'],
    });
  });

  it('should handle OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER', function () {
    filter(
      {
        label: 'ALL',
        kind: ['CR', 'FORCE', 'AWARD'],
      },
      {
        type: OFFICER_TIMELINE_ITEMS_CHANGE_FILTER,
        payload: {
          label: 'Complaints',
          kind: [TIMELINE_ITEMS.CR],
        },
      }
    ).should.eql({
      label: 'Complaints',
      kind: [TIMELINE_ITEMS.CR],
    });
  });

  it('should handle RESET_TIME_LINE_FILTER', function () {
    filter({
      label: 'COMPLAINTS',
      kind: [TIMELINE_ITEMS.CR],
    }, {
      type: RESET_TIME_LINE_FILTER,
    }).should.eql({
      label: 'All',
      kind: ['CR', 'FORCE', 'AWARD'],
    });
  });
});
