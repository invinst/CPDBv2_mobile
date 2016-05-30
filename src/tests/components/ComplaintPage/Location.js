let ReactTestUtils, Location, Map, MapFacade, f, sinon;

import React from 'react';
require('react-dom');
ReactTestUtils = require('react-addons-test-utils');

require('should');
sinon = require('sinon');

f = require('utils/tests/f');
require('utils/tests/should/React');
MapFacade = require('utils/MapFacade');


Location = require('components/ComplaintPage/Location.react');
Map = require('components/ComplaintPage/Location/Map.react');


describe('LocationComponent', () => {
  let location;

  beforeEach(() => {
    sinon.stub(MapFacade, 'initialize');
    sinon.stub(MapFacade, 'addAccidentPlaceMarker');
    sinon.stub(MapFacade, 'addNoAddressPopup');
  });

  afterEach(() => {
    MapFacade.initialize.restore();
    MapFacade.addAccidentPlaceMarker.restore();
    MapFacade.addNoAddressPopup.restore();
  });

  it('should be renderable', () => {
    Location.should.be.renderable();
  });

  it('should render Map as sub-component if allegation has point data', () => {
    const point = {'x': '-87.725233', 'y': '41.854405'};
    const allegation = f.create('Allegation', {'point': point});

    location = ReactTestUtils.renderIntoDocument(
    location = ReactTestUtils.renderIntoDocument(
      <Location allegation={ allegation }/>
    );

    location.should.render([Map]);
  });

  it('should show full address, beat, location type, city', () => {
    const add1 = 'add1';
    const add2 = 'add2';
    const beat = {'name': '0512'};
    const allegation = f.create('Allegation', {
      'add1': add1, 'add2': add2, 'beat': beat, 'city': 'CHICAGO IL', 'location': '17'
    });

    location = ReactTestUtils.renderIntoDocument(
    location = ReactTestUtils.renderIntoDocument(
      <Location allegation={ allegation }/>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(location, 'location-detail')
      .textContent.should.containEql('add1 add2');
    ReactTestUtils.findRenderedDOMComponentWithClass(location, 'location-detail')
      .textContent.should.containEql('0512');
    ReactTestUtils.findRenderedDOMComponentWithClass(location, 'location-detail')
      .textContent.should.containEql('CHICAGO IL');
    ReactTestUtils.findRenderedDOMComponentWithClass(location, 'location-detail')
      .textContent.should.containEql('17');
  });

});
