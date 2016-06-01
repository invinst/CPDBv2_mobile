import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactTestUtils from 'react-addons-test-utils';

import should from 'should';

import f from 'utils/tests/f';
import shouldReact from 'utils/tests/should/React';

import InvestigationTimeline from 'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline.react';
import ThreeNodesTimeline from
  'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline/ThreeNodesTimeline.react';
import TwoNodesTimeline from
  'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline/TwoNodesTimeline.react';


describe('InvestigationTimelineComponent', function () {
  let investigaionTimeline;

  it('should be renderable', function () {
    InvestigationTimeline.should.be.renderable();
  });

  it('should render empty div if do not have enough data', function () {
    investigaionTimeline = ReactDOMServer.renderToStaticMarkup(
      <InvestigationTimeline />
    );

    investigaionTimeline.should.be.equal('<div></div>');
  });

  it('should render TwoNodesTimeline as sub-component if investigation start at incident date', function () {
    const date = '2012-01-19';
    const incidentDate = '2012-01-19T07:30:00';
    const officerAllegation = f.create('OfficerAllegation', {'start_date': date});
    const allegation = f.create('Allegation', {'incident_date': incidentDate});

    investigaionTimeline = ReactTestUtils.renderIntoDocument(
      <InvestigationTimeline officerAllegation={ officerAllegation } allegation={ allegation }/>
    );

    investigaionTimeline.should.render([TwoNodesTimeline]);
  });

  it('should render ThreeNodesTimeline as sub-component if investigation start at incident date', function () {
    const incidentDate = '2012-10-07T07:30:00';
    const date = '2012-01-19';
    const officerAllegation = f.create('OfficerAllegation', {'start_date': date});
    const allegation = f.create('Allegation', {'incident_date': incidentDate});

    investigaionTimeline = ReactTestUtils.renderIntoDocument(
      <InvestigationTimeline officerAllegation={ officerAllegation } allegation={ allegation }/>
    );

    investigaionTimeline.should.render([ThreeNodesTimeline]);
  });

});
