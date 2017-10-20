import React from 'react';
import { shallow } from 'enzyme';
import { Map, Marker, TileLayer } from 'react-leaflet';

import constants from 'constants';
import IncidentLocation from 'components/ComplaintPage/IncidentLocation';

describe('<IncidentLocation />', function () {
  it('should set default zoom level', function () {
    const wrapper = shallow(<IncidentLocation />);
    wrapper.instance().state.zoomLevel.should.eql(10);
  });

  describe('switchZoomLevel()', function () {
    it('should alternate between high and low zoom level', function () {
      const instance = shallow(<IncidentLocation />).instance();
      instance.state.zoomLevel.should.eql(10);
      instance.switchZoomLevel();
      instance.state.zoomLevel.should.eql(14);
      instance.switchZoomLevel();
      instance.state.zoomLevel.should.eql(10);
    });
  });

  it('should render SectionTitle', function () {
    const wrapper = shallow(<IncidentLocation />);
    wrapper.find('SectionTitle').prop('title').should.eql('Location');
  });

  it('should render Map with default props if no extra data is provided', function () {
    const wrapper = shallow(<IncidentLocation />);
    const map = wrapper.find(Map);

    // focus on Chicago by default
    map.prop('center').should.eql([41.8781, -87.6298]);

    // render no marker
    map.find(Marker).exists().should.be.false();

    // render TileLayer with correct url
    map.find(TileLayer).prop('url').should.eql(`http://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${constants.MAPBOX_TOKEN}`);

    // Location Type and Beat are "Unknown" be default
    wrapper.text().should.containEql('Location TypeUnknown');
    wrapper.text().should.containEql('BeatUnknown');
  });

  it('should render Location Type and Beat', function () {
    const wrapper = shallow(
      <IncidentLocation
        beat={ { name: '1034' } }
        location='Other Business Establishment'
      />
    );

    wrapper.text().should.containEql('Location TypeOther Business Establishment');
    wrapper.text().should.containEql('Beat1034');
  });

  it('should render Address', function () {
    const wrapper = shallow(
      <IncidentLocation
        address='2459 WESTERN AVE, CHICAGO IL 60608'
        point={ { lat: 41.846749, long: -87.685141 } }
      />
    );

    const address = wrapper.find('.address > a');
    address.text().should.eql('2459 WESTERN AVE, CHICAGO IL 60608');
    address.prop('href').should.eql('http://maps.google.com/maps?&z=10&q=41.846749+-87.685141&ll=41.846749+-87.685141');
  });
});
