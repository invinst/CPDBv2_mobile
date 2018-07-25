import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import CRSearchResult from 'components/search-page/cr-search-result';


describe('<CRSearchResult />', () => {

  it('should render crs correctly', () => {
    const crs = [
      { crid: '1' },
      { crid: '2' },
      { crid: '3' },
    ];

    const wrapper = shallow(
      <CRSearchResult
        items={ crs }
        saveToRecent={ () => {} }
      />
    );

    wrapper.should.be.ok();
    wrapper.find(Link).should.have.length(3);
  });

  it('should call saveToRecent when click on item', function () {
    const saveToRecentSpy = spy();
    const crs = [
      {
        crid: '1',
        url: 'url'
      }
    ];
    const wrapper = shallow(
      <CRSearchResult
        items={ crs }
        saveToRecent={ saveToRecentSpy }
      />
    );

    wrapper.find(Link).simulate('click');
    saveToRecentSpy.calledWith({
      type: 'CR',
      title: '1',
      url: 'url'
    }).should.be.true();
  });
});
