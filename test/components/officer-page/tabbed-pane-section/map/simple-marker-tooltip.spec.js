import React from 'react';
import { mount } from 'enzyme';

import SimpleMarkerTooltip from 'components/officer-page/tabbed-pane-section/map/simple-marker-tooltip';


describe('SimpleMarkerTooltip component', function () {
  let wrapper;

  it('should render marker tooltip correctly', function () {
    wrapper = mount(
      <SimpleMarkerTooltip
        kind={ 'TRR' }
        id={ '12345' }
        category={ 'test category' }
      />
    );
    const tooltipKindId = wrapper.find('.simple-marker-tooltip-title').at(0);
    const tooltipCategory = wrapper.find('.simple-marker-tooltip-category').at(0);

    tooltipKindId.text().should.eql('TRR 12345');
    tooltipCategory.text().should.eql('test category');
  });

  it('should go to CR detail page when clicking on', function () {
    wrapper = mount(<SimpleMarkerTooltip kind={ 'TRR' } id='123456' url='/trr/123456/' />);
    wrapper.find('.test--simple-marker-tooltip').at(0).node.href.should.containEql('/trr/123456/');
  });
});
