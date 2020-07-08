const emptyPinboardData = {
  'officer_ids': [],
  crids: [],
  'trr_ids': [],
};

const pinNewDocumentRequestData = {
  'officer_ids': [],
  'crids': ['170123'],
  'trr_ids': [],
};

const pinComplaintRequestData = {
  'officer_ids': [],
  'crids': ['123'],
  'trr_ids': [],
};

const pinTopOfficerRequestData = {
  'officer_ids': [13788],
  'crids': [],
  'trr_ids': [],
};

const pinRecentActivityOfficerRequestData = {
  'officer_ids': [12074],
  'crids': [],
  'trr_ids': [],
};

module.exports = {
  emptyPinboardData,
  pinTopOfficerRequestData,
  pinRecentActivityOfficerRequestData,
  pinNewDocumentRequestData,
  pinComplaintRequestData,
};
