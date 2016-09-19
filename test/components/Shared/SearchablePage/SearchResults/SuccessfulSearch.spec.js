import React from 'react';
import { shallow } from 'enzyme';

import f from 'utils/tests/f';
import OfficerResultContainer
  from 'containers/Shared/SearchablePage/SearchResults/SuccessfulSearch/OfficerResultContainer';
import ComplaintResultContainer
  from 'containers/Shared/SearchablePage/SearchResults/SuccessfulSearch/ComplaintResultContainer';
import SuccessfulSearch from 'components/Shared/SearchablePage/SearchResults/SuccessfulSearch';
import 'factories/SuggestionFactory';


describe('SuccessfulSearch component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<SuccessfulSearch suggestions={ [] }/>);
    wrapper.should.be.ok();
  });

  it('should render OfficerResultContainer when getting officer result', function () {
    const suggestion = f.create('Suggestion', { resource: 'officer' });
    const wrapper = shallow(
      <SuccessfulSearch suggestions={ [suggestion] }/>
    );
    wrapper.find(OfficerResultContainer).should.have.length(1);
  });

  it('should render ComplaintResultContainer when getting officer_allegation result', function () {
    const suggestion = f.create('Suggestion', { resource: 'officer_allegation' });
    const wrapper = shallow(
      <SuccessfulSearch suggestions={ [suggestion] }/>
    );
    wrapper.find(ComplaintResultContainer).should.have.length(1);
  });
});
