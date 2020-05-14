import React from 'react';
import { shallow } from 'enzyme';
import { ToastContainer } from 'react-toastify';
import { spy, stub } from 'sinon';

import config from 'config';
import App from 'components/app';
import styles from 'components/app.sass';


describe('App component', function () {
  it('should dispatch routeChanged action on mount', function () {
    const spyRouteChanged = spy();
    const wrapper = shallow(
      <App
        routeChanged={ spyRouteChanged }
        location={ { pathname: 'dummy/' } }
      />
    );
    wrapper.instance().componentDidMount();

    spyRouteChanged.calledWith({ from: '', to: 'dummy/' }).should.be.true();
  });

  it('should not render bottom padding element if not at root', function () {
    const location = { pathname: '/search/' };
    let wrapper = shallow(<App location={ location }/>);
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
      <App
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
      <App
        location={ currentLocation }
        routeChanged={ spyRouteChanged }
      />,
      { disableLifecycleMethods: true },
    );

    wrapper.instance().componentDidUpdate(prevProps);
    spyRouteChanged.called.should.be.false();
  });

  it('should render ToastContainer', function () {
    const wrapper = shallow(
      <App
        location={ { pathname: '/' } }
        appConfigRequesting={ false }
      />
    );

    const toastContainer = wrapper.find(ToastContainer);
    toastContainer.props().pauseOnFocusLoss.should.be.false();
    toastContainer.props().closeButton.should.be.false();
    toastContainer.props().hideProgressBar.should.be.true();
    toastContainer.props().autoClose.should.equal(3000);
    toastContainer.props().className.should.equal('landing');
  });

  context('enablePinboardFeature is false', function () {
    beforeEach(function () {
      stub(config.enableFeatures, 'pinboard').value(false);
    });

    it('should add pinboard-disabled class name', function () {
      const wrapper = shallow(<App appConfigRequesting={ false } />);
      wrapper.prop('className').should.containEql(styles.app).and.containEql('pinboard-disabled');
    });
  });

  context('enablePinboardFeature is true', function () {
    beforeEach(function () {
      stub(config.enableFeatures, 'pinboard').value(true);
    });

    it('should add pinboard-disabled class name', function () {
      const wrapper = shallow(<App appConfigRequesting={ false } />);
      wrapper.prop('className').should.containEql(styles.app).and.not.containEql('pinboard-disabled');
    });
  });

  context('appConfigRequesting is true', function () {
    it('should not render router root', function () {
      const wrapper = shallow(<App location={ { pathname: '/' } } appConfigRequesting={ true } />);
      wrapper.find('RouterRoot').exists().should.be.false();
      wrapper.find('ToastContainer').exists().should.be.true();
    });
  });

  context('appConfigRequesting is false', function () {
    it('should render correctly', function () {
      const wrapper = shallow(<App location={ { pathname: '/' } } appConfigRequesting={ false } />);
      wrapper.find('RouterRoot').exists().should.be.true();
      wrapper.find('ToastContainer').exists().should.be.true();
    });
  });
});
