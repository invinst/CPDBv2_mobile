import React from 'react';
import should from 'should';

import shouldReact from 'utils/tests/should/React';
import DistributionCurve from 'components/OfficerPage/SummaryTab/OfficerAnalyticSection/DistributionCurve.react';


describe('DistributionCurveComponent', () => {
  it('should be renderable', () => {
    DistributionCurve.should.be.renderable();
  });
});
