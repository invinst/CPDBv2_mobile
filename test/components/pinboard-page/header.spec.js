import React from 'react';
import { Link, createMemoryHistory, Route, Router } from 'react-router';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import Header from 'components/pinboard-page/header';
import IOSPeek from 'components/common/ios-peek';


describe('<Header /> of PinboardPage', function () {
  it('should render correctly', function () {
    const header = mount(<Header />);

    header.find(Link).props().to.should.eql('/');
    header.find('.highlight').text().should.be.eql('Pinboard');

    const iosPeek = header.find(IOSPeek);
    iosPeek.prop('className').should.equal('pinboard-ios-peek');
  });

  it('should preventDefault when clicking on menu item', function () {
    const preventDefault = spy();
    const header = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ () => <Header /> } />
      </Router>
    );

    header.find('.menu-item').simulate('click', { preventDefault });
    preventDefault.should.be.calledOnce();
  });
});
