import React from 'react';
import { shallow } from 'enzyme';

import SectionTitle from 'components/ComplaintPage/SectionTitle';

describe('SectionTitle component', function () {

  it('should render correctly', function () {
    const wrapper = shallow(
      <SectionTitle
        title='A section'
      />
    );
    wrapper.text().should.equal('A section');

  });
});
