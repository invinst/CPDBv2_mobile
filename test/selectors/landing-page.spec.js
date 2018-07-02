import { stub } from 'sinon';

import {
  topOfficersByAllegationSelector,
  recentActivitiesSelector,
  newDocumentAllegationsSelector,
  complaintSummariesSelector,
  cmsSelector
} from 'selectors/landing-page';
import * as draftjsUtils from 'utils/draftjs';

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
      percentile: {}
    }]);
  });

  it('recentActivitiesSelector', () => {
    recentActivitiesSelector({
      landingPage: {}
    }).should.eql([]);

    recentActivitiesSelector({
      landingPage: {
        recentActivities: [{
          id: 123,
          percentile: null
        }]
      }
    }).should.deepEqual([{
      id: 123,
      percentile: {}
    }]);
  });

  it('newDocumentAllegationsSelector', () => {
    newDocumentAllegationsSelector({
      landingPage: {}
    }).should.eql([]);

    newDocumentAllegationsSelector({
      landingPage: {
        newDocumentAllegations: ['abc']
      }
    }).should.eql(['abc']);
  });

  it('complaintSummariesSelector', () => {
    complaintSummariesSelector({
      landingPage: {}
    }).should.eql([]);

    complaintSummariesSelector({
      landingPage: {
        complaintSummaries: ['abc']
      }
    }).should.eql(['abc']);
  });

  it('cmsSelector', () => {
    stub(draftjsUtils, 'convertContentStateToEditorState').callsFake((args) => args);
    const state = {
      landingPage: {
        cms: [
          {
            name: 'title_field',
            value: 'title'
          },
          {
            name: 'desc_field',
            value: 'desc'
          }
        ]
      }
    };

    cmsSelector('title_field')(state).should.eql('title');
    draftjsUtils.convertContentStateToEditorState.calledWith('title').should.be.true();
    draftjsUtils.convertContentStateToEditorState.restore();
  });
});
