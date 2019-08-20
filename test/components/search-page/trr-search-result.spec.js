import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { Link } from 'react-router';

import TRRSearchResult from 'components/search-page/trr-search-result';


describe('<TRRSearchResult />', () => {

  it('should render trrs correctly', () => {
    const trrs = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ];

    const wrapper = shallow(
      <TRRSearchResult
        items={ trrs }
        saveToRecent={ () => {} }
        categoryFilter='TRR'
      />
    );

    wrapper.should.be.ok();
    wrapper.find(Link).should.have.length(3);
  });

  it('should call saveToRecent when click on item', function () {
    const saveToRecentSpy = spy();
    const trrs = [
      {
        id: '1',
        url: 'url',
      },
    ];
    const wrapper = shallow(
      <TRRSearchResult
        items={ trrs }
        saveToRecent={ saveToRecentSpy }
        categoryFilter='TRR'
      />
    );

    wrapper.find(Link).simulate('click');
    saveToRecentSpy.calledWith({
      type: 'TRR',
      title: '1',
      url: 'url',
    }).should.be.true();
  });
});
