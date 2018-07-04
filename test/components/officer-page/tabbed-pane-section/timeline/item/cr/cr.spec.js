import React from 'react';
import { shallow } from 'enzyme';

import Cr from 'components/officer-page/tabbed-pane-section/timeline/item/cr';


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
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif'
    }, {
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
    }, {
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p3-normal.gif'
    }],
  };

  it('should render item correctly', function () {
    const instance = shallow(<Cr item={ item } />);
    instance.find('.kind').text().should.equal('C');
    instance.find('.category').text().should.equal('Use of Force');
    instance.find('.finding').text().should.equal('Sustained, Unknown');
    instance.find('.date').text().should.equal('Jan 01');
  });
});
