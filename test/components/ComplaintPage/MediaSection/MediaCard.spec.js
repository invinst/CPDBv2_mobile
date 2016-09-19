import React from 'react';
import { shallow } from 'enzyme';

import sinon from 'sinon';
import 'should';

import f from 'utils/tests/f'

import MediaCard from 'components/ComplaintPage/MediaSection/MediaCard';


describe('MediaCardComponent', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<MediaCard />);
    wrapper.should.be.ok();
  });

  it('should render media title', function () {
    var media = f.create('Media', {'title': 'title'});
    const wrapper = shallow(<MediaCard item={ media } />);
    wrapper.find('.media-title').text().should.containEql('title');
  });

  it('should render icon class based on media type', function () {
    let media = f.create('Media', {'file_type': 'document'});
    let wrapper = shallow(<MediaCard item={ media } />);
    wrapper.find('document-icon').should.be.ok();

    media = f.create('Media', {'file_type': 'audio'});
    wrapper = shallow(<MediaCard item={ media } />);
    wrapper.find('audio-icon').should.be.ok();

    media = f.create('Media', {'file_type': 'video'});
    wrapper = shallow(<MediaCard item={ media } />);
    wrapper.find('video-icon').should.be.ok();
  });
});
