import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import sinon from 'sinon';

import Cr from 'components/officer-page/tabbed-pane-section/timeline/item/cr';
import Attachments from 'components/officer-page/tabbed-pane-section/timeline/item/cr/attachments';


describe('Cr component', function () {
  const item = {
    crid: 123,
    date: 'Jan 01',
    kind: 'Complaint',
    unitName: '001',
    unitDisplay: '001 Display',
    rank: 'Police Officer',
    rankDisplay: 'Police Officer Display',
    isFirstRank: true,
    isLastRank: true,
    isFirstUnit: true,
    isLastUnit: true,
    finding: 'Sustained',
    category: 'Use of Force',
    outcome: 'Unknown',
    coaccused: 4,
    attachments: [{
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.pdf',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
    }, {
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.pdf',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif',
    }, {
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.pdf',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p3-normal.gif',
    }],
  };

  it('should render item correctly', function () {
    const onTrackingAttachment = sinon.spy();
    const instance = shallow(
      <Cr
        className='test--cr-item'
        item={ item }
        pathname='test-pathname'
        onTrackingAttachment={ onTrackingAttachment }
      />
    );
    const main = instance.find(Link);

    main.prop('to').should.equal('/complaint/123/');
    main.prop('className').should.containEql('test--cr-item');

    const content = main.find('.content');
    content.find('.kind').text().should.equal('C');
    content.find('.category').text().should.equal('Use of Force');
    content.find('.finding').text().should.equal('Sustained, Unknown');
    content.find('.date').text().should.equal('Jan 01');

    const attachments = content.find(Attachments);
    attachments.prop('attachments').should.eql(item.attachments);
    attachments.prop('pathname').should.eql('test-pathname');
    attachments.prop('onTrackingAttachment').should.eql(onTrackingAttachment);
  });
});
