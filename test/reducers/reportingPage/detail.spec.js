import should from 'should';  // eslint-disable-line no-unused-vars
import { stub } from 'sinon';
import * as CmsDataUtil from 'utils/CmsDataUtil';
import {
  REPORT_REQUEST_START,
  REPORT_REQUEST_SUCCESS,
  REPORT_REQUEST_FAILURE
} from 'actions/reporting-page';
import reduce from 'reducers/reportingPage/detail';


describe('reporting detail reducer', function () {
  it('should return initial state', function () {
    reduce(undefined, {}).should.eql({});
  });

  it('should handle REPORT_REQUEST_START', function () {
    reduce({}, {
      type: REPORT_REQUEST_START,
      payload: {}
    }).should.eql({
      loaded: false,
      id: '',
      title: [],
      excerpt: []
    });
  });

  it('should handle REPORT_REQUEST_FAILURE', function () {
    reduce({}, {
      type: REPORT_REQUEST_FAILURE,
      payload: {}
    }).should.eql({
      loaded: false,
      id: '',
      title: [],
      excerpt: []
    });
  });

  it('should handle REPORT_REQUEST_SUCCESS', function () {
    const stubGetFunction = (payload, fieldName) => payload[fieldName];
    stub(CmsDataUtil, 'getRichTextValueAsArray', stubGetFunction);
    stub(CmsDataUtil, 'getStringValue', stubGetFunction);
    stub(CmsDataUtil, 'getDateValueAsString', stubGetFunction);

    const payload = {
      id: 1,
      title: 'Title',
      excerpt: 'Excerpt',
      publication: 'Publication',
      'publish_date': 'Publish Date',
      author: 'Author'
    };

    reduce({}, {
      type: REPORT_REQUEST_SUCCESS,
      payload: payload
    }).should.eql({
      loaded: true,
      id: 1,
      payload: payload,
      title: 'Title',
      excerpt: 'Excerpt',
      publication: 'Publication',
      publishDate: 'Publish Date',
      author: 'Author'
    });

    CmsDataUtil.getRichTextValueAsArray.restore();
    CmsDataUtil.getStringValue.restore();
    CmsDataUtil.getDateValueAsString.restore();
  });
});
