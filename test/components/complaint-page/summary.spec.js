import React from 'react';
import { shallow } from 'enzyme';

import Summary from 'components/complaint-page/summary';

describe('Summary component', function () {
  it('should be renderable', function () {
    const instance = shallow(
      <Summary summary={ 'summary' } />
    );

    instance.find('.content').should.have.length(1);
  });

  it('should render nothing if data is empty or null', function () {
    let instance = shallow(
      <Summary />
    );

    instance.find('.content').should.have.length(0);

    instance = shallow(
      <Summary summary='' />
    );

    instance.find('.content').should.have.length(0);
  });
});
