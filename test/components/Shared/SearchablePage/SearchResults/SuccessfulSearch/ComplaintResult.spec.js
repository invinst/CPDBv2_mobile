import React from 'react';
import { shallow } from 'enzyme';
import { mock, match } from 'sinon';

import f from 'utils/tests/f';
import GaUtil from 'utils/GaUtil';
import ComplaintResult from 'components/Shared/SearchablePage/SearchResults/SuccessfulSearch/ComplaintResult';
import OfficerAllegationItemContainer from 'containers/Shared/OfficerAllegationItemContainer';
import 'factories/SuggestionFactory';


describe('ComplaintResult component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<ComplaintResult suggestions={ [f.create('Suggestion')] }/>);
    wrapper.should.be.ok();
  });

  it('should render 2 groups of different category', function () {
    const cat1 = f.create('Category', { id: 1 });
    const cat2 = f.create('Category', { id: 2 });
    const suggestion = f.create('Suggestion', {
      meta: {
        'officer_allegations': [
          f.create('OfficerAllegation', { cat: cat1 }),
          f.create('OfficerAllegation', { cat: cat2 })
        ]
      }
    });
    const wrapper = shallow(
      <ComplaintResult suggestions={ [suggestion] }/>
    );
    wrapper.find(OfficerAllegationItemContainer).should.have.length(2);
  });

  it('should send google analytic event on click suggestion item', function () {
    const mockGaUtil = mock(GaUtil);
    const suggestion = f.create('Suggestion', {
      meta: {
        'officer_allegations': [
          f.create('OfficerAllegation')
        ]
      }
    });
    mockGaUtil.expects('track').once()
      .withArgs('event', 'filter', 'officer_allegation', match.any).returns('anything');
    const wrapper = shallow(<ComplaintResult suggestions={ [suggestion] }/>);

    wrapper.find('.suggestion-list li').first().simulate('click');
    mockGaUtil.verify();
    mockGaUtil.restore();
  });
});
