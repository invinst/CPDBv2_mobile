import activeCategory from 'reducers/suggestion-app/active-category';
import { UPDATE_ACTIVE_CATEGORY } from 'actions/suggestion';


describe('activeCategory reducer', function () {
  it('should have initial state', function () {
    activeCategory(undefined, {}).should.eql('');
  });

  it('should handle UPDATE_ACTIVE_CATEGORY', function () {
    activeCategory({}, {
      type: UPDATE_ACTIVE_CATEGORY,
      payload: 'officer'
    }).should.eql('officer')
  });
});
