import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';

import Complainants from 'components/ComplaintPage/Complainants';

describe('Complainants component', function () {

  it('should render correctly', function () {
    const complainants = [
      { race: 'White', age: '18', gender: 'Male' },
      {}
    ];
    const wrapper = shallow(
      <Complainants
        complainants={ complainants }
      />
    );
    const title = wrapper.find('.title').text();
    const rows = wrapper.find('.row');

    title.should.equal('Complainant');
    rows.should.have.length(2);

    rows.at(0).text().should.equal('White, Male, Age 18');
    rows.at(1).text().should.equal('Unknown, Unknown');

  });

  it('should return null if complainants are unavailable', function () {
    const wrapper = shallow(
      <Complainants
        complainants={ undefined }
      />
    );

    // https://github.com/airbnb/enzyme/issues/52#issuecomment-162223843
    should(wrapper.get(0)).be.null();
  });
});
