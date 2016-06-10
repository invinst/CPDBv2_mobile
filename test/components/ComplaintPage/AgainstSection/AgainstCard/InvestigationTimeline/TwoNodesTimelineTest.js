import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import should from 'should';
import f from 'utils/tests/f';
import shouldReact from 'utils/tests/should/React';

import TwoNodesTimeline from
  'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline/TwoNodesTimeline.react';


describe('TwoNodesTimelineComponent', () => {
  let twoNodesTimeline;

  it('should be renderable', () => {
    TwoNodesTimeline.should.be.renderable();
  });

  it('should be show incident date, final status, end date', () => {
    const incidentDate = '2012-10-07T07:30:00';
    const endDate = '2012-01-19';
    const expectedDate = 'Oct 07, 2012';
    const allegation = f.create('Allegation', { 'incident_date': incidentDate });
    const officerAllegation = f.create('OfficerAllegation', {
      'end_date': endDate,
      'final_outcome_class': 'open-investigation'
    });

    twoNodesTimeline = ReactTestUtils.renderIntoDocument(
      <TwoNodesTimeline allegation={ allegation } officerAllegation={ officerAllegation } />
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(twoNodesTimeline, 'incident-date')
      .textContent.should.be.eql(expectedDate);
    ReactTestUtils.findRenderedDOMComponentWithClass(twoNodesTimeline, 'end-date')
      .textContent.should.be.eql('Jan 19, 2012');
    ReactTestUtils.findRenderedDOMComponentWithClass(twoNodesTimeline, 'event-title status')
      .textContent.should.be.eql('Open Investigation');

  });

  it('should show final finding if its final status is closed', () => {
    const officerAllegation = f.create('OfficerAllegation', {
      'final_outcome_class': 'not-sustained',
      'final_finding': 'NS'
    });

    twoNodesTimeline = ReactTestUtils.renderIntoDocument(
      <TwoNodesTimeline officerAllegation={ officerAllegation } />
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(twoNodesTimeline, 'event-title status')
      .textContent.should.be.containEql('Not Sustained');
  });

  it('should be show dashline style if open investigation', () => {
    let line;
    const officerAllegation = f.create('OfficerAllegation', { 'final_outcome_class': 'open-investigation' });
    twoNodesTimeline = ReactTestUtils.renderIntoDocument(
      <TwoNodesTimeline officerAllegation={ officerAllegation } />
    );

    line = ReactTestUtils.findRenderedDOMComponentWithTag(twoNodesTimeline, 'line');
    line.getAttribute('style').should.containEql('non-scaling-stroke');
  });

  it('should be show no style if not open investigation', () => {
    let line;
    const officerAllegation = f.create('OfficerAllegation', { 'final_outcome_class': 'not-sustained' });
    twoNodesTimeline = ReactTestUtils.renderIntoDocument(
      <TwoNodesTimeline officerAllegation={ officerAllegation } />
    );

    line = ReactTestUtils.findRenderedDOMComponentWithTag(twoNodesTimeline, 'line');
    should(line.getAttribute('style')).be.exactly(null);
  });

  it('should show `Unknown date` if incident date is empty', () => {
    let line;
    const incidentDate = '';
    const allegation = f.create('Allegation', { 'incident_date': incidentDate });

    twoNodesTimeline = ReactTestUtils.renderIntoDocument(
      <TwoNodesTimeline allegation={ allegation } />
    );
    line = ReactTestUtils.findRenderedDOMComponentWithClass(twoNodesTimeline, 'incident-date');
    line.textContent.should.containEql('Unknown date');
  });
});
