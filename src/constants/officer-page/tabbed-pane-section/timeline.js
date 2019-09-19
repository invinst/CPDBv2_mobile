//Officer timeline
export const TIMELINE_ITEMS = {
  CR: 'CR',
  FORCE: 'FORCE',
  AWARD: 'AWARD',
  UNIT_CHANGE: 'UNIT_CHANGE',
  RANK_CHANGE: 'RANK_CHANGE',
  JOINED: 'JOINED',
  YEAR: 'YEAR',
  EMPTY: 'EMPTY',
};

export const ATTACHMENT_TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',
};

export const TIMELINE_FILTERS = {
  ALL: {
    label: 'All',
    kind: [TIMELINE_ITEMS.CR, TIMELINE_ITEMS.FORCE, TIMELINE_ITEMS.AWARD],
  },
  CRS: {
    label: 'Complaints',
    kind: [TIMELINE_ITEMS.CR],
  },
  SUSTAINED: {
    label: 'Sustained',
    kind: [TIMELINE_ITEMS.CR],
    finding: ['Sustained'],
  },
  FORCE: {
    label: 'Use Of Force',
    kind: [TIMELINE_ITEMS.FORCE],
  },
  AWARDS: {
    label: 'Awards',
    kind: [TIMELINE_ITEMS.AWARD],
  },
  RANK_UNIT_CHANGES: {
    label: 'Rank/Unit Changes',
    kind: [],
  },
};
