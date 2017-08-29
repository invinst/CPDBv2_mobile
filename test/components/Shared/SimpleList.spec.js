import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import { Link } from 'react-router';
import constants from 'constants';

import SimpleList from 'components/Shared/SimpleList';

describe('<SimpleList />', function () {
  it('should render label', function () {

    const fooUrl = `${constants.FAQ_PATH}1/`;
    const barUrl = `${constants.FAQ_PATH}2/`;
    const rows = [
      {
        label: 'foo',
        onClick: (() => {}).bind(undefined, {
          type: 'FAQ',
          title: 'foo',
          url: fooUrl
        })
      },
      {
        label: 'bar',
        onClick: (() => {}).bind(undefined, {
          type: 'FAQ',
          title: 'bar',
          url: barUrl
        })
      }
    ];
    const wrapper = shallow(<SimpleList rows={ rows } />);
    const labels = wrapper.find('.label');

    labels.should.have.length(2);
    labels.at(0).text().should.eql('foo');
    labels.at(1).text().should.eql('bar');

  });

  it('should render Link tag with proper onClick() if url is provided', function () {
    const onClick1 = spy();
    const onClick2 = spy();

    const fooUrl = `${constants.FAQ_PATH}1/`;
    const barUrl = `${constants.FAQ_PATH}2/`;
    const rows = [
      {
        label: 'foo',
        url: fooUrl,
        onClick: onClick1
      },
      {
        label: 'bar',
        url: barUrl,
        onClick: onClick2
      }
    ];
    const wrapper = mount(<SimpleList rows={ rows } />);
    const links = wrapper.find(Link);

    links.should.have.length(2);

    links.at(0).text().should.eql('foo');
    links.at(0).prop('to').should.eql(fooUrl);
    links.at(0).prop('onClick').should.equal(onClick1);

    links.at(1).text().should.eql('bar');
    links.at(1).prop('to').should.eql(barUrl);
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
