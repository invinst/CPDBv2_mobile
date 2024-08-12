import officerPage from '../page-objects/officer-page';
// import searchPage from '../page-objects/search-page';
// import landingPage from '../page-objects/landing-page';
// import pinboardPage from '../page-objects/pinboard-page';
import api from '../../integration-test/mock-api';
import { TIMEOUT } from '../constants';
const {
  pinboards,
  updatedPinboards,
  updateRequestParams,
  // createdPinboards,
  // createPinboardRequestParams,
  // createdPinboardsOfficersData,
} = require(__dirname + '/../../integration-test/mock-data/pinboard-page').pinboardsMenu;
import { officer2235, officer27778, officerNotEnoughPercentile, mockTimeline, mockCoaccusals, mockOfficerPageCms }
  from '../mock-data/officer-page';
import { mockCommonApi } from '../mock-data/utils';


function checkTimelineShowChangesOnly(timeline) {
  timeline.filter.selectedFilter.getText().should.containEql('Rank/Unit Changes');

  timeline.crItem.waitForExist(TIMEOUT, true);
  timeline.trrItem.waitForExist(TIMEOUT, true);
  timeline.awardItem.waitForExist(TIMEOUT, true);

  timeline.rankChangeItem.waitForDisplayed();
  timeline.unitChangeItem.waitForDisplayed();
  timeline.joinedItem.waitForDisplayed();
  timeline.yearItem.waitForDisplayed();
}

function checkTimelineShowAllItems(timeline) {
  timeline.filter.selectedFilter.getText().should.containEql('All');
  timeline.crItem.waitForDisplayed();
  timeline.trrItem.waitForDisplayed();
  timeline.awardItem.waitForDisplayed();

  timeline.rankChangeItem.waitForDisplayed();
  timeline.unitChangeItem.waitForDisplayed();
  timeline.joinedItem.waitForDisplayed();
  timeline.yearItem.waitForDisplayed();
}

describe('OfficerPage test', function () {
  beforeEach(function () {
    api.clean();
    mockCommonApi();
  });

  describe('OfficerPage not enough data for radar chart', function () {
    beforeEach(function () {
      api.onGet('/api/v2/cms-pages/officer-page/').reply(200, mockOfficerPageCms);
      api.onGet('/api/v2/mobile/officers/2234/').reply(200, officerNotEnoughPercentile);

      officerPage.open(2234);
      officerPage.body.waitForExist();
    });

    it('should render officer no data radar chart', function () {
      const radarChart = officerPage.animatedRadarChart;

      radarChart.noDataText.getText().should.equal(
        'There is not enough data to construct a radar graph for this officer.'
      );
    });
  });

  describe('OfficerPage has radar chart', function () {
    beforeEach(function () {
      api.onGet('/api/v2/cms-pages/officer-page/').reply(200, mockOfficerPageCms);
      api.onGet('/api/v2/mobile/officers/2235/').reply(200, officer2235);
      api.onGet('/api/v2/mobile/officers/2234/').reply(200, officerNotEnoughPercentile);
      api.onGet('/api/v2/mobile/officers/2235/new-timeline-items/').reply(200, mockTimeline);
      api.onGet('/api/v2/mobile/officers/2235/coaccusals/').reply(200, mockCoaccusals);

      api.onGet('/api/v2/mobile/officers/27778/').reply(200, officer27778);
      api.onGet('/api/v2/mobile/officers/27778/new-timeline-items/').reply(200, mockTimeline);
      api.onGet('/api/v2/mobile/officers/27778/coaccusals/').reply(200, mockCoaccusals);

      officerPage.open(2235);
      officerPage.body.waitForExist();
    });

    it('should redirect to correct path name when only officer id is provided', function () {
      browser.getUrl().should.containEql('/officer/2235/kevin-osborn/');
    });

    it('should redirect to correct path name when the officer name is incorrect', function () {
      officerPage.open(2235, 'somethingwrong')
      officerPage.body.waitForExist();
      browser.getUrl().should.containEql('/officer/2235/kevin-osborn/');
    });

    it('should render officer radar chart', function () {
      const animatedRadarChart = officerPage.animatedRadarChart;
      const radarChart = animatedRadarChart.radarChart;

      animatedRadarChart.radarChartContainer.isExisting().should.be.true();
      animatedRadarChart.radarChart.mainElement.getCSSProperty('background-color')
        .value.should.equal('rgba(244,162,152,1)');

      radarChart.radarArea.waitForExist();
      radarChart.radarAxis.waitForExist();
      radarChart.radarGrid.waitForExist();
    });

    it('should render officer summary correctly', function () {
      officerPage.officerName.getText().should.equal('Kevin Osborn');

      const summary = officerPage.summary;

      summary.demographic.getText().should.equal('60 years old, white, male.');

      summary.badgeLabel.getText().should.equal('Badge');
      summary.badgeValue.getText().should.equal('8548, 8547, 8546');

      summary.rankLabel.getText().should.equal('Rank');
      summary.rankValue.getText().should.containEql('Police Officer');

      summary.unitLabel.getText().should.equal('Unit');
      summary.unitValue.getText().should.containEql('Unit 005 - District 005');

      summary.careerLabel.getText().should.equal('Career');
      summary.careerValue.getText().should.containEql('DEC 13, 1993 — JAN 15, 2017');
    });

    it('should render officer metrics correctly', function () {
      const metrics = officerPage.metrics;

      metrics.allegationCount.getText().should.equal('104');
      metrics.allegationName.getText().should.equal('Allegations');
      metrics.allegationDescription.getText().should.equal('More than 99.8% of other officers');

      metrics.sustainedCount.getText().should.equal('1');
      metrics.sustainedName.getText().should.equal('Sustained');
      metrics.sustainedDescription.getText().should.equal('1 Disciplined');

      metrics.trrCount.getText().should.equal('1');
      metrics.trrName.getText().should.equal('Use of Force Report');
      metrics.trrDescription.getText().should.equal('More than 0% of other officers');

      metrics.totalLawsuitSettlements.getText().should.equal('$10.0M');
      metrics.lawsuitSettlementsName.getText().should.equal('Total Lawsuit Settlements');

      metrics.awardCount.getText().should.equal('1');
      metrics.awardName.getText().should.equal('Major Award');

      metrics.honorableMentionCount.getText().should.equal('55');
      metrics.honorableMentionName.getText().should.equal('Honorable Mentions');
      metrics.honorableMentionDescription.getText().should.equal('More than 85% of other officers');
    });

    it('should open explainer when clicking on radar chart', function () {
      const animatedRadarChart = officerPage.animatedRadarChart;

      animatedRadarChart.mainElement.isExisting().should.be.true();
      animatedRadarChart.radarChart.mainElement.isExisting().should.be.true();
      animatedRadarChart.radarChartContainer.isExisting().should.be.true();

      animatedRadarChart.radarChartContainer.click();

      officerPage.triangleExplainer.mainElement.isExisting().should.be.true();
    });

    context('Radar chart explainer is opened', function () {
      beforeEach(function () {
        const animatedRadarChart = officerPage.animatedRadarChart;
        animatedRadarChart.mainElement.isExisting().should.be.true();
        animatedRadarChart.radarChart.mainElement.isExisting().should.be.true();
        animatedRadarChart.radarChartContainer.isExisting().should.be.true();

        animatedRadarChart.radarChartContainer.click();

        const triangleExplainer = officerPage.triangleExplainer;
        const radarChartContainer = triangleExplainer.radarChartContainer;

        triangleExplainer.mainElement.isExisting().should.be.true();

        radarChartContainer.closeButton.waitForExist();
        radarChartContainer.radarChart.waitForExist();
        triangleExplainer.explainerContent.title.getText().should.equal('What is this triangle?');

      });

      it('should be closed when clicking on the close button', function () {
        const radarChartContainer = officerPage.triangleExplainer.radarChartContainer;

        radarChartContainer.closeButton.click();

        officerPage.triangleExplainer.mainElement.isExisting().should.be.false();
      });

      it('should navigate between explainers when clicking in rightNav', function () {
        const triangleExplainer = officerPage.triangleExplainer;

        triangleExplainer.rightNav.click();

        const scaleExplainer = officerPage.scaleExplainer;
        const scaleExplainerContent = scaleExplainer.explainerContent;
        scaleExplainerContent.title.getText().should.equal('What is the scale?');

        scaleExplainer.rightNav.click();

        const percentileExplainer = officerPage.percentileExplainer;
        const percentileExplainerContent = percentileExplainer.explainerContent;
        percentileExplainerContent.title.getText().should.equal('Cumulative Percentiles by Year');

        percentileExplainer.rightNav.click();

        const triangleExplainerContent = officerPage.triangleExplainer.explainerContent;
        triangleExplainerContent.title.getText().should.equal('What is this triangle?');
      });

      it('should navigate between explainers when clicking in leftNav', function () {
        const triangleExplainer = officerPage.triangleExplainer;

        triangleExplainer.leftNav.click();

        const percentileExplainer = officerPage.percentileExplainer;
        const percentileExplainerContent = percentileExplainer.explainerContent;
        percentileExplainerContent.title.getText().should.equal('Cumulative Percentiles by Year');

        percentileExplainer.leftNav.click();

        const scaleExplainer = officerPage.scaleExplainer;
        const scaleExplainerContent = scaleExplainer.explainerContent;
        scaleExplainerContent.title.getText().should.equal('What is the scale?');

        scaleExplainer.leftNav.click();

        const triangleExplainerContent = officerPage.triangleExplainer.explainerContent;
        triangleExplainerContent.title.getText().should.equal('What is this triangle?');
      });

      it('should show triangleExplainer content correctly', function () {
        const triangleExplainer = officerPage.triangleExplainer;

        triangleExplainer.leftNav.getText().should.equal('Percentiles by year');
        triangleExplainer.rightNav.getText().should.equal('What is the scale?');

        const descriptionContent = triangleExplainer.explainerContent.descriptionContent;

        descriptionContent.content.getText().should.equal(
          'The corners of the triangle show the percentile score for this officer in each of three types of data: ' +
          'complaints from civilians, complaints from other officers, and self-reported uses of force.'
        );
        descriptionContent.subContent.getText().should.equal(
          'If one corner of the black inner triangle is close to reaching the outer triangle, ' +
          'then this officer is named in a relatively high rate ' +
          'of incidents of that type compared with other officers.'
        );
      });

      it('should show scaleExplainer content correctly', function () {
        const triangleExplainer = officerPage.triangleExplainer;

        triangleExplainer.rightNav.click();

        const scaleExplainer = officerPage.scaleExplainer;

        scaleExplainer.leftNav.getText().should.equal('What is this triangle?');
        scaleExplainer.rightNav.getText().should.equal('Percentiles by year');

        const descriptionContent = scaleExplainer.explainerContent.descriptionContent;

        descriptionContent.content.getText().should.equal(
          'If an officer’s percentile rank for civilian complaints is 99% ' +
          'then this means that they were accused in more civilian complaints per year than 99% of other officers.'
        );
        descriptionContent.subContent.getText().should.equal(
          'Civilian and internal complaint percentiles are based on data that is only available since 2000, ' +
          'use of force data is only available since 2004. ' +
          'The overall allegation count percentiles displayed on the officer profile page ' +
          'are calculated using data that reaches back to 1988.'
        );
      });

      it('should show percentileExplainer content correctly', function () {
        const triangleExplainer = officerPage.triangleExplainer;

        triangleExplainer.leftNav.click();

        const percentileExplainer = officerPage.percentileExplainer;

        percentileExplainer.leftNav.getText().should.equal('What is the scale?');
        percentileExplainer.rightNav.getText().should.equal('What is this triangle?');

        const percentileContent = percentileExplainer.explainerContent.percentileContent;
        const tableHeader = percentileContent.tableHeader;

        percentileContent.tableHeader.mainElement.isExisting().should.be.true();
        tableHeader.internalComplaintHeader.getText().should.equal('Internal Complaints');
        tableHeader.civilianComplaintHeader.getText().should.equal('Civilian Complaints');
        tableHeader.useOfForceHeader.getText().should.equal('Use Of Force');

        const firstRow = percentileContent.firstPercentileRow;
        const secondRow = percentileContent.secondPercentileRow;
        const thirdRow = percentileContent.thirdPercentileRow;

        firstRow.radarChart.waitForExist();
        firstRow.year.getText().should.equal('2007');
        firstRow.internalComplaint.getText().should.equal('75');
        firstRow.civilianComplaint.getText().should.equal('0');
        firstRow.useOfForce.getText().should.equal('0');

        secondRow.year.getText().should.equal('2006');
        secondRow.radarChart.waitForExist();
        secondRow.internalComplaint.getText().should.equal('0');
        secondRow.civilianComplaint.getText().should.equal('66');
        secondRow.useOfForce.getText().should.equal('44');

        thirdRow.year.getText().should.equal('2005');
        thirdRow.radarChart.getCSSProperty('background-color')
          .value.should.equal('rgba(118,118,118,1)');
        thirdRow.internalComplaint.getText().should.equal('0');
        thirdRow.civilianComplaint.getText().should.equal('66');
        thirdRow.useOfForce.getText().should.equal('NaN');
      });
    });

    describe('Timeline', function () {
      beforeEach(function () {
        this.timeline = officerPage.timeline;
      });

      it('should render rank change and unit change', function () {
        const firstUnitChange = this.timeline.firstUnitChangeItem;
        const secondUnitChange = this.timeline.secondUnitChangeItem;
        const firstRankChange = this.timeline.firstRankChangeItem;
        const secondRankChange = this.timeline.secondRankChangeItem;
        firstUnitChange.unitChange.getText().should.equal('Unit 153 → Unit 007 - District 007');
        firstUnitChange.date.getText().should.equal('JAN 7');
        secondUnitChange.unitChange.getText().should.equal('Unit 044 → Unit 153 - Mobile Strike Force');
        secondUnitChange.date.getText().should.equal('APR 28');

        firstRankChange.rankChange.getText().should.equal('Police Officer → Detective');
        firstRankChange.date.getText().should.equal('FEB 28');
        secondRankChange.rankChange.getText().should.equal('Detective → Police Officer');
        secondRankChange.date.getText().should.equal('APR 28');
      });

      it('should go to cr page when clicking on an cr timeline item', function () {
        this.timeline.crItem.waitForDisplayed(TIMEOUT);
        this.timeline.crItem.click();
        browser.getUrl().should.containEql('/complaint/294088/');
      });

      it('should go to lawsuit page when clicking on an lawsuit timeline item', function () {
        this.timeline.lawsuitItem.waitForDisplayed(TIMEOUT);
        this.timeline.lawsuitItem.click();
        browser.getUrl().should.containEql('/lawsuit/00-L-5230/');
      });

      it('should go to trr page when clicking on an trr timeline item', function () {
        this.timeline.crItem.waitForDisplayed(TIMEOUT);
        this.timeline.trrItem.click();
        browser.getUrl().should.containEql('/trr/1/');
      });

      describe('Timeline filter', function () {
        beforeEach(function () {
          this.timeline.filter.button.waitForDisplayed();
          this.timeline.filter.button.click();
        });

        it('should filter all events by by default', function () {
          checkTimelineShowAllItems(this.timeline);
        });

        it('should filter complaints', function () {
          this.timeline.filter.crs.click();

          this.timeline.crItem.waitForDisplayed();
          this.timeline.crItems.count.should.equal(2);

          this.timeline.trrItem.waitForExist(TIMEOUT, true);
          this.timeline.awardItem.waitForExist(TIMEOUT, true);
          this.timeline.lawsuitItem.waitForExist(TIMEOUT, true);

          this.timeline.rankChangeItem.waitForDisplayed();
          this.timeline.unitChangeItem.waitForDisplayed();
          this.timeline.joinedItem.waitForDisplayed();
          this.timeline.yearItem.waitForDisplayed();
        });

        it('should filter sustained', function () {
          this.timeline.filter.sustained.click();

          this.timeline.crItem.waitForDisplayed();
          this.timeline.crItems.count.should.equal(1);

          this.timeline.trrItem.waitForExist(TIMEOUT, true);
          this.timeline.awardItem.waitForExist(TIMEOUT, true);
          this.timeline.lawsuitItem.waitForExist(TIMEOUT, true);

          this.timeline.rankChangeItem.waitForDisplayed();
          this.timeline.unitChangeItem.waitForDisplayed();
          this.timeline.joinedItem.waitForDisplayed();
          this.timeline.yearItem.waitForDisplayed();
        });

        it('should filter TRRs', function () {
          this.timeline.filter.force.click();

          this.timeline.crItem.waitForExist(TIMEOUT, true);
          this.timeline.trrItem.waitForDisplayed();
          this.timeline.awardItem.waitForExist(TIMEOUT, true);
          this.timeline.lawsuitItem.waitForExist(TIMEOUT, true);

          this.timeline.rankChangeItem.waitForDisplayed();
          this.timeline.unitChangeItem.waitForDisplayed();
          this.timeline.joinedItem.waitForDisplayed();
          this.timeline.yearItem.waitForDisplayed();
        });

        it('should filter awards', function () {
          this.timeline.filter.awards.click();

          this.timeline.crItem.waitForExist(TIMEOUT, true);
          this.timeline.trrItem.waitForExist(TIMEOUT, true);
          this.timeline.lawsuitItem.waitForExist(TIMEOUT, true);
          this.timeline.awardItem.waitForDisplayed();

          this.timeline.rankChangeItem.waitForDisplayed();
          this.timeline.unitChangeItem.waitForDisplayed();
          this.timeline.joinedItem.waitForDisplayed();
          this.timeline.yearItem.waitForDisplayed();
        });

        it('should filter lawsuits', function () {
          this.timeline.filter.lawsuits.click();

          this.timeline.crItem.waitForExist(TIMEOUT, true);
          this.timeline.trrItem.waitForExist(TIMEOUT, true);
          this.timeline.awardItem.waitForExist(TIMEOUT, true);
          this.timeline.lawsuitItem.waitForDisplayed();

          this.timeline.rankChangeItem.waitForDisplayed();
          this.timeline.unitChangeItem.waitForDisplayed();
          this.timeline.joinedItem.waitForDisplayed();
          this.timeline.yearItem.waitForDisplayed();
        });

        it('should filter rank/unit changes', function () {
          this.timeline.filter.changes.click();

          this.timeline.crItem.waitForExist(TIMEOUT, true);
          this.timeline.trrItem.waitForExist(TIMEOUT, true);
          this.timeline.awardItem.waitForExist(TIMEOUT, true);
          this.timeline.lawsuitItem.waitForExist(TIMEOUT, true);

          this.timeline.rankChangeItem.waitForDisplayed();
          this.timeline.unitChangeItem.waitForDisplayed();
          this.timeline.joinedItem.waitForDisplayed();
          this.timeline.yearItem.waitForDisplayed();
        });

        it('should close the menu when blurring', function () {
          this.timeline.unitChangeItem.click();
          this.timeline.filter.menu.waitForExist(TIMEOUT, true);

          this.timeline.unitChangeItem.waitForDisplayed();
          this.timeline.joinedItem.waitForDisplayed();
          this.timeline.yearItem.waitForDisplayed();
        });

        it('should keep selected filter when changing tab', function () {
          this.timeline.filter.changes.click();
          checkTimelineShowChangesOnly(this.timeline);

          officerPage.coaccusalsTabButton.click();
          this.coaccusals = officerPage.coaccusals;
          browser.getUrl().should.containEql('/officer/2235/kevin-osborn/coaccusals/');
          officerPage.timelineTabButton.click();

          checkTimelineShowChangesOnly(this.timeline);
        });

        it('should reset filter when navigating to another officer page', function () {
          this.timeline.filter.changes.click();
          checkTimelineShowChangesOnly(this.timeline);

          officerPage.coaccusalsTabButton.click();
          this.coaccusals = officerPage.coaccusals;
          browser.getUrl().should.containEql('/officer/2235/kevin-osborn/coaccusals/');
          this.coaccusals.firstCoaccusalCard.click();
          browser.getUrl().should.containEql('/officer/27778/carl-suchocki/');

          officerPage.timelineTabButton.click();
          checkTimelineShowAllItems(this.timeline);
        });
      });
    });

    describe('Coaccusals', function () {
      beforeEach(function () {
        this.coaccusals = officerPage.coaccusals;
      });

      it('should navigate to officer page when clicking on coaccusals card', function () {
        officerPage.coaccusalsTabButton.waitForDisplayed(TIMEOUT);
        officerPage.coaccusalsTabButton.click();
        browser.getUrl().should.containEql('/officer/2235/kevin-osborn/coaccusals/');

        this.coaccusals.firstCoaccusalCard.waitForDisplayed(TIMEOUT);
        this.coaccusals.firstRadarChart.waitForDisplayed();
        this.coaccusals.firstRadarChart.getCSSProperty('background-color')
          .value.should.equal('rgba(245,37,36,1)');
        this.coaccusals.firstCoaccusalCard.click();

        browser.getUrl().should.containEql('/officer/27778/carl-suchocki/');
      });

      it('should be able to be accessed directly via url', function () {
        officerPage.open(2235, 'coaccusals');
        browser.getUrl().should.containEql('/officer/2235/kevin-osborn/coaccusals/');
      });
    });

    describe('Attachments', function () {
      beforeEach(function () {
        this.attachments = officerPage.attachments;
      });

      describe('Complaint', function () {
        it('should navigate to officer complaint when clicking on complaint header', function () {
          officerPage.attachmentsTabButton.waitForDisplayed(TIMEOUT);
          officerPage.attachmentsTabButton.click();
          browser.getUrl().should.containEql('/officer/2235/kevin-osborn/documents/');
          this.attachments.firstComplaintHeading.waitForDisplayed(TIMEOUT);
          this.attachments.firstComplaintHeading.click();
          browser.getUrl().should.containEql('/complaint/294088/');
        });
      });

      describe('Lawsuit', function () {
        it('should navigate to officer lawsuit when clicking on lawsuit header', function () {
          officerPage.attachmentsTabButton.waitForDisplayed(TIMEOUT);
          officerPage.attachmentsTabButton.click();
          browser.getUrl().should.containEql('/officer/2235/kevin-osborn/documents/');
          this.attachments.firstLawsuitAttachment.waitForDisplayed(TIMEOUT);
          this.attachments.firstLawsuitHeading.click();
          browser.getUrl().should.containEql('/lawsuit/00-L-5230/');
        });
      });

      it('should be able to be accessed directly via url', function () {
        officerPage.open(2235, 'documents');
        browser.getUrl().should.containEql('/officer/2235/kevin-osborn/documents/');
      });
    });

    describe('Map', function () {
      it('should add map suffix when click on map tab', function () {
        officerPage.mapTabButton.waitForDisplayed(TIMEOUT);
        officerPage.mapTabButton.click();
        browser.getUrl().should.containEql('/officer/2235/kevin-osborn/map/');
      });
    });

    // describe('Pinboard function', function () {
    //   beforeEach(function () {
    //     api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, {});
    //     api
    //       .onPut(
    //         '/api/v2/mobile/pinboards/5cd06f2b/',
    //         { 'officer_ids': [], crids: [], 'trr_ids': [], title: '', description: '' }
    //       )
    //       .reply(
    //         200,
    //         { id: '5cd06f2b', 'officer_ids': [], crids: [], 'trr_ids': [], title: '', description: '' }
    //       );
    //   });

    //   it('should display toast when pinning a coaccusal', function () {
    //     api
    //       .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [27778], crids: [], 'trr_ids': [] })
    //       .reply(
    //         201,
    //         { id: '5cd06f2b', 'officer_ids': [27778], crids: [], 'trr_ids': [], title: '', description: '' }
    //       );

    //     officerPage.coaccusalsTabButton.waitForDisplayed(TIMEOUT);
    //     officerPage.coaccusalsTabButton.click();

    //     officerPage.coaccusals.firstPinButton.waitForDisplayed();
    //     officerPage.coaccusals.firstPinButton.click();
    //     officerPage.lastToast.waitForDisplayed();
    //     officerPage.lastToast.waitForText(
    //       'Carl Suchocki added to pinboard\nGo to pinboard',
    //       TIMEOUT
    //     );

    //     officerPage.landingPageBreadCrumb.click();
    //     landingPage.searchLink.waitForDisplayed();
    //     landingPage.searchLink.click();
    //     searchPage.pinboardBar.waitForText('Pinboard (1)', TIMEOUT);
    //     browser.back();
    //     browser.back();

    //     officerPage.coaccusals.firstPinButton.click();
    //     officerPage.lastToast.waitForDisplayed();
    //     officerPage.lastToast.waitForText(
    //       'Carl Suchocki removed from pinboard\nGo to pinboard',
    //       TIMEOUT
    //     );

    //     officerPage.landingPageBreadCrumb.click();
    //     landingPage.searchLink.waitForDisplayed();
    //     landingPage.searchLink.click();
    //     searchPage.queryInput.waitForExist();
    //     searchPage.pinboardBar.waitForDisplayed(TIMEOUT, true);
    //   });
    // });

    it('should have clicky installed', function () {
      officerPage.clickyScript.waitForExist();
      officerPage.clickySiteIdsScript.waitForExist();
      officerPage.clickyNoJavascriptGIF.waitForExist();
    });
  });

  context('current officer', function () {
    beforeEach(function () {
      api.onGet('/api/v2/cms-pages/officer-page/').reply(200, mockOfficerPageCms);
      api.onGet('/api/v2/mobile/officers/2235/').reply(200, officer2235);
      api.onGet('/api/v2/mobile/officers/2235/new-timeline-items/').reply(200, mockTimeline);
      api.onGet('/api/v2/mobile/officers/2235/coaccusals/').reply(200, mockCoaccusals);
      api.onGet('/api/v2/mobile/pinboards/8d2daffe/').reply(200, pinboards[0]);
      api.onGet('/api/v2/mobile/pinboards/8d2daffe/complaints/').reply(200, []);
      api.onGet('/api/v2/mobile/pinboards/8d2daffe/officers/').reply(200, []);
      api.onGet('/api/v2/mobile/pinboards/8d2daffe/trrs/').reply(200, []);
      api.onPut('/api/v2/mobile/pinboards/8d2daffe/', updateRequestParams[0]).reply(200, updatedPinboards[0]);
    });

    // context('when user has one active pinboard', function () {
    //   beforeEach(function () {
    //     api.onGet('/api/v2/mobile/pinboards/?detail=true').reply(200, [pinboards[0]]);
    //     api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, pinboards[0]);
    //     officerPage.open(2235);
    //     officerPage.body.waitForExist();
    //   });

    //   it('should display toast when pinning', function () {
    //     officerPage.pinButton.click();
    //     officerPage.lastToast.waitForDisplayed();
    //     officerPage.lastToast.waitForText('Kevin Osborn added to pinboard\nGo to pinboard');

    //     officerPage.landingPageBreadCrumb.click();
    //     landingPage.searchLink.waitForDisplayed();
    //     landingPage.searchLink.click();
    //     searchPage.pinboardBar.waitForDisplayed();
    //     searchPage.pinboardBar.getText().should.equal('Pinboard (4)');
    //   });

    //   it('should display toast when unpinning', function () {
    //     officerPage.pinButton.click();
    //     officerPage.lastToast.waitForDisplayed();
    //     officerPage.lastToast.waitForText(
    //       'Kevin Osborn added to pinboard\nGo to pinboard'
    //     );

    //     officerPage.pinButton.click();
    //     officerPage.lastToast.waitForDisplayed();
    //     officerPage.lastToast.waitForText(
    //       'Kevin Osborn removed from pinboard\nGo to pinboard'
    //     );

    //     officerPage.landingPageBreadCrumb.click();
    //     landingPage.searchLink.waitForDisplayed();
    //     landingPage.searchLink.click();
    //     searchPage.pinboardBar.waitForDisplayed();
    //     searchPage.pinboardBar.getText().should.equal('Pinboard (3)');
    //   });
    // });

  //   context('when user has more than 1 pinboard', function () {
  //     beforeEach(function () {
  //       api.onGet('/api/v2/mobile/pinboards/?detail=true').reply(200, pinboards);
  //       api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, {});
  //       api.onGet('/api/v2/mobile/pinboards/f7231a74/').reply(200, createdPinboards[0]);
  //       api.onGet('/api/v2/mobile/pinboards/f7231a74/complaints/').reply(200, []);
  //       api.onGet('/api/v2/mobile/pinboards/f7231a74/officers/').reply(200, createdPinboardsOfficersData);
  //       api.onGet('/api/v2/mobile/pinboards/f7231a74/trrs/').reply(200, []);
  //       api.onPost('/api/v2/mobile/pinboards/', createPinboardRequestParams[0]).reply(200, createdPinboards[0],);
  //       officerPage.open(2235);
  //       officerPage.body.waitForExist();
  //     });

  //     it('should display pinboards menu', function () {
  //       const pinboardsMenu = officerPage.pinboardsMenu;
  //       const pinboardsMenuItems = pinboardsMenu.items;

  //       officerPage.addToPinboardButton.click();
  //       pinboardsMenu.firstItemTitle.waitForDisplayed();

  //       pinboardsMenuItems.count.should.equal(5);
  //       pinboardsMenu.firstItemTitle.getText().should.equal('Skrull Cap');
  //       pinboardsMenu.firstItemCreatedAt.getText().should.equal('Created Mar 09, 2020');
  //       pinboardsMenu.secondItemTitle.getText().should.equal('Watts Crew');
  //       pinboardsMenu.secondItemCreatedAt.getText().should.equal('Created Mar 09, 2020');
  //       pinboardsMenu.thirdItemTitle.getText().should.equal('');
  //       pinboardsMenu.thirdItemCreatedAt.getText().should.equal('Created Mar 09, 2020');
  //     });

  //     it('should close pinboards menu when click outside', function () {
  //       const pinboardsMenu = officerPage.pinboardsMenu;

  //       officerPage.addToPinboardButton.click();
  //       pinboardsMenu.firstItemTitle.waitForDisplayed();
  //       officerPage.officerName.click();
  //       pinboardsMenu.firstItemTitle.waitForExist(TIMEOUT, true);
  //     });

  //     it('should display toast and close pinboards menu when pinning', function () {
  //       const pinboardsMenu = officerPage.pinboardsMenu;

  //       officerPage.addToPinboardButton.click();
  //       pinboardsMenu.firstItemTitle.waitForDisplayed();

  //       pinboardsMenu.firstItemPinButton.click();
  //       officerPage.lastToast.waitForDisplayed();
  //       officerPage.lastToast.waitForText('Kevin Osborn added to pinboard\nGo to pinboard');
  //       pinboardsMenu.firstItemTitle.waitForExist(TIMEOUT, true);

  //       officerPage.landingPageBreadCrumb.click();
  //       landingPage.searchLink.waitForDisplayed();
  //       landingPage.searchLink.click();
  //       searchPage.pinboardBar.waitForDisplayed();
  //       searchPage.pinboardBar.getText().should.equal('Pinboard (4)');
  //     });

  //     it('should display toast when unpinning', function () {
  //       const pinboardsMenu = officerPage.pinboardsMenu;

  //       officerPage.addToPinboardButton.click();
  //       pinboardsMenu.firstItemTitle.waitForDisplayed();

  //       pinboardsMenu.firstItemPinButton.click();
  //       officerPage.lastToast.waitForDisplayed();
  //       officerPage.lastToast.waitForText('Kevin Osborn added to pinboard\nGo to pinboard');
  //       pinboardsMenu.firstItemTitle.waitForExist(TIMEOUT, true);

  //       officerPage.addToPinboardButton.click();
  //       pinboardsMenu.firstItemTitle.waitForDisplayed();
  //       pinboardsMenu.firstItemPinButton.click();
  //       officerPage.lastToast.waitForDisplayed();
  //       officerPage.lastToast.waitForText(
  //         'Kevin Osborn removed from pinboard\nGo to pinboard'
  //       );
  //       pinboardsMenu.firstItemTitle.waitForExist(TIMEOUT, true);

  //       officerPage.landingPageBreadCrumb.click();
  //       landingPage.searchLink.waitForDisplayed();
  //       landingPage.searchLink.click();
  //       searchPage.pinboardBar.waitForDisplayed();
  //       searchPage.pinboardBar.getText().should.equal('Pinboard (3)');
  //     });

  //     it('should create new pinboard with current officer', function () {
  //       const pinboardsMenu = officerPage.pinboardsMenu;

  //       officerPage.addToPinboardButton.click();
  //       pinboardsMenu.createPinboardWithSelectionButton.waitForDisplayed();
  //       pinboardsMenu.createPinboardWithSelectionButton.click();

  //       browser.waitForUrl(url => url.should.containEql('/pinboard/f7231a74/untitled-pinboard/'), 1000);
  //       pinboardPage.pinnedSection.officers.cards.waitForCount(1, 3000);
  //       pinboardPage.pinnedSection.officers.firstCardName.getText().should.equal('Kevin Osborn');
  //     });
  //   });
   });
});
