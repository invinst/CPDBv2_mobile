import React from 'react';
import { shallow } from 'enzyme';

import ProjectSummary from 'components/MainPage/MainPageContent/ProjectSummary';

describe('<ProjectSummary />', function () {
  it('should render', function () {
    let wrapper = shallow(<ProjectSummary />);
    wrapper.should.be.ok();
  });
});
