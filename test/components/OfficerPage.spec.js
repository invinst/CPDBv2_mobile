import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { mock, match } from 'sinon';
import configureStore from 'redux-mock-store';

import OfficerPage from 'components/OfficerPage';
import LoadingPage from 'components/Shared/LoadingPage';
import NotMatchedOfficerPage from 'components/OfficerPage/NotMatchedOfficerPage';
import GaUtil from 'utils/GaUtil';


const mockStore = configureStore();
const store = mockStore({
  suggestionApp: {
    query: ''
  }
});

describe('<OfficerPage />', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<OfficerPage />);
    wrapper.should.be.ok();
  });

  it('should render LoadingPage if loading', function () {
    const wrapper = shallow(<OfficerPage loading={ true }/>);
    wrapper.find(LoadingPage).should.have.length(1)
  });

  it('should render NotMatchedOfficerPage if not found', function () {
    const wrapper = shallow(<OfficerPage loading={ false } found={ false }/>);
    wrapper.find(NotMatchedOfficerPage).should.have.length(1);
  });

  it('should be tracked by Google Analytics when mounted', function () {
    const mockGaUtil = mock(GaUtil);
    mockGaUtil.expects('track').once()
      .withArgs('event', 'officer', 'view_detail', match.any).returns('anything');
    mount(
      <Provider store={ store }>
        <OfficerPage loading={ false } found={ true } getOfficer={ () => {} }/>
      </Provider>
    );
    mockGaUtil.verify();
    mockGaUtil.restore()
  });
});
