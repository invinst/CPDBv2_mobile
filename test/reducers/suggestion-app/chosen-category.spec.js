import chosenCategory from 'reducers/suggestion-app/chosen-category';
import { UPDATE_CHOSEN_CATEGORY } from 'actions/suggestion';


describe('chosenCategory reducer', function () {
  it('should have initial state', function () {
    chosenCategory(undefined, {}).should.eql('');
  });

  it('should handle UPDATE_ACTIVE_CATEGORY', function () {
    chosenCategory({}, {
      type: UPDATE_CHOSEN_CATEGORY,
      payload: 'unit'
    }).should.eql('unit')
  });
});
