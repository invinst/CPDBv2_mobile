import React from 'react';
import { shallow } from 'enzyme';
import CRItem from 'components/OfficerPage/OfficerTimeline/CRItem';


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

    const wrapper = shallow(
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

  describe('getFindingClass', function () {
    it('should convert to snake case', function () {
      CRItem.prototype.getFindingClass('Not Sustained').should.be.eql('not-sustained');
    });

    it('should return "unknown" if finding is not available', function () {
      CRItem.prototype.getFindingClass(undefined).should.be.eql('unknown');
    });
  });

});
