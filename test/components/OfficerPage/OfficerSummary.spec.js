import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { mock, match } from 'sinon';
import configureStore from 'redux-mock-store';

import OfficerSummary from 'components/OfficerPage/OfficerSummary';
import LoadingPage from 'components/Shared/LoadingPage';
import NotMatchedOfficerPage from 'components/OfficerPage/NotMatchedOfficerPage';
import GaUtil from 'utils/GaUtil';


const mockStore = configureStore();
const store = mockStore({
  suggestionApp: {
    query: ''
  }
});

describe('<OfficerSummary />', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<OfficerSummary />);
    wrapper.should.be.ok();
  });

  it('should render LoadingPage if loading', function () {
    const wrapper = shallow(
      <OfficerSummary
        loading={ true }
        found={ false }
        />
    );
    wrapper.find(LoadingPage).should.have.length(1);
  });

  it('should render NotMatchedOfficerPage if not found', function () {
    const wrapper = shallow(
      <OfficerSummary
        loading={ false }
        found={ false }
        getOfficerSummary={ () => {} }
        />
    );
    wrapper.find(NotMatchedOfficerPage).should.have.length(1);
  });

  it('should be tracked by Google Analytics when mounted', function () {
    const mockGaUtil = mock(GaUtil);
    mockGaUtil.expects('track').once()
      .withArgs('event', 'officer', 'view_detail', match.any).returns('anything');
    mount(
      <Provider store={ store }>
        <OfficerSummary loading={ false } found={ false } getOfficerSummary={ () => {} }/>
      </Provider>
    );
    mockGaUtil.verify();
    mockGaUtil.restore();
  });
});
