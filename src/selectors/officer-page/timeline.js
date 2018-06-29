import { get, nth, rangeRight, slice, isEmpty } from 'lodash';
import moment from 'moment';

import { TIMELINE_ITEMS, ATTACHMENT_TYPES } from 'constants/officer-page/tabbed-pane-section/timeline';


export const baseTransform = (item, index) => {
  const unitName = item['unit_name'] ? `Unit ${item['unit_name']}` : 'Unassigned';

  return {
    year: moment(item.date).year(),
    date: moment(item.date).format('MMM D').toUpperCase(),
    kind: item.kind,
    rank: item.rank,
    rankDisplay: item.rank,
    unitName: unitName,
    unitDescription: item['unit_description'],
    unitDisplay: unitName,
    isFirstRank: false,
    isLastRank: false,
    isFirstUnit: false,
    isLastUnit: false,
    isCurrentUnit: false,
    key: index,
  };
};

export const attachmentsTransform = (attachments) => {
  if (attachments) {
    return attachments.map((attachment) => {
      const fileType = attachment['file_type'];
      let previewImageUrl = attachment['preview_image_url'];
      if (fileType === ATTACHMENT_TYPES.AUDIO) {
        previewImageUrl = '/img/ic-audio.svg';
      } else if (fileType === ATTACHMENT_TYPES.VIDEO) {
        previewImageUrl = '/img/ic-video.svg';
      }
      return {
        title: attachment.title,
        url: attachment.url,
        previewImageUrl: previewImageUrl,
        fileType: fileType,
      };
    });
  }
  return [];
};

export const crTransform = (item, index) => ({
  ...baseTransform(item, index),
  category: item.category,
  crid: item.crid,
  coaccused: item.coaccused,
  finding: item.finding,
  outcome: item.outcome,
  attachments: attachmentsTransform(item.attachments),
});

export const trrTransform = (item, index) => ({
  ...baseTransform(item, index),
  trrId: item['trr_id'],
  category: item['firearm_used'] ? 'Firearm' : item.taser ? 'Taser' : 'Use of Force Report',
});

export const awardTransform = (item, index) => ({
  ...baseTransform(item, index),
  category: item['award_type'],
});

const transformMap = {
  [TIMELINE_ITEMS.CR]: crTransform,
  [TIMELINE_ITEMS.FORCE]: trrTransform,
  [TIMELINE_ITEMS.JOINED]: baseTransform,
  [TIMELINE_ITEMS.UNIT_CHANGE]: baseTransform,
  [TIMELINE_ITEMS.AWARD]: awardTransform,
};

const transform = (item, index) => transformMap[item.kind](item, index);

export const yearItem = (baseItem, year, hasData) => ({
  rank: baseItem.rank,
  rankDisplay: baseItem.rankDisplay,
  unitName: baseItem.unitName,
  unitDescription: baseItem.unitDescription,
  unitDisplay: baseItem.unitDisplay,
  isCurrentUnit: baseItem.isCurrentUnit,
  isFirstRank: false,
  isLastRank: false,
  isFirstUnit: false,
  isLastUnit: false,
  kind: TIMELINE_ITEMS.YEAR,
  date: `${year}`,
  key: `${baseItem.key}-${TIMELINE_ITEMS.YEAR}-${year}`,
  hasData,
});

export const gapYearItems = (fromItem, toItem) => {
  let years = rangeRight(toItem.year, fromItem.year);
  years = slice(years, 0, years.length - 1);

  return years.map((year) => yearItem(toItem, year, false));
};

export const fillYears = (items) => {
  let newItems = [];
  newItems.push(yearItem(items[0], items[0].year, true));

  items.map((currentItem, index) => {
    newItems.push(currentItem);

    if (index < items.length - 1) {
      const nextItem = items[index + 1];
      newItems = newItems.concat(gapYearItems(currentItem, nextItem));
      if (nextItem.year < currentItem.year) {
        newItems.push(yearItem(nextItem, nextItem.year, true));
      }
    }
  });

  return newItems;
};

const emptyItem = (baseItem) => ({
  ...baseItem,
  kind: TIMELINE_ITEMS.EMPTY,
  key: `${baseItem.key}-${TIMELINE_ITEMS.EMPTY}`,
});

export const fillEmptyItems = (items) => {
  const newItems = [];

  items.map((item, index) => {
    newItems.push(item);

    const nextItem = nth(items, index + 1);
    if (nextItem && item.kind === TIMELINE_ITEMS.UNIT_CHANGE && nextItem.kind === TIMELINE_ITEMS.YEAR) {
      newItems.push(emptyItem(nextItem));
    }
  });

  return newItems;
};

export const dedupeRank = (items) => {
  items[0].isFirstRank = true;
  items[items.length - 1].isLastRank = true;
  return items.map((item, index) => {
    if (index !== 0) {
      item.rankDisplay = ' ';
    }
    return item;
  });
};

export const dedupeUnit = (items) => {
  return items.map((currentItem, index) => {
    if (index > 0) {
      const previousItem = items[index - 1];
      if (currentItem.unitDescription === previousItem.unitDescription) {
        currentItem.unitDisplay = ' ';
      }
    }
    return currentItem;
  });
};

export const markFirstAndLastUnit = (items) => {
  items[0].isFirstUnit = true;
  items[items.length - 1].isLastUnit = true;
  items.map((item, index) => {
    if (item.kind === TIMELINE_ITEMS.UNIT_CHANGE) {
      if (index - 1 >= 0) {
        items[index - 1].isLastUnit = true;
      }
      items[index + 1].isFirstUnit = true;
    }
  });
  return items;
};

export const fillUnitChange = (items) => {
  let previousUnitChangeItem = undefined;

  items.map((item) => {
    if (item.kind === TIMELINE_ITEMS.UNIT_CHANGE) {
      if (previousUnitChangeItem !== undefined) {
        previousUnitChangeItem.oldUnitName = item.unitName;
        previousUnitChangeItem.oldUnitDescription = item.unitDescription;
      }

      previousUnitChangeItem = item;
    }
  });

  const lastUnitChangeItem = previousUnitChangeItem;

  if (lastUnitChangeItem !== undefined) {
    lastUnitChangeItem.oldUnitName = items[items.length - 1].unitName;
    lastUnitChangeItem.oldUnitDescription = items[items.length - 1].unitDescription;
  }
  return items;
};

export const markLatestUnit = (items) => {
  const latestUnit = items[0] ? items[0].unitName : undefined;

  let inLastUnitPeriod = true;

  return items.map((item) => {
    if (item.kind === TIMELINE_ITEMS.UNIT_CHANGE) {
      inLastUnitPeriod = false;
    }
    item.isCurrentUnit = inLastUnitPeriod && item.unitName === latestUnit;
    return item;
  });
};

export const getNewTimelineItems = state => {
  // Do not change the order of these processors
  const processors = [fillYears, fillEmptyItems, dedupeRank, dedupeUnit, markFirstAndLastUnit, fillUnitChange];
  const items = get(state.officerPage.timeline, 'items', []);
  const transformedItems = markLatestUnit(items.map(transform));
  if (isEmpty(transformedItems)) {
    return [];
  }
  return processors.reduce((accItems, processor) => processor(accItems), transformedItems);
};
