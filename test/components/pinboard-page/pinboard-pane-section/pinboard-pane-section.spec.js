import React from 'react';
import { mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { stub } from 'sinon';

import constants from 'constants';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import { AnimatedSocialGraphWithSpinner } from 'components/common/animated-social-graph';
import { AllegationsMapWithSpinner } from 'components/common/allegations-map';


describe('PinboardPaneSection component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    pinboardPage: {
      graphData: { requesting: false, data: {} },
      geographicData: { requesting: false, data: [] },
    },
  });
  let wrapper;

  it('should render Header with correct tab names with correct order', function () {
    wrapper = mount(
      <Provider store={ store }>
        <PinboardPaneSection
          currentTab='NETWORK'
          hasMapMarker={ true }
        />
      </Provider>
    );

    const tabNames = wrapper.find('.pinboard-pane-tab-name');

    tabNames.should.have.length(2);
    tabNames.at(0).text().should.be.eql('Network');
    tabNames.at(1).text().should.be.eql('Geographic');

    const activeTab = wrapper.find('.active');
    activeTab.at(0).text().should.be.eql('Network');
  });

  it('should render correct active tab', function () {
    wrapper = mount(
      <Provider store={ store }>
        <PinboardPaneSection
          currentTab='GEOGRAPHIC'
          hasMapMarker={ true }
        />
      </Provider>
    );

    const tabNames = wrapper.find('.pinboard-pane-tab-name');

    tabNames.should.have.length(2);
    tabNames.at(0).text().should.be.eql('Network');
    tabNames.at(1).text().should.be.eql('Geographic');

    const activeTab = wrapper.find('.active');
    activeTab.at(0).text().should.be.eql('Geographic');
  });

  it('should hide the tabs with no data', function () {
    wrapper = mount(
      <Provider store={ store }>
        <PinboardPaneSection
          currentTab='NETWORK'
          hasMapMarker={ false }
        />
      </Provider>
    );

    const tabNames = wrapper.find('.pinboard-pane-tab-name');

    tabNames.should.have.length(1);
    tabNames.at(0).text().should.be.eql('Network');
  });

  it('should render network tab', function () {
    wrapper = mount(
      <Provider store={ store }>
        <PinboardPaneSection currentTab={ constants.PINBOARD_PAGE_TAB_NAMES.NETWORK }/>
      </Provider>
    );

    wrapper.find(AnimatedSocialGraphWithSpinner).should.have.length(1);
  });

  it('should render geographic tab', function () {
    wrapper = mount(
      <Provider store={ store }>
        <PinboardPaneSection currentTab={ constants.PINBOARD_PAGE_TAB_NAMES.GEOGRAPHIC }/>
      </Provider>
    );

    wrapper.find(AllegationsMapWithSpinner).should.have.length(1);
  });

  it('should call changePinboardTab when clicking tab name', function () {
    const stubChangePinboardTab = stub();
    wrapper = mount(
      <Provider store={ store }>
        <PinboardPaneSection
          changePinboardTab={ stubChangePinboardTab }
          hasMapMarker={ true }
        />
      </Provider>
    );

    const geographicTab = wrapper.find('.pinboard-pane-tab-name').at(1);
    geographicTab.simulate('click');

    stubChangePinboardTab.should.be.calledWith('GEOGRAPHIC');
  });
});
