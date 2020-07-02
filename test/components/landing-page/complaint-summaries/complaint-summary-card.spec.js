import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import ComplaintSummaryCard from 'components/landing-page/complaint-summaries/complaint-summary-card';
import ItemPinButton from 'components/common/item-pin-button';
import { PINBOARD_PAGE } from 'constants';

describe('<ComplaintSummaryCard />', function () {
  it('should render enough contents', function () {
    const allegation = {
      crid: '123456',
      incidentDate: 'Jan 23, 2000',
      summary: 'Lorem ipsum',
      isPinned: true,
    };
    const wrapper = shallow(<ComplaintSummaryCard allegation={ allegation } />);
    const element = wrapper.find(Link);
    element.prop('to').should.eql('/complaint/123456/');
    element.find('.incident-date').text().should.eql('Jan 23, 2000');
    const summary = element.find('.complaint-summary');
    summary.text().should.eql('Lorem ipsum');
    summary.find('.gradient').exists().should.be.true();

    const itemPinButton = wrapper.find(ItemPinButton);
    itemPinButton.props().item.should.eql(
      {
        type: PINBOARD_PAGE.PINNED_ITEM_TYPES.CR,
        id: allegation.crid,
        isPinned: allegation.isPinned,
      }
    );
  });
});
