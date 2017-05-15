import should from 'should';  // eslint-disable-line no-unused-vars
import { stub } from 'sinon';
import * as CmsDataUtil from 'utils/CmsDataUtil';
import {
  FAQ_PAGE_REQUEST_START,
  FAQ_PAGE_REQUEST_SUCCESS,
  FAQ_PAGE_REQUEST_FAILURE
} from 'actions/faq-page';
import reduce from 'reducers/faqPage/pagination';


describe('FAQ pagination reducer', function () {
  it('should return initial state', function () {
    reduce(undefined, {}).should.eql({});
  });

  it('should handle FAQ_PAGE_REQUEST_START', function () {
    reduce({ loaded: true, foo: 'bar' }, {
      type: FAQ_PAGE_REQUEST_START,
      payload: {}
    }).should.eql({
      loaded: false,
      foo: 'bar'
    });
  });

  it('should handle FAQ_PAGE_REQUEST_FAILURE', function () {
    reduce({ loaded: true, foo: 'bar' }, {
      type: FAQ_PAGE_REQUEST_FAILURE,
      payload: {}
    }).should.eql({
      loaded: false,
      foo: 'bar'
    });
  });

  it('should handle FAQ_PAGE_REQUEST_SUCCESS', function () {
    const stubGetRichTextValueAsArray = (obj, fieldName) => {
      return obj[fieldName].map((value) => 'Stub ' + value);
    };
    stub(CmsDataUtil, 'getRichTextValueAsArray', stubGetRichTextValueAsArray);

    const payload = {
      count: 2,
      next: null,
      previous: 'http://localhost:9000/api/v2/faqs/?limit=1&offset=0',
      results: [
        {
          id: 2,
          question: ['Question 2'],
          answer: ['Answer 2']
        }
      ]
    };

    const nextState = reduce({
      faqs: [
        {
          id: 1,
          question: ['Question'],
          answer: ['Answer']
        }
      ]
    }, {
      type: FAQ_PAGE_REQUEST_SUCCESS,
      payload: payload
    });

    CmsDataUtil.getRichTextValueAsArray.restore();

    nextState.should.eql({
      loaded: true,
      count: 2,
      next: null,
      previous: 'http://localhost:9000/api/v2/faqs/?limit=1&offset=0',
      faqs: [
        {
          id: 1,
          question: ['Question'],
          answer: ['Answer']
        },
        {
          id: 2,
          question: ['Stub Question 2'],
          answer: ['Stub Answer 2']
        }
      ]
    });
  });
});
