import { LOCATION_CHANGE } from 'connected-react-router';

import breadcrumbItems from 'reducers/breadcrumb/breadcrumb-items';


describe('breadcrumbMapping', function () {
  it('should return initial state', function () {
    breadcrumbItems(undefined, {}).should.eql([]);
  });

  describe('handle LOCATION_CHANGE', function () {
    it('should add pathname', function () {
      breadcrumbItems(['/search/'], {
        type: LOCATION_CHANGE,
        payload: {
          location: {
            pathname: '/officer/123/',
          },
        },
      }).should.eql(['/search/', '/officer/123/']);
    });

    it('should reset bredscrumb when visit /', function () {
      breadcrumbItems(['/search/'], {
        type: LOCATION_CHANGE,
        payload: {
          location: {
            pathname: '/',
          },
        },
      }).should.eql([]);
    });

    it('should remove the rest items when move back to visited item', function () {
      breadcrumbItems(['/officer/123/', '/search/', '/trr/1/'], {
        type: LOCATION_CHANGE,
        payload: {
          location: {
            pathname: '/search/',
          },
        },
      }).should.eql(['/officer/123/', '/search/']);

      breadcrumbItems(['/officer/123/', '/search/', '/trr/1/'], {
        type: LOCATION_CHANGE,
        payload: {
          location: {
            pathname: '/officer/123/coaccusals/',
          },
        },
      }).should.eql(['/officer/123/']);

      breadcrumbItems(['/pinboard/123/', '/search/', '/trr/1/'], {
        type: LOCATION_CHANGE,
        payload: {
          location: {
            pathname: '/pinboard/123/new-title/',
          },
        },
      }).should.eql(['/pinboard/123/']);
    });
  });
});
