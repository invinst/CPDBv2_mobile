import React from 'react';
import { shallow } from 'enzyme';
import ClampLines from 'react-clamp-lines';

import Attachment from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint/attachment';


describe('Attachment component', function () {
  const attachment = {
    title: 'CRID 1071970 OCIR 2 of 3',
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
    fileType: 'document'
  };

  it('should render content correctly', function () {
    const wrapper = shallow(<Attachment attachment={ attachment } />);

    const link = wrapper.find('a');
    link.prop('href').should.eql('https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html');
    link.prop('target').should.eql('_blank');

    const previewImage = wrapper.find('.attachment-thumbnail');
    previewImage.prop('style').backgroundImage.should.containEql(
      'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif'
    );

    const title = wrapper.find(ClampLines);
    title.prop('className').should.eql('attachment-title');
    title.prop('text').should.eql('CRID 1071970 OCIR 2 of 3');
    title.prop('lines').should.eql('2');
    title.prop('ellipsis').should.eql('...');
  });

  it('should render document preview image correctly', function () {
    const wrapper = shallow(<Attachment attachment={ attachment }/>);
    const previewImage = wrapper.find('.attachment-thumbnail');
    previewImage.prop('className').should.containEql('document');
    previewImage.prop('style').backgroundImage.should.containEql(
      'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif'
    );
  });

  it('should render video preview image correctly', function () {
    const videoAttachment = {
      title: 'Video Clip',
      url: 'https://player.vimeo.com/video/165206078',
      previewImageUrl: '/src/img/ic-video.svg',
      fileType: 'video'
    };

    const wrapper = shallow(<Attachment attachment={ videoAttachment }/>);
    const previewImage = wrapper.find('.attachment-thumbnail');
    previewImage.prop('className').should.containEql('video');
    previewImage.prop('style').backgroundImage.should.containEql('/src/img/ic-video.svg');
  });

  it('should render audio preview image correctly', function () {
    const audioAttachment = {
      title: 'Audio',
      url: 'https://player.vimeo.com/video/165206078',
      fileType: 'audio'
    };

    const wrapper = shallow(<Attachment attachment={ audioAttachment }/>);
    const previewImage = wrapper.find('.attachment-thumbnail');
    previewImage.prop('className').should.containEql('audio');
    previewImage.prop('style').backgroundImage.should.containEql('/img/ic-audio.svg');
  });
});
