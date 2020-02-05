import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import DescriptionContent from 'components/officer-page/radar-chart/explainer/description-content';
import CMSContent from 'components/common/cms-content';


describe('DescriptionContent component', function () {
  it('should render content and subContent', function () {
    const contentSpy = sinon.spy();
    const subContentSpy = sinon.spy();
    const wrapper = shallow(
      <DescriptionContent
        content={ contentSpy }
        subContent={ subContentSpy }
      />
    );
    const cmsContents = wrapper.find(CMSContent);

    cmsContents.at(0).prop('content').should.equal(contentSpy);
    cmsContents.at(1).prop('content').should.equal(subContentSpy);
  });
});
