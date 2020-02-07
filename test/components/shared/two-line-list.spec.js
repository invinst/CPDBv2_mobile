import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Link } from 'react-router-dom';

import TwoLineList from 'components/shared/two-line-list';

describe('<TwoLineList />', function () {
  it('should render label and sublabel', function () {
    const rows = [
      {
        label: 'John',
        sublabel: 'Badge #1',
      },
      {
        label: 'Snow',
        sublabel: 'Badge #2',
      },
    ];
    const wrapper = shallow(<TwoLineList rows={ rows } />);

    const labels = wrapper.find('.label');
    labels.should.have.length(2);
    labels.at(0).text().should.eql('John');
    labels.at(1).text().should.eql('Snow');

    const sublabels = wrapper.find('.sublabel');
    sublabels.should.have.length(2);
    sublabels.at(0).text().should.eql('Badge #1');
    sublabels.at(1).text().should.eql('Badge #2');
  });

  it('should render Link tag with proper onClick() if url is provided', function () {
    const onClick1 = sinon.spy();
    const onClick2 = sinon.spy();

    const rows = [
      {
        label: 'John',
        sublabel: 'Badge #1',
        url: '/officer/1/john/',
        onClick: onClick1,
      },
      {
        label: 'Snow',
        sublabel: 'Badge #2',
        url: '/officer/2/snow/',
        onClick: onClick2,
      },
    ];
    const wrapper = mount(<TwoLineList rows={ rows } />);

    const links = wrapper.find(Link);
    links.should.have.length(2);

    links.at(0).text().should.eql('JohnBadge #1');
    links.at(0).prop('to').should.eql('/officer/1/john/');
    links.at(0).prop('onClick').should.equal(onClick1);

    links.at(1).text().should.eql('SnowBadge #2');
    links.at(1).prop('to').should.eql('/officer/2/snow/');
    links.at(1).prop('onClick').should.equal(onClick2);
  });

  it('should render div tag with proper onClick() if url is NOT provided', function () {
    const onClick1 = sinon.spy();
    const onClick2 = sinon.spy();

    const rows = [
      {
        label: 'John',
        sublabel: 'Badge #1',
        onClick: onClick1,
      },
      {
        label: 'Snow',
        sublabel: 'Badge #2',
        onClick: onClick2,
      },
    ];
    const wrapper = shallow(<TwoLineList rows={ rows } />);

    const divs = wrapper.find('div.test--two-line-item');
    divs.should.have.length(2);
    divs.at(0).prop('onClick').should.equal(onClick1);
    divs.at(0).text().should.eql('JohnBadge #1');
    divs.at(1).prop('onClick').should.equal(onClick2);
    divs.at(1).text().should.eql('SnowBadge #2');
  });

  it('should render icon with correct color if provided', function () {
    const rows = [
      {
        label: 'John',
        sublabel: 'Badge #1',
        color: 'red',
      },
      {
        label: 'Snow',
        sublabel: 'Badge #2',
        color: 'blue',
      },
    ];
    const wrapper = shallow(<TwoLineList rows={ rows } />);

    const items = wrapper.find('.test--two-line-item');
    items.should.have.length(2);
    items.at(0).text().should.eql('JohnBadge #1');
    items.at(0).find('.icon').prop('style').backgroundColor.should.eql('red');
    items.at(1).text().should.eql('SnowBadge #2');
    items.at(1).find('.icon').prop('style').backgroundColor.should.eql('blue');
  });
});
