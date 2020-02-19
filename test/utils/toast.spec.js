import { stub } from 'sinon';
import { Promise } from 'es6-promise';

import browserHistory from 'utils/history';
import { Toastify } from 'utils/toastify';
import toastStyles from 'utils/toast.sass';
import {
  showPinboardToast,
  showAddOrRemoveItemToast,
  showCreatedToasts,
  showInvalidParamToasts,
  showAlertToast,
} from 'utils/toast';

describe('Toast utils', function () {
  beforeEach(function () {
    Toastify.toast.resetHistory();
  });

  const cssTransition = Toastify.cssTransition({
    enter: 'toast-enter',
    exit: 'toast-exit',
    duration: 500,
    appendPosition: true,
  });

  const createStore = (pinboard, pathname='', dispatchResults='abc') => ({
    getState: () => {
      return {
        pinboardPage: {
          pinboard,
          officerItems: {
            items: [],
            requesting: false,
          },
          crItems: {
            items: [],
            requesting: false,
          },
          trrItems: {
            items: [],
            requesting: false,
          },
        },
        pathname,
        toasts: [
          {
            name: 'OFFICER',
            template: '{full_name} {action_type} pinboard',
          },
          {
            name: 'CR',
            template: 'CR #{crid} {action_type} pinboard',
          },
          {
            name: 'TRR',
            template: 'TRR #{id} {action_type} pinboard',
          },
        ],
      };
    },
    dispatch: stub().usingPromise(Promise).resolves(dispatchResults),
  });

  describe('showPinboardToast', function () {
    it('should show a toast with provided message and pinboard toast style', function () {
      showPinboardToast('toast message');
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.should.be.calledWith(
        'toast message',
        {
          className: toastStyles.pinboardPageToast,
          transition: cssTransition,
          autoClose: false,
        }
      );
    });
  });

  describe('showAddOrRemoveItemToast', function () {
    it('should show added toast if isPinned is false', function () {
      const browserHistoryPush = stub(browserHistory, 'push');

      const pinboard = { id: '123abc' };
      const store = createStore(pinboard);
      const payload = {
        type: 'CR',
        isPinned: false,
        id: 'C123456',
      };
      showAddOrRemoveItemToast(store, payload);

      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].props.source.should.equal('CR #C123456 added to pinboard');
      Toastify.toast.getCall(0).args[1]['className'].should.equal(`${toastStyles.toastWrapper} added`);
      Toastify.toast.getCall(0).args[1]['transition'].should.eql(cssTransition);
      Toastify.toast.getCall(0).args[1]['onClick']();
      browserHistoryPush.should.be.calledWith('/pinboard/123abc/untitled-pinboard/');
    });

    it('should show added toast if isPinned is true', function () {
      const pinboard = { id: '123abc' };
      const store = createStore(pinboard);
      const dateCrPayload = {
        type: 'DATE > CR',
        isPinned: true,
        id: 'C123456',
      };
      const investigatorCrPayload = {
        type: 'INVESTIGATOR > CR',
        isPinned: true,
        id: 'C123456',
      };
      const unitOfficerPayload = {
        type: 'UNIT > OFFICERS',
        isPinned: true,
        id: 8562,
        fullName: 'Jerome Finnigan',
      };
      const trrPayload = {
        type: 'TRR',
        isPinned: true,
        id: '123456',
      };
      const dateTrrPayload = {
        type: 'DATE > TRR',
        isPinned: true,
        id: '123456',
      };

      showAddOrRemoveItemToast(store, dateCrPayload);
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].props.source.should.equal('CR #C123456 removed from pinboard');

      Toastify.toast.resetHistory();
      showAddOrRemoveItemToast(store, investigatorCrPayload);
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].props.source.should.equal('CR #C123456 removed from pinboard');

      Toastify.toast.resetHistory();
      showAddOrRemoveItemToast(store, unitOfficerPayload);
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].props.source.should.equal('Jerome Finnigan removed from pinboard');

      Toastify.toast.resetHistory();
      showAddOrRemoveItemToast(store, trrPayload);
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].props.source.should.equal('TRR #123456 removed from pinboard');

      Toastify.toast.resetHistory();
      showAddOrRemoveItemToast(store, dateTrrPayload);
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].props.source.should.equal('TRR #123456 removed from pinboard');
    });

    it('should show toasts with correct type message', function () {
      const pinboard = { id: '123abc' };
      const store = createStore(pinboard);
      const officerPayload = {
        type: 'OFFICER',
        isPinned: true,
        id: 8562,
        fullName: 'Jerome Finnigan',
      };
      showAddOrRemoveItemToast(store, officerPayload);

      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].props.source.should.equal('Jerome Finnigan removed from pinboard');
      Toastify.toast.getCall(0).args[1]['className'].should.equal(`${toastStyles.toastWrapper} removed`);
      Toastify.toast.getCall(0).args[1]['transition'].should.eql(cssTransition);
    });
  });

  describe('showCreatedToasts', function () {
    it('should show toasts with number of success items over not found items', function () {
      const pinboardSavingResponse = {
        id: 'abc123',
        'officer_ids': [1],
        crids: ['1053673'],
        'trr_ids': [],
        'not_found_items': {
          'officer_ids': [],
          crids: ['xyz567', 'tyu890'],
          'trr_ids': [3, 99],
        },
      };
      showCreatedToasts(pinboardSavingResponse);
      Toastify.toast.should.be.calledTwice();
      Toastify.toast.should.be.calledWith(
        '1 out of 3 allegations were added to this pinboard. ' +
        '2 out of 3 allegation IDs could not be recognized (xyz567, tyu890).',
      );
      Toastify.toast.should.be.calledWith('2 out of 2 TRR IDs could not be recognized (3, 99).');
    });
  });

  describe('showInvalidParamToasts', function () {
    it('should show correct message with on invalid param', function () {
      showInvalidParamToasts(['invalid-param']);
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.should.be.calledWith('invalid-param is not recognized.');
    });

    it('should show correct message with invalid params', function () {
      showInvalidParamToasts(['invalid-param-a', 'invalid-param-b']);
      Toastify.toast.should.be.calledOnce();
      Toastify.toast.should.be.calledWith('invalid-param-a, invalid-param-b are not recognized.');
    });
  });

  describe('showAlertToast', function () {
    it('should show toast with autoClose is false', function () {
      const onClick = stub();
      showAlertToast('toast message', onClick);

      Toastify.toast.should.be.calledOnce();
      Toastify.toast.getCall(0).args[0].should.equal('toast message');
      Toastify.toast.getCall(0).args[1]['className'].should.equal(toastStyles.alertToast);
      Toastify.toast.getCall(0).args[1]['autoClose'].should.be.false();
      Toastify.toast.getCall(0).args[1]['draggable'].should.be.false();
      Toastify.toast.getCall(0).args[1]['onClick'].should.be.eql(onClick);
    });
  });
});
