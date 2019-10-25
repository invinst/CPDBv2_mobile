import React from 'react';
import { shallow, mount } from 'enzyme';
import { ToastContainer } from 'react-toastify';

import MainPage from 'components/main-page';
import { spy } from 'sinon';


describe('MainPage component', function () {
  it('should render', function () {
    let wrapper = shallow(<MainPage />);
    wrapper.should.be.ok();
  });

  it('should dispatch routeChanged action on mount', function () {
    const spyRouteChanged = spy();
    const wrapper = shallow(
      <MainPage
        routeChanged={ spyRouteChanged }
        location={ { pathname: 'dummy/' } }
      />
    );
    wrapper.instance().componentDidMount();

    spyRouteChanged.calledWith({ from: '', to: 'dummy/' }).should.be.true();
  });

  it('should not render bottom padding element if not at root', function () {
    const location = { pathname: '/search/' };
    let wrapper = shallow(<MainPage location={ location }/>);
    wrapper.find('.bottom-padding').exists().should.be.false();
  });

  it('should dispatch routeChanged action when location changed', function () {
    const currentLocation = {
      pathname: 'current-url/',
    };
    const prevLocation = {
      pathname: 'prev-url/',
    };
    const prevProps = {
      location: prevLocation,
    };
    const spyRouteChanged = spy();

    const wrapper = shallow(
      <MainPage
        location={ currentLocation }
        routeChanged={ spyRouteChanged }
      />
    );

    wrapper.instance().componentDidUpdate(prevProps);
    spyRouteChanged.calledWith({ from: 'prev-url/', to: 'current-url/' }).should.be.true();
  });

  it('should not dispatch routeChaged action if location has not changed', function () {
    const currentLocation = {
      pathname: 'same-url/',
    };
    const prevLocation = {
      pathname: 'same-url/',
    };
    const prevProps = {
      location: prevLocation,
    };
    const spyRouteChanged = spy();

    const wrapper = shallow(
      <MainPage
        location={ currentLocation }
        routeChanged={ spyRouteChanged }
      />
    );

    wrapper.instance().componentDidUpdate(prevProps);
    spyRouteChanged.called.should.be.false();
  });

  it('should render ToastContainer', function () {
    const wrapper = mount(
      <MainPage
        location={ { pathname: '/' } }
      />
    );

    const toastContainer = wrapper.find(ToastContainer);
    toastContainer.props().pauseOnFocusLoss.should.be.false();
    toastContainer.props().closeButton.should.be.false();
    toastContainer.props().hideProgressBar.should.be.true();
    toastContainer.props().autoClose.should.equal(3000);
    toastContainer.props().className.should.equal('landing');
  });
});
