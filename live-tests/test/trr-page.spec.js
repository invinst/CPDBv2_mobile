'use strict';

const api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');


const mockTRR = {
  id: 781,
  officer: {
    id: 583,
    'full_name': 'Donovan Markiewicz',
    gender: 'Male',
    race: 'White',
    'appointed_date': '2005-09-26',
    'birth_year': 1973,
    'resignation_date': '',
    unit: {
      'unit_name': '253',
      'description': 'Targeted Response Unit'
    },
  },
  'officer_in_uniform': false,
  'officer_assigned_beat': '4682E',
  'officer_on_duty': true,
  'subject_race': 'BLACK',
  'subject_gender': 'Male',
  'subject_age': 27,
  'force_category': 'Other',
  'force_types': ['Physical Force - Stunning', 'Verbal Commands', 'Member Presence'],
  'date_of_incident': '2004-04-23',
  'location_type': 'Street',
  address: '11XX 79Th St',
  beat: 612
};

describe('TRRPageTest', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/mobile/trr/781/', 200, mockTRR);
    api.mockPost(
      '/api/v2/mobile/trr/781/request-document/',
      200,
      { email: 'valid@email.com' },
      { 'message': 'Thanks for subscribing.', 'trr_id': 781 }
    );
    api.mockPost(
      '/api/v2/mobile/trr/781/request-document/',
      400,
      { email: 'invalid#email.com' },
      { 'message': 'Sorry, we can not subscribe your email' }
    );
    this.trrPage = client.page.trrPage();
    this.trrPage.navigate(this.trrPage.url(781));
    this.trrPage.expect.element('@body').to.be.present;
    done();
  });

  afterEach(function (client, done) {
    done();
  });

  it('should show proper header with TRR title force category', function () {
    this.trrPage.expect.element('@trrHeader').text.to.equal('Other');
  });

  it('should go to officer page when clicking on the officer row', function (client) {
    this.trrPage.section.officer.expect.element('@officerRow').text.to.contain('Donovan Markiewicz');
    this.trrPage.section.officer.click('@officerRow');
    client.assert.urlContains('/officer/583/donovan-markiewicz/');
  });

  it('should show request document modal when clicks on "Request Document"', function () {
    this.trrPage.expect.section('@requestDocumentForm').to.be.not.present;

    this.trrPage.section.info.click('@requestDocumentButton');
    this.trrPage.expect.section('@requestDocumentForm').to.be.present;

    this.trrPage.section.requestDocumentForm.click('@cancelButton');
    this.trrPage.expect.section('@requestDocumentForm').to.be.not.present;
  });

  it('should accept valid email, and close modal after 1.5s', function () {
    this.trrPage.section.info.expect.element('@requestDocumentButton').text.to.equal('Request Documents');
    this.trrPage.section.info.click('@requestDocumentButton');
    this.trrPage.expect.section('@requestDocumentForm').to.be.present;

    const requestDocumentForm = this.trrPage.section.requestDocumentForm;
    requestDocumentForm.setValue('@emailInput', 'valid@email.com');
    requestDocumentForm.click('@requestButton');
    requestDocumentForm.waitForElementVisible('@messageBox', TIMEOUT);
    requestDocumentForm.expect.element('@messageBox').text.to.equal('Thanks for subscribing.');

    this.trrPage.expect.section('@requestDocumentForm').to.be.not.present.after(2000);
    this.trrPage.section.info.expect.element('@requestDocumentButton').text.to.equal('Documents Requested✔');
  });

  it('should ignore invalid email', function () {
    this.trrPage.section.info.click('@requestDocumentButton');
    this.trrPage.expect.section('@requestDocumentForm').to.be.present;

    const requestDocumentForm = this.trrPage.section.requestDocumentForm;
    requestDocumentForm.setValue('@emailInput', 'invalid#email.com');
    requestDocumentForm.click('@requestButton');
    requestDocumentForm.waitForElementVisible('@messageBox', TIMEOUT);
    requestDocumentForm.expect.element('@messageBox').text.to.equal(
      'Sorry, we can not subscribe your email'
    );
  });
});
