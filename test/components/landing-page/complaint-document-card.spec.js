import React from 'react';
import { shallow } from 'enzyme';

import ComplaintDocumentCard from 'components/landing-page/complaint-document-card';

describe('<ComplaintDocumentCard />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<ComplaintDocumentCard allegation={ {} } />);
    wrapper.should.be.ok();
  });
});
