import React from 'react';
import { shallow } from 'enzyme';
import { mock, match } from 'sinon';

import f from 'utils/tests/f';
import GaUtil from 'utils/GaUtil';
import AppHistory from 'utils/History';
import OfficerResult from 'components/Shared/SearchablePage/SearchResults/SuccessfulSearch/OfficerResult';
import OfficerCard from 'components/Shared/OfficerCard';
import 'factories/SuggestionFactory';


describe('OfficerResult component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<OfficerResult suggestions={ [] }/>);
    wrapper.should.be.ok();
  });

  it('should render officer card', function () {
    const suggestions = f.createBatch(2, 'Suggestion');
    const wrapper = shallow(
      <OfficerResult suggestions={ suggestions }/>
    );
    wrapper.find(OfficerCard).should.have.length(2);
  });

  it('should send google analytic event on click suggestion item', function () {
    const mockGaUtil = mock(GaUtil);
    const mockAppHistory = mock(AppHistory);
    const suggestion = f.create('Suggestion');
    mockGaUtil.expects('track').once()
      .withArgs('event', 'filter', 'officer_allegation', match.any).returns('anything');
    mockAppHistory.expects('push').once();
    const wrapper = shallow(<OfficerResult suggestions={ [suggestion] } reset={ () => {} }/>);

    wrapper.find('.suggestion-list .officer').first().simulate('click');
    mockGaUtil.verify();
    mockAppHistory.verify();
    mockAppHistory.restore();
    mockGaUtil.restore();
  });
});
