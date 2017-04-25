import React from 'react';
import { shallow } from 'enzyme';

import Attachment from 'components/ComplaintPage/Attachment';

describe('Attachment component', function () {

  it('should render correctly', function () {
    const wrapper = shallow(
      <Attachment
        title='Documents'
        notAvailableMessage='Documents not available'
      />
    );
    const notAvailableMessage = wrapper.find('.not-available-message').text();
    const sectionTitle = wrapper.find('SectionTitle');

    notAvailableMessage.should.equal('Documents not available');
    sectionTitle.prop('title').should.equal('Documents');

  });
});
