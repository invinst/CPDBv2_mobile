import React from 'react';
import should from 'should';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import shouldReact from 'utils/tests/should/React';
import RelatedOfficerItem from 'components/OfficerPage/RelatedOfficersTab/RelatedOfficerItem.react';
import OfficerFactory from 'factories/CoAccusedOfficerFactory';
import f from 'utils/tests/f';


describe('RelatedOfficerItemComponent', () => {
  it('should be renderable', () => {
    RelatedOfficerItem.should.be.renderable();
  });

  it('should render correct data for officer', () => {
    const officer = f.create('CoAccusedOfficer', {
      'officer_first': 'first',
      'officer_last': 'last',
      'gender': 'M',
      'race': 'White',
      'num_allegations': 1,
      'allegations_count': 60
    });
    const fullName = 'first last';
    const type = 'Co-accused';

    const relatedOfficerItem = renderIntoDocument(
      <RelatedOfficerItem officer={ officer } type={ type }/>
    );

    findRenderedDOMComponentWithClass(relatedOfficerItem, 'name').textContent.should.containEql(fullName);
    findRenderedDOMComponentWithClass(relatedOfficerItem, 'officer-description').textContent.should.containEql(
      'Male (White)'
    );
    findRenderedDOMComponentWithClass(relatedOfficerItem, 'related-description').textContent.should.containEql(
      'Co-accused in 1 case'
    );
    findRenderedDOMComponentWithClass(relatedOfficerItem, 'circle-0').should.be.ok();
  });
});
