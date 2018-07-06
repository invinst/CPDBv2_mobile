import React from 'react';
import { shallow } from 'enzyme';

import PoliceWitness from 'components/complaint-page/police-witness';

describe('PoliceWitness component', function () {
  it('should be renderable', function () {
    const instance = shallow(
      <PoliceWitness policeWitnesses={ [{ percentile: {} }] } />
    );

    instance.find('.police-witness-row').should.have.length(1);
  });

  it('should render nothing if there is not data', function () {
    const instance = shallow(
      <PoliceWitness />
    );

    instance.find('.police-witness-row').should.have.length(0);
  });
});
