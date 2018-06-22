import React from 'react';
import { shallow } from 'enzyme';

import CoaccusedCard from 'components/complaint-page/accused-officers/coaccused-card';


describe('CoaccusedCard component', function () {
  it('should be renderable', function () {
    shallow(<CoaccusedCard />).should.be.ok();
  });
});
