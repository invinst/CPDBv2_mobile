import React from 'react';
import { mount } from 'enzyme';

import MarkerTooltip from 'components/common/allegations-map/marker-tooltip';


describe('MarkerTooltip component', function () {
  let wrapper;

  it('should render marker tooltip correctly', function () {
    wrapper = mount(
      <MarkerTooltip
        date={ 'Sep, 23, 2006' }
        category={ 'test category' }
      />
    );
    const tooltipDate = wrapper.find('.marker-tooltip-date').at(0);
    const tooltipCategory = wrapper.find('.marker-tooltip-category').at(0);
    tooltipDate.text().should.eql('Sep, 23, 2006');
    tooltipCategory.text().should.eql('test category');
  });

  it('should go to CR detail page when clicking on', function () {
    wrapper = mount(<MarkerTooltip url='/complaint/123456/' />);
    wrapper.find('a').prop('href').should.containEql('/complaint/123456/');
  });
});
