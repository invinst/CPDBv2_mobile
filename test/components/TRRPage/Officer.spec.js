import React from 'react';
import { shallow } from 'enzyme';

import Officer from 'components/TRRPage/Officer';


describe('<Officer />', function () {

  it('should be render enough contents', function () {
    const officer = {
      officerId: 456,
      fullName: 'Donovan Markiewicz',
      demographic: '36 year old, white, male.',
      careerDuration: 'SEP 26, 2005 — Present',
      unitName: '003',
      unitDescription: 'Unit 003',
      assignedBeat: '123',
      onDuty: 'Yes',
      inUniform: 'No',
    };

    const wrapper = shallow(<Officer { ...officer }/>);

    wrapper.find('Link').prop('to').should.equal('/officer/456/');

    wrapper.find('.officer-visual-token');
    wrapper.find('.rank').text().should.equal('Officer');
    wrapper.find('.full-name').text().should.equal('Donovan Markiewicz');

    const rows = wrapper.find('.row');
    rows.should.have.length(6);
    const demographic = rows.at(0);
    const career = rows.at(1);
    const unit = rows.at(2);
    const beat = rows.at(3);
    const onDuty = rows.at(4);
    const inUniform = rows.at(5);

    demographic.find('.title').text().should.equal('36 year old, white, male.');
    career.find('.title').text().should.equal('Career');
    unit.find('.title').text().should.equal('Unit');
    beat.find('.title').text().should.equal('Assigned Beat');
    onDuty.find('.title').text().should.equal('On Duty');
    inUniform.find('.title').text().should.equal('In Uniform');

    career.find('.value').text().should.equal('SEP 26, 2005 — Present');
    unit.find('.value').text().should.equal('Unit 003');
    beat.find('.value').text().should.equal('123');
    onDuty.find('.value').text().should.equal('Yes');
    inUniform.find('.value').text().should.equal('No');
  });

  it('render should unit name if unit description is not available', function () {
    const officer = {
      fullName: 'Donovan Markiewicz',
      demographic: '36 year old, white, male.',
      careerDuration: 'SEP 26, 2005 — Present',
      unitName: '003',
      assignedBeat: '123',
      onDuty: 'Yes',
      inUniform: 'No',
    };

    const wrapper = shallow(<Officer { ...officer }/>);
    const rows = wrapper.find('.row');

    rows.at(2).find('.value').text().should.equal('003');
  });
});
