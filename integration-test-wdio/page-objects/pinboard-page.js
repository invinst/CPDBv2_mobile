import Page from './page';
import Section from './sections/section';


class PinnedCRs extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--CR-section")]';
    this.crCardSelector = `${sectionSelector}/div[contains(@class, "pinned-grid")]/div`;
    const firstCardSelector = `(${this.crCardSelector})[1]`;

    this.prepareElementGetters({
      cards: `${sectionSelector}/div[contains(@class, "pinned-grid")]/div`,
      firstCardCategory: `${firstCardSelector}//span[@class="location-card-category"]`,
    });
  }

  crCards() {
    return $$(this.crCardSelector);
  }
}

class PinnedOfficers extends Section {
  constructor() {
    super();

    const sectionSelector = '//div[contains(@class, "test--OFFICER-section")]';
    this.officerCardSelector = `${sectionSelector}/div[contains(@class, "pinned-grid")]/div`;
    const firstCardSelector = `(${this.officerCardSelector})[1]`;

    this.prepareElementGetters({
      cards: `${sectionSelector}/div[contains(@class, "pinned-grid")]/div`,
      firstCardName: `${firstCardSelector}//div[@class="officer-name"]`,
    });
  }

  officerCards() {
    return $$(this.officerCardSelector);
  }
}

class PinboardPinnedSection extends Section {
  crs = new PinnedCRs();
  officers = new PinnedOfficers();

  constructor() {
    super();
  }
}

class PinboardPage extends Page {
  pinnedSection = new PinboardPinnedSection();
}

module.exports = new PinboardPage();
