import React from 'react';
import { mount } from 'enzyme';

import UnitSearchResult from 'components/search-page/unit-search-result';

describe('<UnitSearchResult />', () => {

  it('should render units correctly', () => {
    const units = [
      {
        text: '001',
        memberCount: 2,
        activeMemberCount: 1,
      },
      {
        text: '002',
        memberCount: 4,
        activeMemberCount: 3,
      },
    ];

    const rows = [
      {
        label: '001',
        sublabel: '2 officers, 1 active',
        // TODO: We don't have a dedicated view for Unit on mobile yet, and the provided external url (unit.url)
        // does not support mobile devices.
      },
      {
        label: '002',
        sublabel: '4 officers, 3 active',
        // TODO: We don't have a dedicated view for Unit on mobile yet, and the provided external url (unit.url)
        // does not support mobile devices.
      },
    ];

    const wrapper = mount(
      <UnitSearchResult
        items={ units }
        saveToRecent={ () => {} }
      />
    );

    const twoLineList = wrapper.find('TwoLineList');

    twoLineList.exists().should.be.true();
    twoLineList.prop('rows').should.be.eql(rows);
  });
});
