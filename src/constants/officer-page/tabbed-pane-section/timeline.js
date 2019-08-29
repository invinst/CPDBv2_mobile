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
    label: 'ALL',
    kind: [TIMELINE_ITEMS.CR, TIMELINE_ITEMS.FORCE, TIMELINE_ITEMS.AWARD],
  },
  CRS: {
    label: 'COMPLAINTS',
    kind: [TIMELINE_ITEMS.CR],
  },
  SUSTAINED: {
    label: 'SUSTAINED',
    kind: [TIMELINE_ITEMS.CR],
    finding: ['Sustained'],
  },
  FORCE: {
    label: 'USE OF FORCE',
    kind: [TIMELINE_ITEMS.FORCE],
  },
  AWARDS: {
    label: 'AWARDS',
    kind: [TIMELINE_ITEMS.AWARD],
  },
  RANK_UNIT_CHANGES: {
    label: 'RANK/UNIT CHANGES',
    kind: [],
  },
};
