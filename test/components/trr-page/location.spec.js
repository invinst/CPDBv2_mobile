import React from 'react';
import { shallow } from 'enzyme';

import Location from 'components/trr-page/location';


describe('<Location />', function () {
  it('should be render enough contents', function () {
    const wrapper = shallow(
      <Location
        address='11XX 79Th St'
        locationType='Street'
        beat='612'
      />
    );

    wrapper.find('.location-header').text().should.equal('LOCATION');

    wrapper.find('.map');

    const rows = wrapper.find('.row');
    rows.should.have.length(3);

    rows.at(0).text().should.containEql('Address').and.containEql('11XX 79Th St');
    rows.at(1).text().should.containEql('Location Type').and.containEql('Street');
    rows.at(2).text().should.containEql('Beat').and.containEql('612');
  });
});
