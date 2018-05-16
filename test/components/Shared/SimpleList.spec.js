import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import SimpleList from 'components/Shared/SimpleList';

describe('<SimpleList />', function () {
  it('should render div tag with proper onClick() if url is NOT provided', function () {
    const onClick1 = spy();
    const onClick2 = spy();

    const rows = [
      {
        label: 'foo',
        onClick: onClick1
      },
      {
        label: 'bar',
        onClick: onClick2
      }
    ];
    const wrapper = shallow(<SimpleList rows={ rows } />);
    const divs = wrapper.find('div.--test-simple-list-item');

    divs.should.have.length(2);

    divs.at(0).prop('onClick').should.equal(onClick1);
    divs.at(0).text().should.eql('foo');

    divs.at(1).prop('onClick').should.equal(onClick2);
    divs.at(1).text().should.eql('bar');
  });
});
