import React from 'react';
import { shallow } from 'enzyme';
import ClampLines from 'react-clamp-lines';

import Attachment from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint/attachment';
import Image from 'components/shared/image';


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

    const previewImage = wrapper.find(Image);
    previewImage.prop('src').should.eql(
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
    const previewImage = wrapper.find(Image);
    previewImage.prop('className').should.containEql('document');
    previewImage.prop('src').should.equal(
      'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif'
    );
  });

  it('should render other types preview image correctly', function () {
    const videoAttachment = {
      title: 'Video Clip',
      url: 'https://player.vimeo.com/video/165206078',
      previewImageUrl: '/src/img/ic-video.svg',
      fileType: 'video'
    };

    const wrapper = shallow(<Attachment attachment={ videoAttachment }/>);
    const previewImage = wrapper.find(Image);
    previewImage.prop('className').should.containEql('video');
    previewImage.prop('src').should.equal('/src/img/ic-video.svg');
  });
});
