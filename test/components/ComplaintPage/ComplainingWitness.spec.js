import React from 'react';
import { shallow } from 'enzyme';

import f from 'utils/tests/f';
import ComplainingWitness from 'components/ComplaintPage/ComplainingWitness';


describe('ComplainingWitness component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<ComplainingWitness />);
    wrapper.should.be.ok();
  });

  it('should render complaining witness row for each complainingWitness', function () {
    const complainingWitnesses = f.createBatch(2, 'ComplainingWitness');
    const wrapper = shallow(<ComplainingWitness complainingWitnesses={ complainingWitnesses }/>);
    wrapper.find('.complaining-witness-row').should.have.length(2);
  });
});
