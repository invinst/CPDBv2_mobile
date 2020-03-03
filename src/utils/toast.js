import React from 'react';
import pluralize from 'pluralize';
import { get, identity, filter, keys } from 'lodash';
import cx from 'classnames';
import ReactMarkdown from 'react-markdown';

import browserHistory from 'utils/history';
import { PINBOARD_PATH } from 'constants/paths';
import { Toastify } from 'utils/toastify';
import toastStyles from './toast.sass';
import { generatePinboardUrl } from 'utils/pinboard';
import { getToasts } from 'selectors/toast';
import MarkdownLink from 'components/common/markdown-renderers/markdown-link';

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
  `${ invalidParams.join(', ') } ${ pluralize('is', invalidParams.length) } not recognized.`;

const TopRightTransition = Toastify.cssTransition({
  enter: 'toast-enter',
  exit: 'toast-exit',
  duration: 500,
  appendPosition: true,
});

export const showPinboardToast = (message) => Toastify.toast(message, {
  className: toastStyles.pinboardPageToast,
  transition: TopRightTransition,
  autoClose: false,
});

export const showAlertToast = (message, onClick) => Toastify.toast(message, {
  className: toastStyles.alertToast,
  transition: TopRightTransition,
  autoClose: false,
  draggable: false,
  onClick,
});

export function showCreatedToasts(pinboardSavingResponse) {
  const foundOfficerIds = get(pinboardSavingResponse, 'officer_ids', []);
  const foundCrids = get(pinboardSavingResponse, 'crids', []);
  const foundTrrIds = get(pinboardSavingResponse, 'trr_ids', []);

  const notFoundOfficerIds = get(pinboardSavingResponse, 'not_found_items.officer_ids', []);
  const notFoundCrids = get(pinboardSavingResponse, 'not_found_items.crids', []);
  const notFoundTrrIds = get(pinboardSavingResponse, 'not_found_items.trr_ids', []);

  const creatingMessages = [];
  creatingMessages.push(formatMessage(foundOfficerIds, notFoundOfficerIds, 'officer'));
  creatingMessages.push(formatMessage(foundCrids, notFoundCrids, 'allegation'));
  creatingMessages.push(formatMessage(foundTrrIds, notFoundTrrIds, 'TRR'));

  creatingMessages.filter(identity).forEach(showPinboardToast);
}

const CR_TOAST_TEMPLATE = {
  'crid': 'id',
};

const OFFICER_TOAST_TEMPLATE = {
  'id': 'id',
  'full_name': 'fullName',
};

const TRR_TOAST_TEMPLATE = {
  'id': 'id',
};

const TEMPLATE_TYPE_MAP = {
  'CR': {
    type: 'CR',
    template: CR_TOAST_TEMPLATE,
  },
  'DATE > CR': {
    type: 'CR',
    template: CR_TOAST_TEMPLATE,
  },
  'INVESTIGATOR > CR': {
    type: 'CR',
    template: CR_TOAST_TEMPLATE,
  },
  'OFFICER': {
    type: 'OFFICER',
    template: OFFICER_TOAST_TEMPLATE,
  },
  'UNIT > OFFICERS': {
    type: 'OFFICER',
    template: OFFICER_TOAST_TEMPLATE,
  },
  'DATE > OFFICERS': {
    type: 'OFFICER',
    template: OFFICER_TOAST_TEMPLATE,
  },
  'TRR': {
    type: 'TRR',
    template: TRR_TOAST_TEMPLATE,
  },
  'DATE > TRR': {
    type: 'TRR',
    template: TRR_TOAST_TEMPLATE,
  },
};

function getToastTemplate(toasts, name) {
  const toast = filter(toasts, toast => toast.name === TEMPLATE_TYPE_MAP[name].type)[0];
  if (toast) {
    return toast.template;
  }
}

function buildToastMessage(template, item) {
  let message = template;
  const TEMPLATE = TEMPLATE_TYPE_MAP[item.type].template;

  keys(TEMPLATE).forEach(
    tag => message = message.replace(`{${tag}}`, item[TEMPLATE[tag]])
  );
  message = message.replace('{action_type}', item.isPinned ? 'removed from' : 'added to');
  return message;
}

export function showAddOrRemoveItemToast(store, payload) {
  const { isPinned, type } = payload;

  const state = store.getState();
  const pinboard = state.pinboardPage.pinboard;
  const url = generatePinboardUrl(pinboard) || PINBOARD_PATH;
  const toasts = getToasts(state);
  const toastTemplate = getToastTemplate(toasts, type);
  const toastMessage = buildToastMessage(toastTemplate, payload);

  Toastify.toast(<ReactMarkdown source={ toastMessage } renderers={ { link: MarkdownLink } } />, {
    className: cx(toastStyles.toastWrapper, isPinned ? 'removed' : 'added'),
    bodyClassName: 'toast-body',
    transition: TopRightTransition,
    onClick: () => browserHistory.push(url),
  });
}

export const showInvalidParamToasts = invalidParams => showPinboardToast(formatInvalidParamMessage(invalidParams));
