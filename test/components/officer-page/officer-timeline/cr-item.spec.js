import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router';
import CRItem from 'components/officer-page/officer-timeline/cr-item';
import constants from 'constants';


describe('<CRItem />', function () {

  it('should be renderable', function () {
    const wrapper = shallow(<CRItem />);
    wrapper.should.be.ok();
  });

  it('should render CR data', function () {
    const result = {
      category: 'Use of Force',
      coaccused: 1,
      crid: '1044088',
      finding: 'Not Sustained',
      subcategory: 'Excessive Force / On Duty - No Injury',
      date: 'Oct 22, 2014'
    };

    const wrapper = mount(
      <CRItem result={ result }/>
    );

    const text = wrapper.text();
    text.should.containEql('CR 1044088');
    text.should.containEql('Oct 22, 2014');
    text.should.containEql('Use of Force');
    text.should.containEql('Excessive Force / On Duty - No Injury');
    text.should.containEql('Not Sustained');
    text.should.containEql('1 of 1 Coaccused');
  });

  it('should link to complaint page', function () {
    const result = {
      crid: '1044088'
    };

    const wrapper = shallow(
      <CRItem result={ result } officerId={ 11 }/>
    );

    wrapper.type().should.equal(Link);
    wrapper.prop('to').should.eql(`${constants.COMPLAINT_PATH}1044088/11/`);
  });

});