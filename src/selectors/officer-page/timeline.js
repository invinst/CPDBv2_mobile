import {
  get,
  rangeRight,
  slice,
  isEmpty,
  compact,
  isNull,
  cloneDeep,
  map,
  includes,
  difference,
  values,
  concat,
  filter,
  isUndefined,
} from 'lodash';
import moment from 'moment';
import { createSelector } from 'reselect';

import {
  TIMELINE_ITEMS,
  ATTACHMENT_TYPES,
  TIMELINE_FILTERS,
} from 'constants/officer-page/tabbed-pane-section/timeline';


const getSelectedFilter = (state) => get(state, 'officerPage.timeline.filter', '');
export const getItems = (state, props) => get(state.officerPage.timeline.data, String(props.officerId), []);

export const baseTransform = (item, index) => {
  const unitName = item['unit_name'] ? `Unit ${item['unit_name']}` : 'Unassigned';
  const rank = get(item, 'rank', 'Unassigned');

  return {
    year: moment(item.date).year(),
    date: moment(item.date).format('MMM D').toUpperCase(),
    kind: item.kind,
    unitName,
    rank,
    unitDescription: item['unit_description'],
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
        if (isNull(previewImageUrl)) {
          previewImageUrl = '/img/ic-video.svg';
        }
      }
      return {
        title: attachment.title,
        url: attachment.url,
        previewImageUrl: previewImageUrl,
        fileType: fileType,
        id: attachment['id'],
      };
    });
  }
  return [];
};

export const crTransform = (item, index) => ({
  ...baseTransform(item, index),
  category: item.category,
  crid: item.crid,
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
  [TIMELINE_ITEMS.RANK_CHANGE]: baseTransform,
};

const transform = (item, index) => {
  const transformFunc = transformMap[item.kind];

  return transformFunc ? transformFunc(item, index) : null;
};

export const yearItem = (baseItem, year, hasData) => ({
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

export const fillRankChange = (items) => {
  let previousRankChangeItem = undefined;

  items.map((item) => {
    if (item.kind === TIMELINE_ITEMS.RANK_CHANGE) {
      if (previousRankChangeItem !== undefined) {
        previousRankChangeItem.oldRank = item.rank;
      }

      previousRankChangeItem = item;
    }
  });

  const lastRankChangeItem = previousRankChangeItem;

  if (lastRankChangeItem !== undefined) {
    lastRankChangeItem.oldRank = items[items.length - 1].rank;
  }
  return items;
};

const filterByKind = (selectedFilter, items) => {
  const unremovableKinds = difference(values(TIMELINE_ITEMS), TIMELINE_FILTERS.ALL.kind);
  const filteredKinds = selectedFilter.kind;
  const displayKinds = concat(unremovableKinds, filteredKinds);

  return filter(items, (item) => includes(displayKinds, item.kind));
};

export const applyFilter = (selectedFilter, items) => {
  let results = [];
  let cloneSelectedFilter = cloneDeep(selectedFilter);
  delete cloneSelectedFilter.label;
  delete cloneSelectedFilter.kind;

  if (!isUndefined(selectedFilter.kind)) {
    results = filterByKind(selectedFilter, items);
  }

  if (isEmpty(cloneSelectedFilter)) {
    return results;
  }

  Object.keys(cloneSelectedFilter).map(key => {
    results = filter(results, result => includes(selectedFilter[key], result[key]));
  });

  return results;
};

export const getNewTimelineItems = createSelector(
  getItems,
  getSelectedFilter,
  (items, filter) => {
    // Do not change the order of these processors
    const processors = [fillYears, fillUnitChange, fillRankChange];
    const transformedItems = compact(items.map(transform));

    const filteredItems = applyFilter(filter, transformedItems);
    if (isEmpty(filteredItems)) {
      return [];
    }

    return processors.reduce((accItems, processor) => processor(accItems), filteredItems);
  }
);

export const isTimelineSuccess = (state, officerId) => get(
  state.officerPage.timeline.isSuccess, String(officerId), false
);

export const filterCount = createSelector(
  getItems,
  items => {
    let count = cloneDeep(TIMELINE_FILTERS);
    let CLONE_TIMELINE_FILTERS = cloneDeep(TIMELINE_FILTERS);

    map(CLONE_TIMELINE_FILTERS, filter => delete filter.label);

    Object.keys(count).map(key => {
      count[key] = 0;
      items.map(item => {
        let excluded = false;
        map(CLONE_TIMELINE_FILTERS[key], (filter, subKey) => {
          if (!includes(filter, item[subKey])) {
            excluded = true;
          }
        });
        if (!excluded) {
          count[key]++;
        }
      });
    });

    console.warn('count', count);
    return count;
  }
);
