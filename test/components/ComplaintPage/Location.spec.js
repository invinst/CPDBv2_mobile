import React from 'react';
import { shallow } from 'enzyme';

import f from 'utils/tests/f';
import Location from 'components/ComplaintPage/Location';
import Wrapper from 'components/Shared/Wrapper';


describe('Location component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<Location />);
    wrapper.should.be.ok();
  });

  it('should have beat visible if available and vice versa', function () {
    let allegation = f.create('Allegation', { beat: { name: 'beat' } });
    let wrapper = shallow(<Location allegation={ allegation }/>);
    wrapper.find('.location-detail').find(Wrapper).first().props().visible.should.be.true();

    allegation = f.create('Allegation', { beat: null });
    wrapper = shallow(<Location allegation={ allegation }/>);
    wrapper.find('.location-detail').find(Wrapper).first().props().visible.should.be.false();
  });

  it('should have location visible if available and vice versa', function () {
    let allegation = f.create('Allegation', { location: 'location' });
    let wrapper = shallow(<Location allegation={ allegation }/>);
    wrapper.find('.location-detail').find(Wrapper).get(1).props.visible.should.be.true();

    allegation = f.create('Allegation', { location: null });
    wrapper = shallow(<Location allegation={ allegation }/>);
    wrapper.find('.location-detail').find(Wrapper).get(1).props.visible.should.be.false();
  });

  it('should have beat visible if available and vice versa', function () {
    let allegation = f.create('Allegation', { city: 'city' });
    let wrapper = shallow(<Location allegation={ allegation }/>);
    wrapper.find('.location-detail').find(Wrapper).get(2).props.visible.should.be.true();

    allegation = f.create('Allegation', { beat: null });
    wrapper = shallow(<Location allegation={ allegation }/>);
    wrapper.find('.location-detail').find(Wrapper).get(2).props.visible.should.be.false();
  });
});
