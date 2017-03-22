import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';

import MainPage from 'components/MainPage';
import MainPageContentContainer from 'containers/MainPage/MainPageContentContainer';
import { spy, stub } from 'sinon';
import * as NavigationUtil from 'utils/NavigationUtil';


describe('MainPage component', function () {
  it('should render', function () {
    let wrapper = shallow(<MainPage />);
    wrapper.should.be.ok();
  });

  it('should render MainPageContentContainer as subcomponents', function () {
    let wrapper = shallow(<MainPage />);
    wrapper.find(MainPageContentContainer).should.have.length(1);
  });

  it('should fetch suggested search items when mounted', function () {
    const spyFetch = spy();
    const wrapper = shallow(
      <MainPage fetchSuggestedSearchItems={ spyFetch }/>
    );

    wrapper.instance().componentDidMount();
    spyFetch.calledOnce.should.be.true();
  });

  it('should scroll to top when location changed', function () {
    const currentLocation = {
      pathname: '/current-url'
    };
    const prevLocation = {
      pathname: '/prev-url'
    };
    const prevProps = {
      location: prevLocation
    };
    const wrapper = shallow(
      <MainPage location={ currentLocation }/>
    );
    const mockInstantScrollToTop = stub(NavigationUtil, 'instantScrollToTop');

    wrapper.instance().componentDidUpdate(prevProps);
    mockInstantScrollToTop.calledOnce.should.be.true();

    mockInstantScrollToTop.restore();
  });

  it('should not scroll to top if location has not changed', function () {
    const currentLocation = {
      pathname: '/current-url'
    };
    const prevProps = {
      location: currentLocation
    };
    const wrapper = shallow(
      <MainPage location={ currentLocation }/>
    );
    const mockInstantScrollToTop = stub(NavigationUtil, 'instantScrollToTop');

    wrapper.instance().componentDidUpdate(prevProps);
    mockInstantScrollToTop.calledOnce.should.be.false();

    mockInstantScrollToTop.restore();
  });
});
