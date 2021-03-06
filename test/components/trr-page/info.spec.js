import React from 'react';
import { shallow } from 'enzyme';

import Info from 'components/trr-page/info';
import Attachment from 'components/trr-page/attachment';


describe('<Info />', function () {

  it('should be render enough contents', function () {
    const info = {
      victimDemographic: 'Black, Male, Age 53',
      forceTypes: ['Escort Holds', 'Member Presence', 'Verbal Commands'],
      incidentDate: 'SEP 23, 2003',
      address: '11XX 79Th St',
      locationType: 'Street',
      beat: '612',
      point: {
        lat: 1.2,
        lng: 2.3,
      },
      trrId: 123,
    };

    const wrapper = shallow(<Info { ...info }/>);

    wrapper.find('.victim-section').text().should.containEql('Victim');
    wrapper.find('.victim-section').text().should.containEql('Black, Male, Age 53');

    wrapper.find('TypeOfForce').prop('forceTypes').should.deepEqual(
      ['Escort Holds', 'Member Presence', 'Verbal Commands']
    );

    const attachmentSection = wrapper.find(Attachment);
    attachmentSection.prop('trrId').should.equal(123);

    wrapper.find('.date-title').text().should.equal('DATE OF INCIDENT');
    wrapper.find('.incident-date').text().should.equal('SEP 23, 2003');

    const location = wrapper.find('Location');
    location.prop('address').should.equal('11XX 79Th St');
    location.prop('locationType').should.equal('Street');
    location.prop('beat').should.equal('612');
    location.prop('point').should.deepEqual({ lat: 1.2, lng: 2.3 });
  });
});
