import React from 'react';
import { shallow } from 'enzyme';

import ContentRow from 'components/ComplaintPage/ContentRow';

describe('ContentRow component', function () {

  it('should render correctly', function () {
    const wrapper = shallow(
      <ContentRow
        name='A row'
        content='The content'
      />
    );
    const name = wrapper.find('.name').text();
    const content = wrapper.find('.content').text();

    name.should.equal('A row');
    content.should.equal('The content');

  });
});
