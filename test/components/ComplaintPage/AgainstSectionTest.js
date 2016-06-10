import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import should from 'should';

import f from 'utils/tests/f';
import shouldReact from 'utils/tests/should/React';

import AgainstCard from 'components/ComplaintPage/AgainstSection/AgainstCard.react';
import AgainstSection from 'components/ComplaintPage/AgainstSection.react';
import InvestigationTimeline from 'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline.react';


describe('AgainstSectionComponent', () => {
  let againstSection;

  it('should be renderable', () => {
    AgainstSection.should.be.renderable();
  });

  it('should render AgainstCard as sub-component', () => {
    const officerAllegations = f.createBatch(1, 'OfficerAllegation');

    againstSection = ReactTestUtils.renderIntoDocument(
      <AgainstSection officerAllegations={ officerAllegations } />
    );

    againstSection.should.render([AgainstCard]);
  });

  it('should render `InvestigationTimeline` as sub-component if more than one officer ' +
    'allegation have the same timeline', () => {
    const officerAllegations = f.createBatch(2, 'OfficerAllegation',
      { 'start_date': '2012-01-19', 'end_date': '2012-01-19' });

    againstSection = ReactTestUtils.renderIntoDocument(
      <AgainstSection officerAllegations={ officerAllegations } />
    );

    againstSection.should.render([InvestigationTimeline]);
  });

  it('should render `InvestigationTimeline` inside `AgainstCard` if there is only one officer allegation', () => {
    let againstCard;
    const officerAllegations = f.createBatch(1, 'OfficerAllegation');

    againstSection = ReactTestUtils.renderIntoDocument(
      <AgainstSection officerAllegations={ officerAllegations } />
    );

    againstCard = ReactTestUtils.findRenderedComponentWithType(againstSection, AgainstCard);

    againstCard.should.render([InvestigationTimeline]);
  });
});
