import React from 'react';
import { Route, Router, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { mountWithRouter } from 'utils/tests';
import Header from 'components/pinboard-page/header';
import IOSPeek from 'components/common/ios-peek';


describe('<Header /> of PinboardPage', function () {
  it('should render correctly', function () {
    const header = mountWithRouter(<Header />);

    header.find(Link).props().to.should.eql('/');
    header.find('.highlight').text().should.be.eql('Pinboards');

    const iosPeek = header.find(IOSPeek);
    iosPeek.prop('className').should.equal('pinboard-ios-peek');
  });

  it('should preventDefault when clicking on menu item', function () {
    const preventDefault = sinon.spy();
    const header = mount(
      <Router history={ createBrowserHistory() }>
        <Route path='/' component={ () => <Header /> } />
      </Router>
    );

    header.find('.menu-item').simulate('click', { preventDefault });
    preventDefault.should.be.calledOnce();
  });
});
