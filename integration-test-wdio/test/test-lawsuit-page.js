'use strict';

require('should');

import api from '../../integration-test/mock-api';
import { mockCommonApi } from '../mock-data/utils';
import landingPage from '../page-objects/landing-page';
import searchPage from '../page-objects/search-page';
import lawsuitPage from '../page-objects/lawsuit-page';
import { lawsuitData } from '../mock-data/lawsuit-page/common';
import { officer2235 as officerData } from '../mock-data/officer-page';
import { TIMEOUT } from '../constants';

describe('Lawsuit page', function () {
  beforeEach(function () {
    api.clean();
    mockCommonApi();
    api.onGet('/api/v2/lawsuit/00-L-5230/').reply(200, lawsuitData);
  });

  context('lawsuit info', function () {
    beforeEach(function () {
      lawsuitPage.open();
      lawsuitPage.title.waitForDisplayed();
    });

    it('should display lawsuit content', function () {
      lawsuitPage.title.getText().should.equal('CASE 00-L-5230');
      lawsuitPage.primaryCause.getText().should.equal('EXCESSIVE FORCE/MINOR');
      lawsuitPage.totalPaymentsValue.getText().should.equal('$2.5B');

      lawsuitPage.summary.content.getText().should.match(
        /Pearce was detained and taken into police custody while he was in the Clearing neighborhood.*/
      );

      lawsuitPage.payment.totalsRowValue.getText().should.equal('$2,500,007,500.00');
      lawsuitPage.payment.subtotalsSettlements.getText().should.equal('$7,500.00');
      lawsuitPage.payment.subtotalsLegalFees.getText().should.equal('$2,500,000,000.00');

      lawsuitPage.caseBreakdown.interaction.getText().should.equal('Protest');
      lawsuitPage.caseBreakdown.service.getText().should.equal('On Duty');
      lawsuitPage.caseBreakdown.misconduct.getText().should.equal('Excessive force, Racial epithets');
      lawsuitPage.caseBreakdown.violence.getText().should.equal('Physical Force');
      lawsuitPage.caseBreakdown.outcome.getText().should.equal('Killed by officer');

      lawsuitPage.caseDetails.plaintiffs.getText().should.equal('Sharon Ambielli, Kevin Vodak');
      lawsuitPage.caseDetails.incidentDate.getText().should.equal('2015-10-28');
      lawsuitPage.caseDetails.location.getText().should.equal('near intersection of N Wavelandand Sheffield');
      lawsuitPage.caseDetails.address.getText().should.equal('200 E. Chicago Ave., Chicago IL');

      lawsuitPage.involvedOfficers.card.count.should.equal(20);
      lawsuitPage.involvedOfficers.firstCard.rank.getText().should.equal('Detective');
      lawsuitPage.involvedOfficers.firstCard.name.getText().should.equal('Joseph Nega');
      lawsuitPage.involvedOfficers.firstCard.metric.getText().should.equal('12 allegations 0 sustained');
      lawsuitPage.involvedOfficers.firstCard.percentile.getText().should.equal('More than 59% of other officers');
      lawsuitPage.involvedOfficers.firstCard.demographic.getText().should.equal('53-year-old White male');
      lawsuitPage.involvedOfficers.firstCard.totalPayments.getText().should.equal('$7.5B');
      lawsuitPage.involvedOfficers.firstCard.totalLawsuits.getText().should.equal('in 3 lawsuits');
    });

    it('should show full list of accused officers when click on show more button', function () {
      lawsuitPage.involvedOfficers.showMoreButton.isDisplayed().should.be.true();
      lawsuitPage.involvedOfficers.showMoreButton.click();
      lawsuitPage.involvedOfficers.showMoreButton.isDisplayed().should.be.false();
    });

    it('should show full summary when click on show more button', function () {
      lawsuitPage.summary.showMoreButton.isDisplayed().should.be.true();
      lawsuitPage.summary.showMoreButton.click();
      lawsuitPage.summary.showMoreButton.isDisplayed().should.be.false();
    });

    it('should render correct radar color of accused officers', function () {
      lawsuitPage.involvedOfficers.firstRadarChart
        .getCSSProperty('background-color').value.should.eql('rgba(255,100,83,1)');
    });

    it('should navigate to officer page when we click on involved officer card', function () {
      api.onGet('/api/v2/officers/1/summary/').reply(200, officerData);

      lawsuitPage.involvedOfficers.firstCard.mainElement.click();
      browser.getUrl().should.match(/\/officer\/1\/joseph-nega\/$/);
    });

    it('should navigate to payment section when we click on total payments', function () {
      browser.setWindowRect(0, 0, 1200, 300);
      lawsuitPage.payment.breakdownTable.isDisplayedInViewport().should.be.false();
      lawsuitPage.totalPaymentSummary.click();
      lawsuitPage.payment.breakdownTable.waitForDisplayedInViewport(5000);
    });

    describe('Pinboard function', function () {
      it('should display toast when pinning a officer card', function () {
        lawsuitPage.involvedOfficers.firstCard.pinButton.click();
        lawsuitPage.lastToast.waitForDisplayed();
        lawsuitPage.lastToast.getText(
          'Joseph Nega added to pinboard\nGo to pinboard'
        );

        lawsuitPage.landingPageBreadCrumb.click();
        landingPage.searchLink.waitForDisplayed();
        landingPage.searchLink.click();
        searchPage.pinboardBar.waitForDisplayed();
        searchPage.pinboardBar.getText('Pinboard (1)');
        browser.back();
        browser.back();

        lawsuitPage.involvedOfficers.firstCard.pinButton.click();
        lawsuitPage.lastToast.waitForDisplayed();
        lawsuitPage.lastToast.getText(
          'Joseph Nega removed from pinboard\nGo to pinboard'
        );

        lawsuitPage.landingPageBreadCrumb.click();
        landingPage.searchLink.waitForDisplayed();
        landingPage.searchLink.click();
        searchPage.pinboardBar.waitForDisplayed(TIMEOUT, true);
      });
    });
  });
});
