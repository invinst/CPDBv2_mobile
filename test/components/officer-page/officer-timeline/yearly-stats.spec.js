import React from 'react';
import { shallow } from 'enzyme';
import YearlyStats from 'components/officer-page/officer-timeline/yearly-stats';


describe('<YearlyStats />', function () {

  it('should be renderable', function () {
    const wrapper = shallow(<YearlyStats />);
    wrapper.should.be.ok();
  });

  it('should render data', function () {
    const wrapper = shallow(
      <YearlyStats
        year='2012'
        crCount='11'
        trrCount='2'
        salary='$99999.99'
      />
    );

    const text = wrapper.text();
    text.should.containEql('2012');
    text.should.containEql('CRs11');
    text.should.containEql('TRRs2');
    text.should.containEql('Salary$99999.99');
  });

});
