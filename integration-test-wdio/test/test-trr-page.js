import trrPage from '../page-objects/trr-page';
import api from '../../integration-test/mock-api';
import { mockTRR } from '../mock-data/trr-page';
import { TIMEOUT } from '../constants';
import { mockCommonApi } from '../mock-data/utils';


describe('TRRPageTest', function () {
  beforeEach(function () {
    api.clean();
    mockCommonApi();
    api.onGet('/api/v2/mobile/trr/781/').reply(200, mockTRR);
    api
      .onPost('/api/v2/mobile/trr/781/request-document/', { email: 'valid@email.com' })
      .reply(200, { 'message': 'Thanks for subscribing.', 'trr_id': 781 });
    api
      .onPost('/api/v2/mobile/trr/781/request-document/', { email: 'invalid#email.com' })
      .reply(400, { 'message': 'Sorry, we can not subscribe your email' });
    trrPage.open(781);
  });

  it('should show proper header with TRR title force category', function () {
    trrPage.trrHeader.getText().should.equal('Other');
  });

  it('should go to officer page when clicking on the officer row', function () {
    trrPage.officerSection.officerRow.getText().should.containEql('Donovan Markiewicz');
    trrPage.officerSection.radarChart.getCSSProperty('background-color').value.should.equal('rgba(255,100,83,1)');
    trrPage.officerSection.officerRow.click();
    browser.waitForUrl(url => url.should.containEql('/officer/583/donovan-markiewicz/'), 3000);
  });

  it('should show request document modal when clicks on "Request Document"', function () {
    trrPage.requestDocumentForm.emailInput.waitForExist(3000, true);

    trrPage.trrInfoSection.requestDocumentButton.click();
    trrPage.requestDocumentForm.emailInput.waitForExist(3000);

    trrPage.requestDocumentForm.cancelButton.click();
    trrPage.requestDocumentForm.emailInput.waitForExist(3000, true);
  });

  it('should accept valid email, and close modal after 1.5s', function () {
    trrPage.trrInfoSection.requestDocumentButton.getText().should.equal('Request Documents');
    trrPage.trrInfoSection.requestDocumentButton.click();
    trrPage.requestDocumentForm.emailInput.waitForExist();

    trrPage.requestDocumentForm.emailInput.setValue('valid@email.com');
    trrPage.requestDocumentForm.requestButton.click();
    trrPage.requestDocumentForm.messageBox.waitForDisplayed(TIMEOUT);
    trrPage.requestDocumentForm.messageBox.getText().should.equal('Thanks for subscribing.');

    browser.pause(2000);
    trrPage.requestDocumentForm.emailInput.waitForExist(500, true);
    trrPage.trrInfoSection.requestDocumentButton.getText().should.equal('Documents Requested✔');
  });

  it('should ignore invalid email', function () {
    trrPage.trrInfoSection.requestDocumentButton.click();
    trrPage.requestDocumentForm.emailInput.waitForExist();

    trrPage.requestDocumentForm.emailInput.setValue('invalid#email.com');
    trrPage.requestDocumentForm.requestButton.click();
    trrPage.requestDocumentForm.messageBox.waitForDisplayed(TIMEOUT);
    trrPage.requestDocumentForm.messageBox.getText().should.equal('Sorry, we can not subscribe your email');
  });

  it('should have clicky installed ', function () {
    trrPage.clickyScript.waitForExist();
    trrPage.clickySiteIdsScript.waitForExist();
    trrPage.clickyNoJavascriptGIF.waitForExist();
  });
});
