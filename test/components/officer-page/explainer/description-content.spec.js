import React from 'react';
import { shallow } from 'enzyme';

import DescriptionContent from 'components/officer-page/radar-chart/explainer/description-content';


describe('DescriptionContent component', function () {
  it('should render content and subContent', function () {
    const wrapper = shallow(
      <DescriptionContent
        content='some content'
        subContent='some sub content'
      />
    );

    wrapper.find('.content').text().should.equal('some content');
    wrapper.find('.sub-content').text().should.equal('some sub content');
  });
});
