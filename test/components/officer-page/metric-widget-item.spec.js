import React from 'react';
import { shallow } from 'enzyme';

import MetricWidgetItem from 'components/officer-page/metric-widget-item';


describe('MetricWidgetItem component', function () {

  it('should show correct info', function () {
    const wrapper = shallow(
      <MetricWidgetItem value={ 23 } name='Allegations' description='something' hightlight={ false }/>
    );

    wrapper.find('.value').text().should.containEql('23');
    wrapper.find('.name').text().should.containEql('Allegations');
    wrapper.find('.description').text().should.containEql('something');
  });
});
