import React from 'react';
import { shallow } from 'enzyme';
import { EditorState } from 'draft-js';

import CarouselWrapper from 'components/landing-page/carousel-wrapper';
import HorizontalScrolling from 'components/common/horizontal-scrolling';


describe('<CarouselWrapper />', () => {
  it('should render enough content', function () {
    const titleCMSContent = EditorState.createEmpty();
    const descriptionCMSContent = EditorState.createEmpty();

    const wrapper = shallow(
      <CarouselWrapper
        title={ titleCMSContent }
        description={ descriptionCMSContent }
        embed={ true }
        className='some-classname'
        trackingContentType='someContentType'
      >
        <div className='some-children'/>
      </CarouselWrapper>
    );

    const element = wrapper.find('.some-classname.embed');
    element.find('.carousel-title').prop('content').should.eql(titleCMSContent);
    const horizontalScrolling = element.find(HorizontalScrolling);
    horizontalScrolling.prop('trackingContentType').should.eql('someContentType');
    horizontalScrolling.find('.carousel-description').prop('content').should.eql(descriptionCMSContent);
    horizontalScrolling.find('.some-children').exists().should.be.true();
  });
});
