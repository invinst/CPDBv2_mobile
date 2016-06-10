import React from 'react';
import should from 'should';
import { renderIntoDocument } from 'react-addons-test-utils';

import shouldReact from 'utils/tests/should/React';
import OfficerSummarySection from 'components/OfficerPage/SummaryTab/OfficerSummarySection.react';
import OfficerSummaryItem from 'components/OfficerPage/SummaryTab/OfficerSummarySection/OfficerSummaryItem.react';
import OfficerFactory from 'factories/CoAccusedOfficerFactory';
import f from 'utils/tests/f';


describe('OfficerSummarySectionComponent', () => {
  it('should be renderable', () => {
    OfficerSummarySection.should.be.renderable();
  });

  it('should render nothing summary data is not available', () => {
    const summarySection = renderIntoDocument(
      <OfficerSummarySection />
    );
    summarySection.should.renderNothing();
  });

  it('should render `OfficerSummaryItem` as its sub-component if summary data is available', () => {
    const officer = f.create('Officer', {
      'race': 'Black'
    });

    const summarySection = renderIntoDocument(
      <OfficerSummarySection officer={ officer } />
    );
    summarySection.should.render([OfficerSummaryItem]);
  });
});
