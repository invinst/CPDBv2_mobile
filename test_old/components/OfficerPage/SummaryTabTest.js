import React from 'react';
import should from 'should';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import shouldReact from 'utils/tests/should/React';
import SummaryTab from 'components/OfficerPage/SummaryTab.react';
import OfficerSummarySection from 'components/OfficerPage/SummaryTab/OfficerSummarySection.react';
import OfficerAnalyticSection from 'components/OfficerPage/SummaryTab/OfficerAnalyticSection.react';
import OfficerFactory from 'factories/OfficerFactory';
import f from 'utils/tests/f';


describe('SummaryTabComponent', () => {
  it('should be renderable', () => {
    SummaryTab.should.be.renderable();
  });

  it('should render `OfficerSummarySection` and `OfficerAnalyticSection` as subcomponents', () => {
    const officer = f.create('Officer');
    const distribution = [1, 2, 3];

    const summaryTab = renderIntoDocument(
      <SummaryTab officer={ officer } distribution={ distribution } />
    );

    summaryTab.should.renderWithProps(OfficerSummarySection, { 'officer': officer });
    summaryTab.should.renderWithProps(OfficerAnalyticSection, { 'officer': officer, 'distribution': distribution });
  });
});
