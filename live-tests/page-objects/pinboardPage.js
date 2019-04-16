
module.exports = {
  url: function (pinboardId) {
    return `${this.api.globals.clientUrl}/pinboard/${pinboardId}/pinboard-title/`;
  },

  sections: {
    pinnedSection: {
      selector: '.test--pinned-section',
      sections: {
        officers: {
          selector: '.test--OFFICER-section',
          elements: {
            title: '.type-title',
          },
          sections: {
            firstCard: {
              selector: '.type-cards > a:first-child',
              elements: {
                firstCardUnpinBtn: '.test--item-unpin-button',
                firstCardRank: '.officer-rank',
                firstCardName: '.officer-name',
                firstCardCRsCount: '.test--officer-cr-count',
              },
            }
          },
        },
        crs: {
          selector: '.test--CR-section',
          elements: {
            title: '.type-title',
          },
          sections: {
            firstCard: {
              selector: '.type-cards > div:first-child',
              elements: {
                firstCardUnpinBtn: '.test--item-unpin-button',
                firstCardDate: '.cr-incident-date',
                firstCardCategory: '.cr-category',
              }
            }
          },
        },
        trrs: {
          selector: '.test--TRR-section',
          elements: {
            title: '.type-title',
          },
          sections: {
            firstCard: {
              selector: '.type-cards > div:first-child',
              elements: {
                firstCardUnpinBtn: '.test--item-unpin-button',
                firstCardDate: '.trr-date',
                firstCardCategory: '.trr-category',
              }
            }
          }
        },
      }
    }
  }
};
