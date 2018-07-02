module.exports = {
  url: function (id) {
    return `${this.api.globals.clientUrl}/officer/${id}/timeline/`;
  },

  elements: {
    crItem: '.test--timeline-cr-item',
    trrItem: '.test--timeline-trr-item',
    awardItem: '.test--timeline-award-item',
    unitChangeItem: '.test--timeline-unit-change-item',
    joinedItem: '.test--timeline-joined-item',
    yearItem: '.test--timeline-year-item',
    attachmentThumbnail: '.test--attachments .image',
  }
};
