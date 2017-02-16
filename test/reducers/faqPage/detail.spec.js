import should from 'should';  // eslint-disable-line no-unused-vars
import { stub } from 'sinon';
import * as CmsDataUtil from 'utils/CmsDataUtil';
import {
  FAQ_REQUEST_START,
  FAQ_REQUEST_SUCCESS,
  FAQ_REQUEST_FAILURE
} from 'actions/faq-page';
import reduce from 'reducers/faqPage/detail';


describe('FAQ detail reducer', function () {
  it('should return initial state', function () {
    reduce(undefined, {}).should.eql({});
  });

  it('should handle FAQ_REQUEST_START', function () {
    reduce({}, {
      type: FAQ_REQUEST_START,
      payload: {}
    }).should.eql({
      loaded: false,
      id: '',
      question: [],
      answer: []
    });
  });

  it('should handle FAQ_REQUEST_FAILURE', function () {
    reduce({}, {
      type: FAQ_REQUEST_FAILURE,
      payload: {}
    }).should.eql({
      loaded: false,
      id: '',
      question: [],
      answer: []
    });
  });

  it('should handle FAQ_REQUEST_SUCCESS', function () {
    const stubGetRichTextValueAsArray = (obj, fieldName) => {
      return obj[fieldName].map((value) => 'Stub ' + value);
    };
    stub(CmsDataUtil, 'getRichTextValueAsArray', stubGetRichTextValueAsArray);

    const payload = {
      id: 1,
      question: ['Question'],
      answer: ['Answer']
    };

    reduce({}, {
      type: FAQ_REQUEST_SUCCESS,
      payload: payload
    }).should.eql({
      loaded: true,
      id: 1,
      question: ['Stub Question'],
      answer: ['Stub Answer']
    });

    CmsDataUtil.getRichTextValueAsArray.restore();
  });
});
