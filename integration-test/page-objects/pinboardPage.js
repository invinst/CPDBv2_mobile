const baseRelevantComplaints = (type) => ({
  selector: `.relevant-${type}s`,
  elements: {
    title: '.relevant-infinite-carousel-title',
    carouselTip: '.relevant-infinite-carousel-tip',
  },
  sections: {
    [`${type}Card`]: {
      selector: `.relevant-${type}s .swiper-slide > div:first-child`,
      elements: {
        plusButton: {
          selector: `//div[contains(@class, "relevant-${type}s")]` +
            '//span[contains(@class, "swiper-slide")][1]//div[contains(@class, "plus-button")]',
          locateStrategy: 'xpath',
        },
        incidentDate: '.incident-date',
        category: '.category',
        firstTopOfficerName: '.top-officer-row-officer-name',
        secondTopOfficerName: '.top-officer-row:nth-child(2) .top-officer-row-officer-name',
        notShowingOfficerCount: '.not-showing-officer-count',
        leftHalf: '.left-half',
        topOfficers: '.top-officers',
        remainingOfficers: '.remaining-officers',
        undoText: '.undo-card-text',
        undoButton: '.undo-button',
        firstRadarChart: {
          locateStrategy: 'xpath',
          selector: '//*[name()="svg" and contains(@class, "radar-chart__radar-chart")]',
        },
      },
    },
  },
});

const nthPinboardItemTitle = (index) => ({
  selector: `//div[contains(@class, "pinboard-item")][${index}]//div[@class="pinboard-title"]`,
  locateStrategy: 'xpath',
});

const nthPinboardItemCreatedAt = (index) => ({
  selector: `//div[contains(@class, "pinboard-item")][${index}]//div[@class="pinboard-created-at"]`,
  locateStrategy: 'xpath',
});


module.exports = {
  url: function (pinboardId, queryString) {
    if (queryString) {
      return `${this.api.globals.clientUrl}/pinboard/${queryString}`;
    }
    if (!pinboardId)
      return `${this.api.globals.clientUrl}/pinboard/`;
    return `${this.api.globals.clientUrl}/pinboard/${pinboardId}/pinboard-title/`;
  },

  elements: {
    body: 'body',
    header: '.header-parent',
    highlightedMenuItem: '.menu-item.highlight',
    searchBar: '.search-box',
    pinboardsListButton: '.pinboards-list-btn',
    socialGraphTitle: '.sidenav-title',
    socialGraph: {
      locateStrategy: 'xpath',
      selector: '//div[contains(@class, "animated-social-graph")]',
    },
    visualizationTitle: '.visualization-title',
    pinboardTitle: '.pinboard-title',
    pinboardDescription: '.pinboard-description',
    navigationNextButton: '.swiper-button-next',
    navigationPreviousButton: '.swiper-button-prev',
    refreshButton: '.refresh-button',
    firstBullet: {
      locateStrategy: 'xpath',
      selector: '//span[contains(@class, "swiper-pagination-bullet")][1]',
    },
    secondBullet: {
      locateStrategy: 'xpath',
      selector: '//span[contains(@class, "swiper-pagination-bullet")][2]',
    },
    complaintText: {
      selector: '//div[contains(@class, "legend__legend")]//div[1]//span[contains(@class, "legend-row-text")]',
      locateStrategy: 'xpath',
    },
    trrText: {
      selector: '//div[contains(@class, "legend__legend")]//div[2]//span[contains(@class, "legend-row-text")]',
      locateStrategy: 'xpath',
    },
    complaintNumber: {
      selector: '//div[contains(@class, "legend__legend")]//div[1]//span[contains(@class, "legend-row-number")]',
      locateStrategy: 'xpath',
    },
    trrNumber: {
      selector: '//div[contains(@class, "legend__legend")]//div[2]//span[contains(@class, "legend-row-number")]',
      locateStrategy: 'xpath',
    },
    biggestGraphNode: {
      selector: '(//*[@r="7"])',
      locateStrategy: 'xpath',
    },
    firstToast: '.Toastify__toast:first-child',
    secondToast: '.Toastify__toast:nth-child(2)',
  },

  sections: {
    pinnedSection: {
      selector: 'div.pinned-section',
      sections: {
        officers: {
          selector: '.test--OFFICER-section',
          elements: {
            title: '.type-title',
          },
          sections: {
            card: {
              selector: '.test--OFFICER-section .pinned-grid-item',
            },
            firstCard: {
              selector: '.pinned-grid-item:first-child',
              elements: {
                mainElement: {
                  selector: '.',
                  locateStrategy: 'xpath',
                },
                firstCardUnpinBtn: '.test--item-unpin-button',
                firstCardRank: '.officer-rank',
                firstCardName: '.officer-name',
                firstCardCRsCount: '.test--officer-cr-count',
                undoButton: '.undo-button',
                undoCard: {
                  selector: '//div[starts-with(@class, "with-undo-card")]',
                  locateStrategy: 'xpath',
                },
              },
            },
            secondCard: {
              selector: '.pinned-grid-item:nth-child(2)',
              elements: {
                officerName: '.officer-name',
              },
            },
          },
        },
        crs: {
          selector: '.test--CR-section',
          elements: {
            title: '.type-title',
          },
          sections: {
            card: {
              selector: '.test--CR-section .pinned-grid-item',
            },
            firstCard: {
              selector: '.pinned-grid-item:first-child',
              elements: {
                mainElement: {
                  selector: '.',
                  locateStrategy: 'xpath',
                },
                firstCardUnpinBtn: '.test--item-unpin-button',
                firstCardDate: '.location-card-date',
                firstCardCategory: '.location-card-category',
                undoButton: '.undo-button',
                undoCard: {
                  selector: '//div[starts-with(@class, "with-undo-card")]',
                  locateStrategy: 'xpath',
                },
              },
            },
            secondCard: {
              selector: '.pinned-grid-item:nth-child(2)',
              elements: {
                category: '.location-card-category',
              },
            },
            lastCardCategory: {
              selector: '.test--CR-section .pinned-grid-item:last-child .location-card-category',
            },
          },
        },
        trrs: {
          selector: '.test--TRR-section',
          elements: {
            title: '.type-title',
          },
          sections: {
            card: {
              selector: '.test--TRR-section .pinned-grid-item',
            },
            firstCard: {
              selector: '.pinned-grid-item:first-child',
              elements: {
                mainElement: {
                  selector: '.',
                  locateStrategy: 'xpath',
                },
                firstCardUnpinBtn: '.test--item-unpin-button',
                firstCardDate: '.location-card-date',
                firstCardCategory: '.location-card-category',
                undoButton: '.undo-button',
                undoCard: {
                  selector: '//div[starts-with(@class, "with-undo-card")]',
                  locateStrategy: 'xpath',
                },
              },
            },
          },
        },
      },
    },
    animatedSocialGraphSection: {
      locateStrategy: 'xpath',
      selector: '(//div[contains(@class, "visualization-item")])[1]',
      elements: {
        firstGraphNode: {
          locateStrategy: 'xpath',
          selector: '(//*[name()="circle" and contains(@class, "node")])[1]',
        },
      },
    },
    geographicSection: {
      locateStrategy: 'xpath',
      selector: '(//div[contains(@class, "visualization-item")])[2]',
    },
    graphNodes: {
      selector: '.node',
    },
    shownGraphNodes: {
      selector: '//*[name()="circle" and contains(@class, "node") and contains(@style, "opacity: 1")]',
      locateStrategy: 'xpath',
    },
    hiddenGraphNodes: {
      selector: '//*[name()="circle" and contains(@class, "node") and contains(@style, "opacity: 0.1")]',
      locateStrategy: 'xpath',
    },
    graphLinks: {
      selector: '.link',
    },
    shownGraphLinks: {
      selector: '//*[name()="line" and contains(@class, "link") and contains(@style, "opacity: 1")]',
      locateStrategy: 'xpath',
    },
    hiddenGraphLinks: {
      selector: '//*[name()="line" and contains(@class, "link") and contains(@style, "opacity: 0.1")]',
      locateStrategy: 'xpath',
    },
    relevantComplaints: baseRelevantComplaints('complaint'),
    relevantDocuments: baseRelevantComplaints('document'),
    relevantCoaccusals: {
      selector: '.relevant-coaccusals',
      elements: {
        title: '.relevant-infinite-carousel-title',
        carouselTip: '.relevant-infinite-carousel-tip',
      },
      sections: {
        coaccusalCard: {
          selector: '.relevant-coaccusals .swiper-slide > *:first-child',
          elements: {
            plusButton: {
              selector: '//div[contains(@class, "relevant-coaccusals")]//div[contains(@class, "plus-button")]',
              locateStrategy: 'xpath',
            },
            officerRank: '.officer-card-rank',
            officerName: '.officer-card-name',
            coaccusalCount: '.coaccusal-count',
            nameWrapper: '.officer-card-name-wrapper',
            undoText: '.undo-card-text',
            undoButton: '.undo-button',
            radarChart: {
              selector: '//*[name()="svg" and contains(@class, "radar-chart__radar-chart")]',
              locateStrategy: 'xpath',
            },
          },
        },
      },
    },
    pinboardsListSection: {
      selector: '//div[contains(@class, "pinboards__pinboards")]',
      locateStrategy: 'xpath',
      elements: {
        pinboardsTitle: '.pinboards-title',
        createNewPinboardButton: '.new-pinboard-btn',
        firstDuplicatePinboardButton: {
          selector: '(//a[contains(@class, "duplicate-pinboard-btn")])[1]',
          locateStrategy: 'xpath',
        },
        firstPinboardItemTitle: nthPinboardItemTitle(1),
        firstPinboardItemCreatedAt: nthPinboardItemCreatedAt(1),
        secondPinboardItemTitle: nthPinboardItemTitle(2),
        secondPinboardItemCreatedAt: nthPinboardItemCreatedAt(2),
        thirdPinboardItemTitle: nthPinboardItemTitle(3),
        thirdPinboardItemCreatedAt: nthPinboardItemCreatedAt(3),
        pinboardItems: '.pinboard-item',
      },
    },
  },
};
