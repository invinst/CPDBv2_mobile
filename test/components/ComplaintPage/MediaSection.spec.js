import React from 'react';
import { shallow } from 'enzyme';

import 'should';

import f from 'utils/tests/f';
import 'utils/tests/should/React';

import MediaSection from 'components/ComplaintPage/MediaSection';
import MediaCard from 'components/ComplaintPage/MediaSection/MediaCard';


describe('MediaSectionComponent', function () {

  it('should be renderable', function () {
    const wrapper = shallow(<MediaSection />);
    wrapper.should.be.ok();
  });

  it('should render nothing if there is no documents', function () {
    const wrapper = shallow(<MediaSection />);
    wrapper.html().should.be.equal('<div></div>');
  });

  it('should render list of MediaCard', function () {
    const media = f.createBatch(2, 'Media');
    const wrapper = shallow(<MediaSection media={ media } />);

    wrapper.find(MediaCard).should.have.length(2);
  });

  it('should render passed header', function () {
    const header = 'header';
    const media = f.createBatch(2, 'Media');
    const wrapper = shallow(<MediaSection media={ media } header={ header } />);

    wrapper.find('.section-title').text().should.equal(header);
  });
});
