import React from 'react';
import { mount } from 'enzyme';

import OfficerSearchResult from 'components/SearchPage/OfficerSearchResult';

describe('<OfficerSearchResult />', () => {

  it('should render officers correctly', () => {
    const officers = [
      {
        name: 'John',
        url: '/officer/1',
        extraInfo: 'Badge #1'
      },
      {
        name: 'Snow',
        url: '/officer/2',
        extraInfo: 'Badge #2'
      }
    ];

    const rows = [
      {
        label: 'John',
        sublabel: 'Badge #1',
        url: '/officer/1',
        onClick: (() => {}).bind(undefined, {
          type: 'officer',
          title: 'John',
          url: '/officer/1'
        })
      },
      {
        label: 'Snow',
        sublabel: 'Badge #2',
        url: '/officer/2',
        onClick: (() => {}).bind(undefined, {
          type: 'officer',
          title: 'Snow',
          url: '/officer/2'
        })
      }
    ];

    const wrapper = mount(
      <OfficerSearchResult
        items={ officers }
        saveToRecent={ () => {} }
      />
    );

    const twoLineList = wrapper.find('TwoLineList');

    twoLineList.exists().should.be.true();
    twoLineList.prop('rows').should.be.eql(rows);
  });
});
