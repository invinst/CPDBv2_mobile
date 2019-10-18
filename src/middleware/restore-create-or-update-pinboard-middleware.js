import { Promise } from 'es6-promise';
import * as _ from 'lodash';
import pluralize from 'pluralize';

import {
  ADD_OR_REMOVE_ITEM_IN_PINBOARD,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  ADD_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
  SAVE_PINBOARD,
  UPDATE_PINBOARD_INFO,
  createPinboard,
  updatePinboard,
  fetchLatestRetrievedPinboard,
  fetchPinboardSocialGraph,
  fetchPinboardGeographic,
  fetchFirstPagePinboardGeographicCrs,
  fetchOtherPagesPinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchOtherPagesPinboardGeographicTrrs,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  addItemToPinboardState,
  removeItemFromPinboardState,
  orderPinboardState,
  savePinboard,
  updatePinboardInfoState,
  performFetchPinboardRelatedData,
} from 'actions/pinboard';
import { showToast } from 'actions/toast';
import { getPathname } from 'selectors/common/routing';
import loadPaginatedData from 'utils/load-paginated-data';
import { Toastify } from 'utils/toastify';
import pinboardStyles from 'components/pinboard-page/pinboard-page.sass';


const getIds = (query, key) => _.get(query, key, '').split(',').filter(_.identity);
const isParam = (param, validators) => validators.includes(_.toLower(_.camelCase(param)));

const getPinboardFromQuery = (query) => {
  const invalidParams = [];
  const pinboardFromQuery = {
    officerIds: [],
    crids: [],
    trrIds: [],
  };
  _.keys(query).forEach(param => {
    if (isParam(param, ['officerid', 'officerids'])) {
      pinboardFromQuery.officerIds = getIds(query, param).map(id => parseInt(id));
    } else if (isParam(param, ['crid', 'crids'])) {
      pinboardFromQuery.crids = getIds(query, param);
    } else if (isParam(param, ['trrid', 'trrids'])) {
      pinboardFromQuery.trrIds = getIds(query, param).map(id => parseInt(id));
    } else {
      invalidParams.push(param);
    }
  });
  return { pinboardFromQuery, invalidParams };
};

const getRequestPinboard = pinboard => ({
  id: _.get(pinboard, 'id', null),
  title: _.get(pinboard, 'title', ''),
  officerIds: _.map(_.get(pinboard, 'officer_ids', []), id => (id.toString())),
  crids: _.get(pinboard, 'crids', []),
  trrIds: _.map(_.get(pinboard, 'trr_ids', []), id => (id.toString())),
  description: _.get(pinboard, 'description', ''),
});

const MAX_RETRIES = 60;
const RETRY_DELAY = 1000;
let retries = 0;

function dispatchUpdateOrCreatePinboard(store, currentPinboard, successCallBack=_.noop) {
  const updateOrCreatePinboard = _.isNil(currentPinboard.id) ? createPinboard : updatePinboard;
  store.dispatch(updateOrCreatePinboard(currentPinboard)).then(result => {
    retries = 0;
    store.dispatch(savePinboard(result.payload));
    successCallBack(result.payload);
  }).catch(() => {
    if (retries < MAX_RETRIES) {
      retries += 1;
      setTimeout(() => store.dispatch(savePinboard()), RETRY_DELAY);
    }
  });
}

function formatMessage(foundIds, notFoundIds, itemType) {
  let message = '';
  if (!notFoundIds.length)
    return '';

  const total = foundIds.length + notFoundIds.length;
  if (foundIds.length) {
    message += ` ${ foundIds.length } out of ${ total } ${ total === 1 ? itemType : `${ itemType }s` } ` +
      'were added to this pinboard.';
  }
  message += ` ${ notFoundIds.length } out of ${ total } ${ itemType } ${ total === 1 ? 'ID' : 'IDs' } ` +
    `could not be recognized (${ notFoundIds.join(', ') }).`;
  return message.trim();
}

const formatInvalidParamMessage = (invalidParams) =>
  `${invalidParams.join(', ')} ${pluralize('is', invalidParams.length)} not recognized.`;

const TopRightTransition = Toastify.cssTransition({
  enter: 'toast-enter',
  exit: 'toast-exit',
  duration: 500,
  appendPosition: true,
});
const showPinboardToast = (message) => Toastify.toast(message, {
  className: pinboardStyles.pinboardPageToast,
  bodyClassName: 'toast-body',
  transition: TopRightTransition,
  autoClose: false,
});

function showCreatedToasts(payload) {
  const foundOfficerIds = _.get(payload, 'officer_ids', []);
  const foundCrids = _.get(payload, 'crids', []);
  const foundTrrIds = _.get(payload, 'trr_ids', []);

  const notFoundOfficerIds = _.get(payload, 'not_found_items.officer_ids', []);
  const notFoundCrids = _.get(payload, 'not_found_items.crids', []);
  const notFoundTrrIds = _.get(payload, 'not_found_items.trr_ids', []);

  const creatingMessages = [];
  creatingMessages.push(formatMessage(foundOfficerIds, notFoundOfficerIds, 'officer'));
  creatingMessages.push(formatMessage(foundCrids, notFoundCrids, 'allegation'));
  creatingMessages.push(formatMessage(foundTrrIds, notFoundTrrIds, 'TRR'));

  creatingMessages.filter(_.identity).forEach(showPinboardToast);
}

export default store => next => action => {
  if (action.type === ADD_OR_REMOVE_ITEM_IN_PINBOARD || action.type === ADD_ITEM_IN_PINBOARD_PAGE) {
    const addOrRemove = action.payload.isPinned ? removeItemFromPinboardState : addItemToPinboardState;

    if (action.type === ADD_OR_REMOVE_ITEM_IN_PINBOARD) {
      store.dispatch(showToast(action.payload));
    }

    Promise.all([store.dispatch(addOrRemove(action.payload))]).finally(() => {
      store.dispatch(savePinboard());
    });
  }

  if (action.type === REMOVE_ITEM_IN_PINBOARD_PAGE) {
    Promise.all([store.dispatch(removeItemFromPinboardState(action.payload))]).finally(() => {
      store.dispatch(savePinboard());
    });
  }

  if (action.type === UPDATE_PINBOARD_INFO) {
    Promise.all([store.dispatch(updatePinboardInfoState(action.payload))]).finally(() => {
      store.dispatch(savePinboard());
    });
  }

  if (action.type === ORDER_PINBOARD) {
    Promise.all([store.dispatch(orderPinboardState(action.payload))]).finally(() => {
      store.dispatch(savePinboard());
    });
  }

  if (action.type === SAVE_PINBOARD) {
    const state = store.getState();
    const pinboard = state.pinboardPage.pinboard;
    const currentPinboard = getRequestPinboard(pinboard);
    const pinboardId = currentPinboard.id;

    if (!pinboard.saving) {
      const savedPinboard = getRequestPinboard(action.payload);

      if (_.isEmpty(action.payload) || !_.isEqual(currentPinboard, savedPinboard)) {
        dispatchUpdateOrCreatePinboard(store, currentPinboard);
      } else {
        if (_.startsWith(getPathname(state), '/pinboard/') && pinboardId && pinboard.needRefreshData) {
          store.dispatch(performFetchPinboardRelatedData());
          store.dispatch(fetchPinboardSocialGraph(pinboardId));
          store.dispatch(fetchPinboardGeographic());
          loadPaginatedData(
            { 'pinboard_id': pinboardId },
            fetchFirstPagePinboardGeographicCrs,
            fetchOtherPagesPinboardGeographicCrs,
            store,
          );
          loadPaginatedData(
            { 'pinboard_id': pinboardId },
            fetchFirstPagePinboardGeographicTrrs,
            fetchOtherPagesPinboardGeographicTrrs,
            store,
          );
          store.dispatch(fetchPinboardRelevantDocuments(pinboardId));
          store.dispatch(fetchPinboardRelevantCoaccusals(pinboardId));
          store.dispatch(fetchPinboardRelevantComplaints(pinboardId));
        }
      }
    }
  }

  if (action.type === '@@router/LOCATION_CHANGE') {
    const state = store.getState();
    const pinboard = state.pinboardPage.pinboard;
    if (pinboard.saving) {
      const currentPinboard = getRequestPinboard(pinboard);
      dispatchUpdateOrCreatePinboard(store, currentPinboard);
    }

    const onPinboardPage = action.payload.pathname.match(/\/pinboard\//);
    const hasPinboardId = action.payload.pathname.match(/\/pinboard\/[a-fA-F0-9]+\//);
    if (onPinboardPage && !hasPinboardId) {
      const { pinboardFromQuery, invalidParams } = getPinboardFromQuery(action.payload.query);
      _.isEmpty(invalidParams) || showPinboardToast(formatInvalidParamMessage(invalidParams));

      const { officerIds, crids, trrIds } = pinboardFromQuery;
      const isEmptyPinboard = _.isEmpty(officerIds) && _.isEmpty(crids) && _.isEmpty(trrIds);
      if (!isEmptyPinboard)
        dispatchUpdateOrCreatePinboard(store, pinboardFromQuery, showCreatedToasts);
      else {
        _.isEmpty(action.payload.query) || showPinboardToast('Redirected to latest pinboard.');
        store.dispatch(fetchLatestRetrievedPinboard({ create: true }));
      }
    } else if (!state.pinboardPage.pinboard.isPinboardRestored && !onPinboardPage) {
      store.dispatch(fetchLatestRetrievedPinboard({ create: false }));
    }
  }

  return next(action);
};
