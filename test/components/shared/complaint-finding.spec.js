import React from 'react';
import { shallow } from 'enzyme';

import ComplaintFinding from 'components/shared/complaint-finding';

describe('ComplaintFinding component', function () {
  it('should render text correctly', function () {
    let wrapper = shallow(<ComplaintFinding finding='Sustained' />);
    wrapper.text().should.eql('Sustained');
    wrapper.hasClass('sustained').should.be.true();
  });

  describe('getFindingClass', function () {
    it('should convert to snake case', function () {
      ComplaintFinding.prototype.getFindingClass('Not Sustained').should.be.eql('not-sustained');
    });

    it('should return "unknown" if finding is not available', function () {
      ComplaintFinding.prototype.getFindingClass(undefined).should.be.eql('unknown');
    });
  });
});
