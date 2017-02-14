import should from 'should';  // eslint-disable-line no-unused-vars
import { stub } from 'sinon';
import * as CmsDataUtil from 'utils/CmsDataUtil';
import {
  REPORTING_PAGE_REQUEST_START,
  REPORTING_PAGE_REQUEST_SUCCESS,
  REPORTING_PAGE_REQUEST_FAILURE
} from 'actions/reporting-page';
import reduce from 'reducers/reportingPage/pagination';


describe('reporting pagination reducer', function () {
  it('should return initial state', function () {
    reduce(undefined, {}).should.eql({});
  });

  it('should handle REPORT_REQUEST_START', function () {
    reduce({ loaded: true, foo: 'bar' }, {
      type: REPORTING_PAGE_REQUEST_START,
      payload: {}
    }).should.eql({
      loaded: false,
      foo: 'bar'
    });
  });

  it('should handle REPORT_REQUEST_FAILURE', function () {
    reduce({ loaded: true, foo: 'bar' }, {
      type: REPORTING_PAGE_REQUEST_FAILURE,
      payload: {}
    }).should.eql({
      loaded: false,
      foo: 'bar'
    });
  });

  it('should handle REPORT_REQUEST_SUCCESS', function () {
    const stubGetFunction = (payload, fieldName) => payload[fieldName];
    stub(CmsDataUtil, 'getRichTextValueAsArray', stubGetFunction);
    stub(CmsDataUtil, 'getStringValue', stubGetFunction);
    stub(CmsDataUtil, 'getDateValueAsString', stubGetFunction);

    const payload = {
      count: 2,
      next: null,
      previous: 'http://localhost:9000/api/v2/reports/?limit=1&offset=0',
      results: [
        {
          id: 2,
          title: 'Title',
          publication: 'Publication',
          'publish_date': 'Publish Date'
        }
      ]
    };

    reduce({
      reports: [
        {
          id: 1,
          title: 1,
          publication: 1,
          'publish_date': 1
        }
      ]
    }, {
      type: REPORTING_PAGE_REQUEST_SUCCESS,
      payload: payload
    }).should.eql({
      loaded: true,
      count: 2,
      next: null,
      previous: 'http://localhost:9000/api/v2/reports/?limit=1&offset=0',
      reports: [
        {
          id: 1,
          title: 1,
          publication: 1,
          'publish_date': 1
        },
        {
          id: 2,
          title: 'Title',
          publication: 'Publication',
          publishDate: 'Publish Date'
        }
      ]
    });

    CmsDataUtil.getRichTextValueAsArray.restore();
    CmsDataUtil.getStringValue.restore();
    CmsDataUtil.getDateValueAsString.restore();
  });
});
