'use strict';

import Page from './page';
import Section from "./sections/section";


const radarChartSelector = (officerName) => (
  `//div[contains(@class, "officer-name") and text()="${officerName}"]/../..//*[name()="svg"]`
);

class BaseCarouselSection extends Section {
  constructor(mainElementSelector, cardSelector, cardNameSelector) {
    super('', mainElementSelector);

    this.prepareElementGetters({
      cards: cardSelector,
      firstCard: `${cardSelector}`,
      pinButton: `${ cardSelector }${ cardNameSelector }//div[contains(@class, "item-pin-button__item-pin-button")]`,
      firstRadarChart: `${ cardSelector }${radarChartSelector('Broderick Jones')}`,
      secondRadarChart: `${ cardSelector }${radarChartSelector('Corey Flagg')}`,
      thirdRadarChart: `${ cardSelector }${radarChartSelector('Charles Toussas')}`,
      forthRadarChart: `${ cardSelector }${radarChartSelector('Kevin Osborn')}`,
      fifthRadarChart: `${ cardSelector }${radarChartSelector('Joe Parker')}`,
    });
  }
}

class FooterSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "footer__footer")]');

    this.prepareElementGetters({
      legal: '//div[contains(@class, "legal-item")]',
      github: '//a[contains(@class, "item")]',
      logo: '//a[@class="invist-logo-link"]',
    });
  }
}

class LegalModalSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "legal-modal")]');

    this.prepareElementGetters({
      content: '//div[@class="legal-content"]',
      closeButton: '//div[@class="close-button-wrapper"]',
      understandButton: '//div[@class="confirm-button"]',
    });
  }
}

class PinboardButtonIntroductionSection extends Section {
  constructor() {
    super('', '//div[@class="pinboard-button-introduction"]');

    this.prepareElementGetters({
      introductionContent: '//div[@class="pinboard-button-introduction-content"]',
      closeButton: '//div[@class="pinboard-button-introduction-close-btn"]',
      tryItButton: '//a[@class="try-it-btn"]',
    });
  }
}

class LandingPage extends Page {
  footer = new FooterSection();
  legalModal = new LegalModalSection();
  pinboardButtonIntroduction = new PinboardButtonIntroductionSection();
  topOfficersByAllegation = new BaseCarouselSection(
    '//div[contains(@class, "carousel-wrapper__carousel-wrapper") ' +
      'and contains(.//a/@class, "base-officer-card__base-officer-card")][1]',
    '//a[contains(@class, "base-officer-card__base-officer-card")]',
    '[.//div[contains(@class, "officer-name") and text()="Broderick Jones"]]'
  );
  recentActivities = new BaseCarouselSection(
    '//div[contains(@class, "carousel-wrapper__carousel-wrapper") ' +
      'and contains(.//a/@class, "base-officer-card__base-officer-card")][2]',
    '//a[contains(@class, "base-officer-card__base-officer-card")]',
    '[.//div[contains(@class, "officer-name") and text()="Broderick Jones"]]'
  );
  newDocumentAllegations = new BaseCarouselSection(
    '//div[contains(@class, "carousel-wrapper__carousel-wrapper") ' +
      'and contains(.//a/@class, "complaint-document-card__complaint-document-card")]',
    '//a[contains(@class, "complaint-document-card__complaint-document-card")]',
    '[.//div[contains(@class, "complaint-info-category") and text()="Criminal Misconduct"]]'
  );
  complaintSummaries = new BaseCarouselSection(
    '//div[contains(@class, "carousel-wrapper__carousel-wrapper") ' +
      'and contains(.//a/@class, "complaint-summary-card__complaint-summary-card")]',
    '//a[contains(@class, "complaint-summary-card__complaint-summary-card")]',
    '[.//div[contains(@class, "incident-date") and text()="Nov 30, 2016"]]'
  );
  topLawsuits = new BaseCarouselSection(
    '//div[contains(@class, "carousel-wrapper__carousel-wrapper") ' +
      'and contains(.//a/@class, "top-lawsuit-card__top-lawsuit-card")]',
    '//a[contains(@class, "top-lawsuit-card__top-lawsuit-card")]',
    null
  );

  constructor() {
    super();
    this.prepareElementGetters({
      body: 'body',
      title: '.site-title',
      searchLink: 'a[href="/search/"]',
      pinboardButton: '//div[contains(@class, "header-links")]//div[contains(@class, "pinboard-button")]',
    });
  }

  open(customPath) {
    super.open(customPath || '/');
  }
}

module.exports = new LandingPage();
