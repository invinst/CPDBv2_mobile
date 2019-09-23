import items from 'reducers/officer-page/timeline/filter';
import { OFFICER_TIMELINE_ITEMS_CHANGE_FILTER } from 'actions/officer-page/timeline';


describe('filter reducer', function () {
  it('should have initial state', function () {
    items(undefined, {}).should.eql({
      label: 'All',
      kind: ['CR', 'FORCE', 'AWARD'],
    });
  });

  it('should handle OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER', function () {
    items('All', {
      type: OFFICER_TIMELINE_ITEMS_CHANGE_FILTER,
      payload: 'Complaints',
    }).should.eql('Complaints');
  });
});
