import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { mock, match } from 'sinon';

import f from 'utils/tests/f';
import OfficerResultContainer from 'containers/Shared/SearchablePage/SearchResults/SuccessfulSearch/OfficerResultContainer';
import ComplaintResult from 'components/Shared/SearchablePage/SearchResults/SuccessfulSearch/ComplaintResult';
import SuccessfulSearch from 'components/Shared/SearchablePage/SearchResults/SuccessfulSearch';
import 'factories/SuggestionFactory';


describe('SuccessfulSearch component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<SuccessfulSearch suggestions={ [] }/>);
    wrapper.should.be.ok();
  });

  it('should render OfficerResult when getting officer result', function () {
    const suggestion = f.create('Suggestion', { resource: 'officer' });
    const wrapper = shallow(
      <SuccessfulSearch suggestions={ [suggestion] }/>
    );
    wrapper.find(OfficerResultContainer).should.have.length(1);
  });

  it('should render ComplaintResult when getting officer_allegation result', function () {
    const suggestion = f.create('Suggestion', { resource: 'officer_allegation' });
    const wrapper = shallow(
      <SuccessfulSearch suggestions={ [suggestion] }/>
    );
    wrapper.find(ComplaintResult).should.have.length(1);
  });
});
