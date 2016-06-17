import React from 'react';
import should from 'should';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import shouldReact from 'utils/tests/should/React';
import OfficerAnalyticSection from 'components/OfficerPage/SummaryTab/OfficerAnalyticSection.react';
import DistributionCurve from 'components/OfficerPage/SummaryTab/OfficerAnalyticSection/DistributionCurve.react';
import OfficerFactory from 'factories/CoAccusedOfficerFactory';
import f from 'utils/tests/f';


describe('OfficerAnalyticSectionComponent', () => {
  it('should be renderable', () => {
    OfficerAnalyticSection.should.be.renderable();
  });

  it('should render `DistributionCurve` as its sub-component', () => {
    const officer = f.create('Officer');
    const distribution = [1, 2, 3];
    const officerAnalyticSection = renderIntoDocument(
      <OfficerAnalyticSection officer={ officer } distribution={ distribution } />
    );

    officerAnalyticSection.should.renderWithProps(DistributionCurve, {
      'officer': officer,
      'distribution': distribution
    });
  });
});
