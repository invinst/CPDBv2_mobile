'use strict';

import Page from './page';
import Section from './sections/section';


class OfficerSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "trr-officer")]');

    this.prepareElementGetters({
      officerRow: '//a[@class="officer-row"]',
      radarChart: '//*[name()="svg" and contains(@class, "radar-chart__radar-chart")]',
    });
  }
}

class TRRInfoSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "trr-info")]');

    this.prepareElementGetters({
      requestDocumentButton: '//div[@class="request-button"]',
    });
  }
}

class RequestDocumentFormSection extends Section {
  constructor() {
    super('', '//*[contains(@class, "request-document-content")]');

    this.prepareElementGetters({
      emailInput: '//input[@class="email-input"]',
      requestButton: '//input[@class="request-button"]',
      cancelButton: '//a[@class="cancel-button"]',
      messageBox: '//div[@class="message-box"]',
    });
  }
}

class TRRPage extends Page {
  officerSection = new OfficerSection();
  trrInfoSection = new TRRInfoSection();
  requestDocumentForm = new RequestDocumentFormSection();

  constructor() {
    super();
    this.prepareElementGetters({
      trrHeader: '.trr-header',
    });
  }

  open(trrId) {
    super.open(`/trr/${trrId}/`);
  }
}

module.exports = new TRRPage();
