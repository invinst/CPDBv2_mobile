import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import should from 'should';

import LocationMap from 'components/common/location-map';


describe('LocationMap component', function () {

  it('should render location map with default marker', function () {
    const wrapper = mount(<LocationMap lng={ 1 } lat={ 1 } />);

    wrapper.should.be.ok();

    wrapper.instance().marker.element.className.should.equal('default-marker');
  });

  it('should reset marker location on rerender', function () {
    const wrapper = mount(<LocationMap lng={ 0 } lat={ 0 } />);
    const instance = wrapper.instance();
    instance.marker.setLngLat.reset();

    wrapper.setProps({ lng: 1, lat: 1 });

    instance.marker.setLngLat.calledWith([1, 1]).should.be.true();
  });

  it('should zoom out on rerender if it\'s zoom in already', function () {
    const wrapper = mount(<LocationMap lng={ 0 } lat={ 0 } />);
    const instance = wrapper.instance();
    instance.handleMapClick();
    const zoomOutSpy = spy(instance, 'zoomOut');

    instance.map.getZoom.returns(13);

    wrapper.setProps({ lng: 1, lat: 1 });

    zoomOutSpy.called.should.be.true();
    instance.map.getZoom.resetHistory();
  });

  it('should call zoomIn when click and map is zoomed out', function () {
    const wrapper = mount(<LocationMap lng={ 1 } lat={ 1 } />);
    const instance = wrapper.instance();
    const zoomIn = spy(instance, 'zoomIn');

    instance.map.getZoom.returns(8);
    instance.handleMapClick();
    zoomIn.called.should.be.true();
    instance.map.getZoom.resetHistory();
  });

  it('should call zoomOut when click and map is zoomed in', function () {
    const wrapper = mount(<LocationMap lng={ 1 } lat={ 1 } />);
    const instance = wrapper.instance();
    const zoomOut = spy(instance, 'zoomOut');

    instance.map.getZoom.returns(13);
    instance.handleMapClick();
    zoomOut.called.should.be.true();
    instance.map.getZoom.resetHistory();
  });

  it('should render with custom marker', function () {
    const customMarker = <div className='custom-marker'/>;
    const wrapper = mount(<LocationMap lng={ 1 } lat={ 1 } markerEl={ customMarker }/>);

    wrapper.instance().marker.element.className.should.equal('custom-marker');
  });

  it('shouldn\'t render custom marker if lng or lat is missing', function () {
    const customMarker = <div className='custom-marker'/>;
    const wrapper = mount(<LocationMap lng={ 1 } markerEl={ customMarker }/>);

    should(wrapper.instance().marker).not.be.ok();
  });

  it('should remove old marker if new lng or lat is missing', function () {
    const customMarker = <div className='custom-marker'/>;
    const wrapper = mount(<LocationMap lng={ 1 } lat={ 1 } markerEl={ customMarker }/>);

    wrapper.instance().marker.element.className.should.equal('custom-marker');

    wrapper.setProps({ lng: null, lat: 1 });

    should(wrapper.instance().marker).not.be.ok();
  });
});
