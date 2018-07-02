import React from 'react';
import { shallow } from 'enzyme';
import SimpleEventItem from 'components/officer-page/officer-timeline/simple-event-item';


describe('<SimpleEventItem />', function () {

  it('should be renderable', function () {
    const wrapper = shallow(<SimpleEventItem />);
    wrapper.should.be.ok();
  });

  it('should render data', function () {
    const wrapper = shallow(
      <SimpleEventItem
        date='Jun 02, 2012'
        title='Unit Change'
        content='Assigned to Unit 54321'
      />
    );

    const text = wrapper.text();
    text.should.containEql('Unit Change');
    text.should.containEql('Jun 02, 2012');
    text.should.containEql('Assigned to Unit 54321');
  });

});
