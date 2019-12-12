import React from 'react';
import { mount } from 'enzyme';

import Row from 'components/common/allegations-map/legend/row';
import LoadingSpinner from 'components/common/loading-spinner';


describe('Row component', function () {
  let wrapper;

  it('should render row correctly', function () {
    wrapper = mount(
      <Row
        ovalColor={ 'red' }
        ovalBorderColor={ 'black' }
        text={ 'Test Row' }
        number={ 20 }
        haveMarginBottom={ false }
        hovering={ false }
      />
    );
    const rowText = wrapper.find('.legend-row-text');
    rowText.at(0).text().should.eql('Test Row');
    const rowNumber = wrapper.find('.legend-row-number');
    rowNumber.at(0).text().should.eql('20');
  });

  it('should render row with loading spinner', function () {
    wrapper = mount(
      <Row
        ovalColor={ 'red' }
        ovalBorderColor={ 'black' }
        text={ 'Test Row' }
        number={ 20 }
        haveMarginBottom={ false }
        hovering={ false }
        loading={ true }
      />
    );
    wrapper.find(LoadingSpinner).should.have.length(1);
  });
});
