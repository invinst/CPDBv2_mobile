import Page from './page';
import Section from './sections/section';
import PinboardsMenuSection from './sections/pinboards-menu';


const nthPoliceWitnessRadarChart = index => `//a[contains(@class, "police-witness-row")][${index}]//*[name()="svg"]`;

class ComplaintCategorySection extends Section {
  constructor() {
    super('', '//div[contains(@class, "complaint-category")]');

    this.prepareElementGetters({
      category: '//p[@class="category"]',
      subcategory: '//p[@class="subcategory"]',
    });
  }
}

class CoaccusalsSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "accused-officers")]');

    this.prepareElementGetters({
      header: '//h2[@class="header"]',
      showAll: '//div[@class="show-all"]',
      paddingBottom: '//div[@class="padding-bottom"]',
      firstRadarChart: '(//*[name()="svg" and contains(@class, "radar-chart__radar-chart")])[1]',
    });
  }
}

class FirstCoaccusalSection extends Section {
  constructor() {
    super('', '(//a[contains(@class, "coaccused-card")])[1]');

    this.prepareElementGetters({
      rank: '//div[@class="officer-rank"]',
      name: '//div[@class="officer-name"]',
      category: '//div[@class="category"]',
      findingOutcome: '//div[@class="finding-outcome"]',
      pinButton: '//div[contains(@class, "item-pin-button__item-pin-button")]',
    });
  }
}

class PoliceWitnessesSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "police-witness__police-witness")]');

    this.prepareElementGetters({
      firstRadarChart: nthPoliceWitnessRadarChart(1),
      secondRadarChart: nthPoliceWitnessRadarChart(2),
      thirdRadarChart: nthPoliceWitnessRadarChart(3),
      forthRadarChart: nthPoliceWitnessRadarChart(4),
      fifthRadarChart: nthPoliceWitnessRadarChart(5),
    });
  }
}

class LocationSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "location__location")]');

    this.prepareElementGetters({
        address: '//div[contains(@class, "address")]',
        type: '//div[contains(@class, "type")]',
        beat: '//div[contains(@class, "beat")]',
    });
  }
}

class ComplaintPage extends Page {
  complaintCategory = new ComplaintCategorySection();
  coaccusals = new CoaccusalsSection();
  firstCoaccusal = new FirstCoaccusalSection();
  policeWitnesses = new PoliceWitnessesSection();
  location = new LocationSection();
  pinboardsMenu = new PinboardsMenuSection();

  constructor() {
    super();
    this.prepareElementGetters({
      body: 'body',
      pinButton: '//div[contains(@class, "with-header__header")]//div[contains(@class, "item-pin-button")]',
      addToPinboardButton: '//div[contains(@class, "right-buttons")]//div',
      victims: '.victim-list',
      complainants: '.complainant-list',
      summary: '//div[contains(@class, "summary")]//div[contains(@class, "content")]',
      investigatorTimeline: '//div[contains(@class, "investigation-timeline")]//*[contains(@class, "svg")]',
      firstInvestigator: '(//*[contains(@class, "investigator-row")])[1]',
      secondInvestigator: '(//*[contains(@class, "investigator-row")])[2]',
      lastToast: '(//div[contains(@class, "Toastify__toast-body")])[last()]',
      landingPageBreadCrumb: '//a[@href="/" and .="cpdp"]',
      incidentDate: '.incident-date-value',
    });
  }

  open(crid) {
    super.open(`/complaint/${crid}/`);
  }
}

module.exports = new ComplaintPage();
