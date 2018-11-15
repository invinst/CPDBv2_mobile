import React from 'react';
import { shallow, mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { stub } from 'sinon';

import { OFFICER_PAGE_TAB_NAMES } from 'constants/officer-page';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import Timeline from 'components/officer-page/tabbed-pane-section/timeline';
import Coaccusals from 'components/officer-page/tabbed-pane-section/coaccusals';
import AttachmentsTab from 'components/officer-page/tabbed-pane-section/attachments-tab';


describe('TabbedPaneSection component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      timeline: { data: {} },
      coaccusals: { data: {} },
    },
    popups: [],
  });

  it('should render Header with correct tab names with correct order', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <TabbedPaneSection
          currentTab='TIMELINE'
          hasCoaccusal={ true }
        />
      </Provider>
    );

    const tabNames = wrapper.find('.tabbed-pane-tab-name');

    tabNames.should.have.length(2);
    tabNames.at(0).text().should.be.eql('TIMELINE');
    tabNames.at(1).text().should.be.eql('COACCUSALS');
  });

  it('should hide the tabs with no data', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <TabbedPaneSection
          currentTab='TIMELINE'
          hasCoaccusal={ false }
        />
      </Provider>
    );

    const tabNames = wrapper.find('.tabbed-pane-tab-name');

    tabNames.should.have.length(1);
    tabNames.at(0).text().should.be.eql('TIMELINE');
  });

  it('should render timeline tab', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <TabbedPaneSection currentTab={ OFFICER_PAGE_TAB_NAMES.TIMELINE }/>
      </Provider>
    );

    wrapper.find(Timeline).exists().should.be.true();
  });

  it('should render coaccusals tab', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <TabbedPaneSection currentTab={ OFFICER_PAGE_TAB_NAMES.COACCUSALS } hasCoaccusal={ true } />
      </Provider>
    );

    wrapper.find(Coaccusals).exists().should.be.true();
  });

  it('should render attachments tab', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <TabbedPaneSection currentTab={ OFFICER_PAGE_TAB_NAMES.ATTACHMENTS }/>
      </Provider>
    );

    wrapper.find(AttachmentsTab).exists().should.be.true();
  });

  it('should call changeOfficerTab when clicking tab name', function () {
    const stubChangeOfficerTab = stub();
    const wrapper = mount(
      <Provider store={ store }>
        <TabbedPaneSection
          changeOfficerTab={ stubChangeOfficerTab }
          hasCoaccusal={ true }
        />
      </Provider>
    );

    wrapper.find('.tabbed-pane-tab-name').at(1).simulate('click');
    stubChangeOfficerTab.should.be.calledWith('COACCUSALS');
  });
});
