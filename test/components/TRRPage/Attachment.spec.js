import React from 'react';
import { shallow } from 'enzyme';

import Attachment from 'components/TRRPage/Attachment';


describe('<Attachment />', function () {

  it('should be render enough contents', function () {
    const wrapper = shallow(<Attachment/>);

    wrapper.find('.request-document-button').text().should.equal('Request Documents');
    wrapper.find('.subtitle').text().should.equal('May contain graphic content');
  });
});
