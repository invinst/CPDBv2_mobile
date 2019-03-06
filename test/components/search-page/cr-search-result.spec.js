import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import CRSearchResult from 'components/search-page/cr-search-result';


describe('<CRSearchResult />', () => {

  it('should render crs correctly', () => {
    const crs = [
      {
        crid: '1027271',
        url: '/complaint/1027271/',
        category: 'Use Of Force',
        incidentDate: '06/13/2009'
      },
      {
        crid: '1049273',
        url: '/complaint/1049273/',
        category: 'Domestic',
        incidentDate: '10/13/2011'
      }
    ];

    const wrapper = shallow(
      <CRSearchResult
        items={ crs }
        saveToRecent={ () => {} }
        categoryFilter='CR'
      />
    );

    wrapper.should.be.ok();
    const links = wrapper.find(Link);
    links.should.have.length(2);

    const firstLink = links.at(0);
    firstLink.prop('to').should.eql('/complaint/1027271/');
    firstLink.find('.item-id').text().should.eql('CRID 1027271 • 06/13/2009');
    firstLink.find('.item-type').text().should.eql('Use Of Force');

    const secondLink = links.at(1);
    secondLink.prop('to').should.eql('/complaint/1049273/');
    secondLink.find('.item-id').text().should.eql('CRID 1049273 • 10/13/2011');
    secondLink.find('.item-type').text().should.eql('Domestic');
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
        categoryFilter='CR'
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
