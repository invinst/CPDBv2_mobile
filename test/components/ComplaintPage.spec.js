import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { mock, match } from 'sinon';
import configureStore from 'redux-mock-store';

import f from 'utils/tests/f';
import ComplaintPage from 'components/ComplaintPage';
import LoadingPage from 'components/Shared/LoadingPage';
import NotMatchedComplaintPage from 'components/ComplaintPage/NotMatchedComplaintPage';
import NotMatchedCategoryPage from 'components/ComplaintPage/NotMatchedCategoryPage';
import SearchablePageContainer from 'containers/Shared/SearchablePageContainer';
import ToggleComplaintPageContainer from 'containers/ComplaintPage/ToggleComplaintPageContainer';
import OfficerAllegationDetailContainer from 'containers/ComplaintPage/OfficerAllegationDetailContainer';
import AgainstSection from 'components/ComplaintPage/AgainstSection';
import ComplainingWitness from 'components/ComplaintPage/ComplainingWitness';
import AccompliceOfficerSection from 'components/ComplaintPage/AccompliceOfficerSection';
import InvestigatorSection from 'components/ComplaintPage/InvestigatorSection';
import Location from 'components/ComplaintPage/Location';
import HashUtil from 'utils/HashUtil';
import GaUtil from 'utils/GaUtil';


const mockStore = configureStore();
const store = mockStore({
  suggestionApp: {}
});

describe('ComplaintPage component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<ComplaintPage />);
    wrapper.should.be.ok();
  });

  it('should render LoadingPage if loading', function () {
    const wrapper = shallow(<ComplaintPage loading={ true }/>);
    wrapper.find(LoadingPage).should.have.length(1);
  });

  it('should render NotMatchedComplaintPage if not found', function () {
    const wrapper = shallow(<ComplaintPage loading={ false } found={ false }/>);
    wrapper.find(NotMatchedComplaintPage).should.have.length(1);
  });

  it('should render NotMatchedCategoryPage if not found', function () {
    const allegation = f.create('Allegation', {
      'officer_allegation_set': [
        f.create('OfficerAllegation', { cat: f.create('Category', { id: 1 }) })
      ]
    });
    const params = {
      categoryHashId: 'invalid'
    };

    const complaint = f.create('ComplaintPageData', { allegation: allegation });

    const wrapper = shallow(
      <ComplaintPage loading={ false } found={ true } params={ params } complaint={ complaint }/>
    );
    wrapper.find(NotMatchedCategoryPage).should.have.length(1);
  });

  it('should render an complaint page that\'s searchable', function () {
    const id = 1;
    const categoryHashId = HashUtil.encode(id);
    const allegation = f.create('Allegation', {
      'officer_allegation_set': [
        f.create('OfficerAllegation', { cat: f.create('Category', { id: id }) })
      ]
    });
    const params = {
      categoryHashId: categoryHashId
    };

    const complaint = f.create('ComplaintPageData', { allegation: allegation });

    const wrapper = shallow(
      <ComplaintPage loading={ false } found={ true } params={ params } complaint={ complaint }/>
    );
    wrapper.find(ToggleComplaintPageContainer).should.have.length(1);
    wrapper.find(SearchablePageContainer).should.have.length(1);
    wrapper.find(OfficerAllegationDetailContainer).should.have.length(1);
    wrapper.find(AgainstSection).should.have.length(1);
    wrapper.find(ComplainingWitness).should.have.length(1);
    wrapper.find(AccompliceOfficerSection).should.have.length(1);
    wrapper.find(InvestigatorSection).should.have.length(1);
    wrapper.find(Location).should.have.length(1);
  });

  it('should be tracked by Google Analytics when mounted', function () {
    const mockGaUtil = mock(GaUtil);
    mockGaUtil.expects('track').once()
      .withArgs('event', 'allegation', 'view_detail', match.any).returns('anything');
    mount(
      <Provider store={ store }>
        <ComplaintPage loading={ false } found={ true } getComplaint={ () => {} }/>
      </Provider>
    );
    mockGaUtil.verify();
    mockGaUtil.restore();
  });
});
