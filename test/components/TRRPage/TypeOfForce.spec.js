import React from 'react';
import { shallow } from 'enzyme';

import TypeOfForce from 'components/TRRPage/TypeOfForce';


describe('<TypeOfForce />', function () {

  it('should be render enough contents', function () {
    const forceTypes = ['Escort Holds', 'Member Presence', 'Verbal Commands'];
    const wrapper = shallow(<TypeOfForce forceTypes={ forceTypes }/>);

    wrapper.find('.title').text().should.equal('TYPES OF FORCE');
    wrapper.find('.top-force-type').text().should.equal('Escort Holds');
    const lowerForceTypes = wrapper.find('.force-type');
    lowerForceTypes.should.have.length(2);
    lowerForceTypes.at(0).text().should.equal('↑Member Presence');
    lowerForceTypes.at(1).text().should.equal('↑Verbal Commands');
  });
});
