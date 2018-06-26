import React from 'react';
import { shallow } from 'enzyme';

import Arrow from 'components/shared/arrow';

describe('<Arrow />', function () {
  it('should render gray "down" arrow if no props are provided', function () {
    const wrapper = shallow(<Arrow />);

    wrapper.prop('style').transform.should.eql('rotate(0deg)');
    wrapper.find('path[fill="#C7C7CC"]').exists().should.be.true();
  });

  it('should render blue arrow correctly', function () {
    const wrapper = shallow(<Arrow color='blue' />);

    wrapper.find('path[fill="#005EF4"]').exists().should.be.true();
  });

  describe('arrow directions', function () {
    const cases = [
      ['up', '180deg'],
      ['down', '0deg'],
      ['left', '90deg'],
      ['right', '-90deg']
    ];

    cases.forEach(function ([direction, rotation]) {
      it(`should render "${direction}" arrow correctly`, function () {
        const wrapper = shallow(<Arrow direction={ direction }/>);

        wrapper.prop('style').transform.should.eql(`rotate(${rotation})`);
      });
    });

  });
});
