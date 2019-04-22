import React from 'react';
import { mount } from 'enzyme';

import OfficerCard from 'components/pinboard-page/cards/officer-card';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';
import RadarChart from 'components/common/radar-chart';


describe('Pinboard <OfficerCard />', function () {
  it('should render ItemUnpinButton component and body correctly', function () {
    const item = {
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    const officerCard = mount(<OfficerCard item={ item } />);

    officerCard.exists(ItemUnpinButton).should.be.true();
    officerCard.exists(RadarChart).should.be.true();

    officerCard.find('.officer-rank').text().should.equal('Officer as Detective');
    officerCard.find('.officer-name').text().should.equal('James David');
    officerCard.find('.test--officer-cr-count').text().should.equal('10 complaints');
  });
});
