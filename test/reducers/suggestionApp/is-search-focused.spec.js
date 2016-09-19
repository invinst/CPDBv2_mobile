import { SEARCH_FOCUS, SEARCH_BLUR, SEARCH_CLEAR, SEARCH_RESET } from 'actions/suggestion';
import isSearchFocused from 'reducers/suggestionApp/is-search-focused';


describe('isSearchFocused reducer', function () {
  it('should return initial state', function () {
    isSearchFocused(undefined, {}).should.eql(0);
  });

  it('should handle SEARCH_FOCUS', function () {
    isSearchFocused(0, {
      type: SEARCH_FOCUS
    }).should.eql(1);
  });

  it('should handle SEARCH_BLUR', function () {
    isSearchFocused(1, {
      type: SEARCH_BLUR
    }).should.eql(0);
  });

  it('should handle SEARCH_CLEAR', function () {
    isSearchFocused(1, {
      type: SEARCH_CLEAR
    }).should.eql(0);
  });

  it('should handle SEARCH_RESET', function () {
    isSearchFocused(1, {
      type: SEARCH_RESET
    }).should.eql(0);
  });
});
