import React from 'react';
import { shallow } from 'enzyme';

import RadarArea from 'components/common/RadarChart/RadarArea';


describe('RadarArea component', function () {
  const rPoints = [{
    angle: 1,
    r: 2,
    value: 10.99,
  }, {
    angle: 2,
    r: 1,
    value: 20.11,
  }, {
    angle: 1.5,
    r: 1.5,
    value: 99.99,
  }];

  it('should be renderable', () => {
    shallow(<RadarArea />).should.be.ok();
  });

  it('should render if data provided', function () {
    const wrapper = shallow(
      <RadarArea rPoints={ rPoints }/>
    );
    wrapper.find('.radar-wrapper').exists().should.be.true();
    wrapper.find('.radar-stroke').exists().should.be.true();
  });

  it('should hide stroke if drawStroke is false', function () {
    const wrapper = shallow(
      <RadarArea rPoints={ rPoints } drawStroke={ false }/>
    );
    wrapper.find('.radar-stroke').exists().should.be.false();
  });

  it('should add extra strokeWidth style if strokeWidth is defined', function () {
    const wrapper = shallow(
      <RadarArea rPoints={ rPoints } drawStroke={ true } strokeWidth={ 3 }/>
    );
    wrapper.find('.radar-stroke').prop('style').strokeWidth.should.equal(3);
  });

  it('should not display radar area and stroke when rPoints is not valid', () => {
    const wrapper = shallow(
      <RadarArea rPoints={ [
        { angle: 0, r: NaN },
        { angle: 0, r: 12 },
        { angle: 12, r: 12.2 }
      ] }
      />
    );
    wrapper.find('.radar-wrapper').exists().should.be.true();
    wrapper.find('.radar-stroke').exists().should.be.false();
  });
});
