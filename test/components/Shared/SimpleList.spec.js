import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import { Link } from 'react-router';
import constants from 'constants';

import SimpleList from 'components/Shared/SimpleList';

describe('<SimpleList />', function () {
  it('should render label', function () {

    const rows = [
      {
        label: 'Result 1',
        onClick: (() => {}).bind(undefined, {
          type: 'RESULT',
          title: 'Result 1',
          url: 'result/1'
        })
      },
      {
        label: 'Result 2',
        onClick: (() => {}).bind(undefined, {
          type: 'RESULT',
          title: 'Result 2',
          url: 'result/1'
        })
      }
    ];
    const wrapper = shallow(<SimpleList rows={ rows } />);
    const labels = wrapper.find('.label');

    labels.should.have.length(2);
    labels.at(0).text().should.eql('Result 1');
    labels.at(1).text().should.eql('Result 2');

  });

  it('should render Link tag with proper onClick() if url is provided', function () {
    const onClick1 = spy();
    const onClick2 = spy();

    const rows = [
      {
        label: 'Result 1',
        url: 'result/1',
        onClick: onClick1
      },
      {
        label: 'Result 2',
        url: 'result/2',
        onClick: onClick2
      }
    ];
    const wrapper = mount(<SimpleList rows={ rows } />);
    const links = wrapper.find(Link);

    links.should.have.length(2);

    links.at(0).text().should.eql('Result 1');
    links.at(0).prop('to').should.eql('result/1');
    links.at(0).prop('onClick').should.equal(onClick1);

    links.at(1).text().should.eql('Result 2');
    links.at(1).prop('to').should.eql('result/2');
    links.at(1).prop('onClick').should.equal(onClick2);
  });

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
