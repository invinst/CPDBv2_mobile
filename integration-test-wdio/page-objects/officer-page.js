'use strict';

import { each } from 'lodash';

import Page from './page';
import Section from './sections/section';
import PinboardsMenuSection from './sections/pinboards-menu';


const nthBreadcrumb = n => `//*[contains(@class, "breadcrumb-item")][${n}]`;

const paneSelector = (rowId, colId) => (
  `(//div[contains(@class, "metric-widget-item")][${colId}])[${rowId}]`
);

const metricPaneValueSelector = (rowId, colId) => (
  `${paneSelector(rowId, colId)}//div[contains(@class, "value")]`
);

const metricPaneNameSelector = (rowId, colId) => (
  `${paneSelector(rowId, colId)}//div[contains(@class, "name")]`
);

const metricPaneDescriptionSelector = (rowId, colId) => (
  `${paneSelector(rowId, colId)}//div[contains(@class, "description")]`
);

class BreadcrumbsSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "breadcrumb__breadcrumb")]');

    this.prepareElementGetters({
      firstBreadcrumb: nthBreadcrumb(1),
      secondBreadcrumb: nthBreadcrumb(2),
      thirdBreadcrumb: nthBreadcrumb(3),
    });
  }
}

class RadarChartSection extends Section {
  constructor() {
    super('', '//*[name()="svg" and contains(@class, "radar-chart")]');

    this.prepareElementGetters({
      radarAxis: '//*[name()="text" and contains(@class, "radar-axis")]',
      radarArea: '//*[name()="path" and contains(@class, "radar-area")]',
      radarGrid: '//*[@class="test--radar-grid-wrapper"]',
    });
  }
}

class AnimatedRadarChartSection extends Section {
  radarChart = new RadarChartSection();

  constructor() {
    super('', '//div[contains(@class, "animated-radar-chart")]');

    this.prepareElementGetters({
      radarChartContainer: '//div[contains(@class, "radar-chart-container")]',
      noDataText: '//div[contains(@class, "no-data-text")]',
    });
  }
}

class SummarySection extends Section {
  constructor() {
    super('', '//div[@class="officer-summary-body"]');

    const fields = ['badge', 'rank', 'unit', 'career'];

    const elementGetters = {
      demographic: '//div[@class="officer-demographic"]',
    };
    each(fields, (field, index) => {
      elementGetters[`${field}Label`] = `//div[contains(@class, "section-row")][${index + 1}]//div[@class="label"]`;
      elementGetters[`${field}Value`] = `//div[contains(@class, "section-row")][${index + 1}]//div[@class="value"]`;
    });

    this.prepareElementGetters(elementGetters);
  }
}

class MetricsSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      allegationCount: metricPaneValueSelector(1, 1),
      allegationName: metricPaneNameSelector(1, 1),
      allegationDescription: metricPaneDescriptionSelector(1, 1),

      sustainedCount: metricPaneValueSelector(1, 2),
      sustainedName: metricPaneNameSelector(1, 2),
      sustainedDescription: metricPaneDescriptionSelector(1, 2),

      trrCount: metricPaneValueSelector(2, 1),
      trrName: metricPaneNameSelector(2, 1),
      trrDescription: metricPaneDescriptionSelector(2, 1),

      complimentCount: metricPaneValueSelector(2, 2),
      complimentName: metricPaneNameSelector(2, 2),

      awardCount: metricPaneValueSelector(3, 1),
      awardName: metricPaneNameSelector(3, 1),

      honorableMentionCount: metricPaneValueSelector(3, 2),
      honorableMentionName: metricPaneNameSelector(3, 2),
      honorableMentionDescription: metricPaneDescriptionSelector(3, 2),
    });
  }
}

class CoaccusalsSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "test--officer-coaccusals")]');

    const firstCoaccusalCardSelector = '//a[contains(@class, "officer-card")]';
    this.prepareElementGetters({
      firstCoaccusalCard: firstCoaccusalCardSelector,
      firstPinButton: `${firstCoaccusalCardSelector}//div[contains(@class, "item-pin-button__item-pin-button")]`,
      firstRadarChart: `${firstCoaccusalCardSelector}//*[name()="svg" and contains(@class, "radar")]`,
    });
  }
}

class AttachmentsSections extends Section {
  constructor() {
    super('', '//div[contains(@class, "attachments-tab__officer-attachments-tab")]');

    this.prepareElementGetters({
      firstComplaintAttachment: '//div[contains(@class, "complaint__officer-attachments-tab-complaint")]' +
        ' //a[contains(@class, "attachment__officer-attachments-tab-complaint-attachment")]',
      firstComplaintHeading: ' //div[contains(@class, "complaint__officer-attachments-tab-complaint")]' +
        ' //a[contains(@class, "heading__officer-attachments-tab-complaint-heading")]',
      firstLawsuitAttachment: ' //*[contains(@class, "lawsuit__lawsuit")]' +
        ' //*[contains(@class, "attachment__officer-attachments-tab-complaint-attachment")]',
      firstLawsuitHeading: ' //*[contains(@class, "lawsuit__lawsuit")]' +
        ' //*[contains(@class, "heading__heading")]',
    });
  }
}

class Filter extends Section {
  constructor() {
    super('', '//div[contains(@class, "timeline-filter")]');

    this.prepareElementGetters({
      selectedFilter: '//span[@class="dropdown-button-text"]',
      button: '//div[@class="dropdown-button"]',
      menu: '//div[contains(@class, "dropdown-menu")]',
      crs: '(//div[@class="dropdown-menu-item"])[1]',
      sustained: '(//div[@class="dropdown-menu-item"])[2]',
      force: '(//div[@class="dropdown-menu-item"])[3]',
      awards: '(//div[@class="dropdown-menu-item"])[4]',
      lawsuits: '(//div[@class="dropdown-menu-item"])[5]',
      changes: '(//div[@class="dropdown-menu-item"])[6]',
    });
  }
}

class UnitChangeSection extends Section {
  filter = new Filter();

  constructor(index) {
    super('', `//span[contains(@class, "unit-change__wrapper")][${index}]`);

    this.prepareElementGetters({
      unitChange: '//span[@class="unit-change content"]',
      date: '//span[@class="date content"]',
    });
  }
}

class RankChangeSection extends Section {
  filter = new Filter();

  constructor(index) {
    super('', `//span[contains(@class, "rank-change__wrapper")][${index}]`);

    this.prepareElementGetters({
      rankChange: '//span[@class="rank-change content"]',
      date: '//span[@class="date content"]',
    });
  }
}

class TimelineSection extends Section {
  filter = new Filter();
  firstUnitChangeItem = new UnitChangeSection(1);
  secondUnitChangeItem = new UnitChangeSection(2);
  firstRankChangeItem = new RankChangeSection(1);
  secondRankChangeItem = new RankChangeSection(2);

  constructor() {
    super('', '//div[contains(@class, "timeline__officer-timeline")]');

    this.prepareElementGetters({
      crItem: '//a[contains(@class, "cr__wrapper") and contains(@class, "normal-item")]',
      trrItem: '//a[contains(@class, "trr__wrapper") and contains(@class, "normal-item")]',
      awardItem: '//div[contains(@class, "award__wrapper") and contains(@class, "normal-item")]',
      lawsuitItem: ' //a[contains(@class, "lawsuit__lawsuit")]',
      joinedItem: '//span[contains(@class, "joined__wrapper") and contains(@class, "joined-item")]',
      yearItem: '//div[contains(@class, "year__wrapper") and contains(@class, "normal-item")]',
      unitChangeItem: '//span[contains(@class, "unit-change__wrapper") and contains(@class, "change-item")]',
      rankChangeItem: '//span[contains(@class, "rank-change__wrapper") and contains(@class, "change-item")]',
      lawsuitAttachmentThumbnail: ' //*[contains(@class, "lawsuit-item-content")] //div[contains(@class, "image")]',
      complaintAttachmentThumbnail: '//a[contains(@class, "cr__wrapper")] //div[contains(@class, "image")]',
      moreComplaintAttachment: '//div[@class, "cr-item-content"] //div[@class, "more-attachment"]',
      crItems: '//a[contains(@class, "cr__wrapper") and contains(@class, "normal-item")]',
    });
  }
}

class RadarChartContainerSection extends Section {
  constructor() {
    super('', '//div[@class="explainer-radar-chart-container"]');

    this.prepareElementGetters({
      radarChart: '//*[name()="svg" and contains(@class, "radar-chart")]',
      closeButton: '//div[@class="explainer-close-button"]',
    });
  }
}

class TableHeaderSection extends Section {
  constructor() {
    super('', '//div[@class="table-header"]');

    this.prepareElementGetters({
      internalComplaintHeader: '(//div[@class="header-cell"])[1]',
      civilianComplaintHeader: '(//div[@class="header-cell"])[2]',
      useOfForceHeader: '(//div[@class="header-cell"])[3]',
    });
  }
}

class NthPercentileRow extends Section {
  constructor(index) {
    super('', `//li[@class="percentiles-row"][${index}]`);

    this.prepareElementGetters({
      radarChart: '//*[name()="svg"]',
      year: '//div[@class="year"]',
      internalComplaint: '(//div[@class="cell"])[1]',
      civilianComplaint: '(//div[@class="cell"])[2]',
      useOfForce: '(//div[@class="cell"])[3]',
    });
  }
}

class PercentileContentSection extends Section {
  tableHeader = new TableHeaderSection();
  firstPercentileRow = new NthPercentileRow(1);
  secondPercentileRow = new NthPercentileRow(2);
  thirdPercentileRow = new NthPercentileRow(3);

  constructor() {
    super('', '//div[contains(@class, "percentile-explainer")]');
  }
}

class ExplainerSection extends Section {
  radarChartContainer = new RadarChartContainerSection();

  constructor() {
    super('', '//div[contains(@class, "explainer-layout")]');

    this.prepareElementGetters({
      leftNav: '//span[@class="left-nav"]',
      rightNav: '//span[@class="right-nav"]',
    });
  }
}

class DescriptionContentSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "description-content")]');

    this.prepareElementGetters({
      content: '//div[@class="content"]',
      subContent: '//div[@class="sub-content"]',
    });
  }
}

class DescriptionExplainerContentSection extends Section {
  descriptionContent = new DescriptionContentSection();

  constructor() {
    super('', '//div[@class="explainer-content"]');

    this.prepareElementGetters({
      title: '//h5[@class="title"]',
    });
  }
}

class DescriptionExplainerSection extends ExplainerSection {
  explainerContent = new DescriptionExplainerContentSection();
}

class PercentileExplainerContentSection extends Section {
  percentileContent = new PercentileContentSection();

  constructor() {
    super('', '//div[@class="explainer-content"]');

    this.prepareElementGetters({
      title: '//h5[@class="title"]',
    });
  }
}

class PercentileExplainerSection extends ExplainerSection {
  explainerContent = new PercentileExplainerContentSection();
}

class OfficerPage extends Page {
  breadcrumbs = new BreadcrumbsSection();
  animatedRadarChart = new AnimatedRadarChartSection();
  pinboardsMenu = new PinboardsMenuSection();
  summary = new SummarySection();
  metrics = new MetricsSection();
  coaccusals = new CoaccusalsSection();
  attachments = new AttachmentsSections();
  timeline = new TimelineSection();
  triangleExplainer = new DescriptionExplainerSection();
  scaleExplainer = new DescriptionExplainerSection();
  percentileExplainer = new PercentileExplainerSection();

  constructor() {
    super();

    this.prepareElementGetters({
      body: 'body',
      officerName: '.officer-name',
      pinButton: '//div[contains(@class, "with-header__header")]//div[contains(@class, "item-pin-button")]',
      addToPinboardButton: '//div[contains(@class, "right-buttons")]//div',
      timelineTabButton: '(//span[contains(@class, "tabbed-pane-tab-name")])[1]',
      mapTabButton: '(//span[contains(@class, "tabbed-pane-tab-name")])[2]',
      coaccusalsTabButton: '(//span[contains(@class, "tabbed-pane-tab-name")])[3]',
      attachmentsTabButton: '(//span[contains(@class, "tabbed-pane-tab-name")])[4]',
      lastToast: '(//div[contains(@class, "Toastify__toast-body")])[last()]',
      landingPageBreadCrumb: '//a[@href="/" and .="cpdp"]',
      searchBreadcrumb: nthBreadcrumb(2),
      map: '//div[contains(@class, "test--map")]',
    });
  }

  open(id=1, tab) {
    const url = ['/officer', id, tab].filter(Boolean).join('/') + '/';
    super.open(url);
  }
}

module.exports = new OfficerPage();
