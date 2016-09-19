import React from 'react';
import { shallow, mount } from 'enzyme';
import { mock, match } from 'sinon';

import Map from 'components/ComplaintPage/Location/Map';
import MapFacade from 'utils/MapFacade';
import f from 'utils/tests/f';


describe('Map component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<Map />);
    wrapper.should.be.ok();
  });

  it('should initialize MapFacade if point available', function () {
    const point = 'point';
    const allegation = f.create('Allegation', { point: point, add1: '' });
    const mockMapFacade = mock(MapFacade);
    mockMapFacade.expects('initialize').once().withArgs(match.any, point);
    mockMapFacade.expects('addNoAddressPopup').once();

    mount(<Map allegation={ allegation }/>);
    mockMapFacade.verify();
    mockMapFacade.restore();
  });

  it('should add marker if allegation has full address', function () {
    const point = 'point';
    const allegation = f.create('Allegation', { point: point, add1: 'add1', add2: 'add2' });
    const mockMapFacade = mock(MapFacade);
    mockMapFacade.expects('initialize').once().withArgs(match.any, point);
    mockMapFacade.expects('addAccidentPlaceMarker').once();

    mount(<Map allegation={ allegation }/>);
    mockMapFacade.verify();
    mockMapFacade.restore();
  });
});
