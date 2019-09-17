import { LOCATION_CHANGE } from 'react-router-redux';

import chosenCategory from 'reducers/suggestion-app/chosen-category';
import { UPDATE_CHOSEN_CATEGORY, SEARCH_INPUT_CHANGED } from 'actions/suggestion';


describe('chosenCategory reducer', function () {
  it('should have initial state', function () {
    chosenCategory(undefined, {}).should.eql('');
  });

  it('should handle UPDATE_ACTIVE_CATEGORY', function () {
    chosenCategory('', {
      type: UPDATE_CHOSEN_CATEGORY,
      payload: 'unit',
    }).should.eql('unit');
  });

  it('should handle SEARCH_INPUT_CHANGED with payload match SEARCH_QUERY_PREFIX_REGEX', function () {
    chosenCategory('', {
      type: SEARCH_INPUT_CHANGED,
      payload: 'officer:123',
    }).should.equal('officers');
  });

  it('should handle SEARCH_INPUT_CHANGED with payload does not match SEARCH_QUERY_PREFIX_REGEX', function () {
    chosenCategory('', {
      type: SEARCH_INPUT_CHANGED,
      payload: 'abc:123',
    }).should.equal('');
  });

  it('should handle LOCATION_CHANGE', function () {
    chosenCategory('', {
      type: LOCATION_CHANGE,
      payload: {
        query: {
          terms: 'officer:123',
        },
      },
    }).should.eql('officers');
  });

  it('should handle LOCATION_CHANGE with terms does not match SEARCH_QUERY_PREFIX_REGEX', function () {
    chosenCategory('', {
      type: LOCATION_CHANGE,
      payload: {
        query: {
          terms: 'abc:123',
        },
      },
    }).should.eql('');
  });
});
