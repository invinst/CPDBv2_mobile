import React from 'react';
import { mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { stub } from 'sinon';

import { OFFICER_PAGE_TAB_NAMES } from 'constants/officer-page';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import Timeline from 'components/officer-page/tabbed-pane-section/timeline';
import Coaccusals from 'components/officer-page/tabbed-pane-section/coaccusals';
import AttachmentsTab from 'components/officer-page/tabbed-pane-section/attachments-tab';
import AllegationsMap from 'components/common/allegations-map';


describe('TabbedPaneSection component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      timeline: { data: {} },
      coaccusals: { data: {} },
      officers: { data: {} },
    },
  });

  it('should render Header and Footer with correct tab names with correct order', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <TabbedPaneSection
          currentTab='TIMELINE'
          hasCoaccusal={ true }
          hasMapMarker={ true }
          hasAttachment={ true }
        />
      </Provider>
    );

    const tabNames = wrapper.find('.tabbed-pane-tab-name');

    tabNames.should.have.length(8);
    tabNames.at(0).text().should.be.eql('TIMELINE');
    tabNames.at(1).text().should.be.eql('MAP');
    tabNames.at(2).text().should.be.eql('COACCUSALS');
    tabNames.at(3).text().should.be.eql('DOCUMENTS');
    tabNames.at(4).text().should.be.eql('TIMELINE');
    tabNames.at(5).text().should.be.eql('MAP');
    tabNames.at(6).text().should.be.eql('COACCUSALS');
    tabNames.at(7).text().should.be.eql('DOCUMENTS');
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
    tabNames.should.have.length(2);

    const headerTabName = tabNames.at(0);
    const footerTabName = tabNames.at(1);
    headerTabName.text().should.be.eql('TIMELINE');
    footerTabName.text().should.be.eql('TIMELINE');
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

  it('should render map tab', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <TabbedPaneSection currentTab={ OFFICER_PAGE_TAB_NAMES.MAP }/>
      </Provider>
    );

    wrapper.find(AllegationsMap).exists().should.be.true();
  });

  it('should call changeOfficerTab when clicking on header tab name', function () {
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

  it('should call changeOfficerTab when clicking on footer tab name', function () {
    const stubChangeOfficerTab = stub();
    const wrapper = mount(
      <Provider store={ store }>
        <TabbedPaneSection
          changeOfficerTab={ stubChangeOfficerTab }
          hasMapMarker={ true }
        />
      </Provider>
    );

    wrapper.find('.tabbed-pane-tab-name').at(3).simulate('click');
    stubChangeOfficerTab.should.be.calledWith('MAP');
  });
});
