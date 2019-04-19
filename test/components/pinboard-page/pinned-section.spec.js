import React from 'react';
import { mount } from 'enzyme';

import PinnedSection from 'components/pinboard-page/pinned-section';
import PinnedType from 'components/pinboard-page/pinned-type';


describe('<PinnedSection />', function () {
  it('should render PinnedType of OFFICER, CR, TRR', function () {
    const itemsByTypes = {
      'OFFICER': ['1'],
      'CR': ['abc'],
      'TRR': ['1'],
      'NOT_A_TYPE': ['1'],
    };
    const pinnedSection = mount(<PinnedSection itemsByTypes={ itemsByTypes } />);

    const pinnedTypes = pinnedSection.find(PinnedType);
    pinnedTypes.should.have.length(3);
    pinnedTypes.get(0).props.type.should.eql('OFFICER');
    pinnedTypes.get(1).props.type.should.eql('CR');
    pinnedTypes.get(2).props.type.should.eql('TRR');
  });

  it('should not render PinnedType of OFFICER, CR, TRR if not exist', function () {
    const pinnedSection = mount(<PinnedSection itemsByTypes={ {} } />);

    const pinnedTypes = pinnedSection.find(PinnedType);
    pinnedTypes.should.have.length(0);
  });

  it('should not render PinnedType of OFFICER if its length is 0', function () {
    const itemsByTypes = {
      'OFFICER': [],
      'CR': [],
      'TRR': [],
    };
    const pinnedSection = mount(<PinnedSection itemsByTypes={ itemsByTypes } />);

    const pinnedTypes = pinnedSection.find(PinnedType);
    pinnedTypes.should.have.length(0);
  });
});
