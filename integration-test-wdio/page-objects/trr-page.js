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
  }
}

class TRRPage extends Page {
  officerSection = new OfficerSection();
  trrInfoSection = new TRRInfoSection();

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
