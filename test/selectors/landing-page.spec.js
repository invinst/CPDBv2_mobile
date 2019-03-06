import {
  topOfficersByAllegationSelector,
  recentActivitiesSelector,
  newDocumentAllegationsSelector,
  complaintSummariesSelector,
  getCMSRequested,
  getEmbed
} from 'selectors/landing-page';


describe('landing page selectors', function () {
  it('topOfficersByAllegationSelector', () => {
    topOfficersByAllegationSelector({
      landingPage: {}
    }).should.eql([]);

    topOfficersByAllegationSelector({
      landingPage: {
        topOfficersByAllegation: [{
          id: 123,
          percentile: null
        }]
      }
    }).should.deepEqual([{
      id: 123,
      percentile: null
    }]);
  });

  it('recentActivitiesSelector', () => {
    recentActivitiesSelector({
      landingPage: {}
    }).should.eql([]);

    recentActivitiesSelector({
      landingPage: {
        recentActivities: [
          {
            id: 123,
            percentile: null,
            type: 'coaccused_pair'
          },
          {
            id: 124,
            percentile: null,
            type: 'single_officer'
          },
        ]
      }
    }).should.deepEqual([{
      id: 124,
      percentile: null,
      type: 'single_officer'
    }]);
  });

  it('newDocumentAllegationsSelector', () => {
    newDocumentAllegationsSelector({
      landingPage: {}
    }).should.eql([]);

    newDocumentAllegationsSelector({
      landingPage: {
        newDocumentAllegations: [
          {
            'crid': '123214',
            'num_recent_documents': 2,
            'latest_document': {
              'preview_image_url': 'preview_link',
              'id': '123456',
            }
          }
        ]
      }
    }).should.eql([{
      crid: '123214',
      documentCount: 2,
      document: {
        previewImageUrl: 'preview_link',
        id: '123456'
      }
    }]);
  });

  it('complaintSummariesSelector', () => {
    complaintSummariesSelector({
      landingPage: {}
    }).should.eql([]);

    complaintSummariesSelector({
      landingPage: {
        complaintSummaries: [
          {
            'crid': '12345',
            'summary': 'summary',
            'incident_date': '2016-04-18',
            'category_names': ['Use Of Force', 'Verbal Abuse']
          },
          {
            'crid': '12346',
            'summary': 'summary',
            'incident_date': null,
            'category_names': ['Use Of Force']
          }
        ]
      }
    }).should.eql([
      {
        crid: '12345',
        summary: 'summary',
        incidentDate: 'APR 18, 2016',
        categories: 'Use Of Force, Verbal Abuse'
      },
      {
        crid: '12346',
        summary: 'summary',
        incidentDate: null,
        categories: 'Use Of Force'
      }
    ]);
  });

  it('getCMSRequested', () => {
    getCMSRequested({ landingPage: { cmsRequested: true } }).should.be.true();
    getCMSRequested({ landingPage: { cmsRequested: false } }).should.be.false();
  });

  it('getEmbed', () => {
    getEmbed({ location: { pathname: 'embed/top-officers-page' } }).should.be.true();
    getEmbed({ location: { pathname: 'top-officers-page' } }).should.be.false();
    getEmbed({ }).should.be.false();
  });
});
