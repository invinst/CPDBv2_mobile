import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

import SearchResults from 'components/Shared/SearchablePage/SearchResults';
import LoadingPage from 'components/Shared/LoadingPage';
import FailedSearch from 'components/Shared/SearchablePage/SearchResults/FailedSearch';
import SuccessfulSearch from 'components/Shared/SearchablePage/SearchResults/SuccessfulSearch';

describe('<SearchResults />', function () {
  it('should be renderable', function () {
    let wrapper = shallow(<SearchResults />);
    wrapper.should.be.ok();
  });

  it('should should render LoadingPage if isRequesting', function () {
    let wrapper = shallow(<SearchResults isRequesting={ true }/>);
    wrapper.find(LoadingPage).should.have.length(1);
  });

  it('should should render FailedSearch if have query and isSuccess', function () {
    let wrapper = shallow(<SearchResults isRequesting={ false } isSuccess={ false } />);
    wrapper.find(FailedSearch).should.have.length(1);
  });

  it('should should render SuccessfulSearch if have query and isSuccess', function () {
    let wrapper = shallow(<SearchResults isRequesting={ false } isSuccess={ true } query={ 'something not null' } iSearchFocused={ true } />);
    wrapper.find(SuccessfulSearch).should.have.length(1);
  });
});
