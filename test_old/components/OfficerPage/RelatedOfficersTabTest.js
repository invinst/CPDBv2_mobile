import React from 'react';
import should from 'should';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import shouldReact from 'utils/tests/should/React';
import RelatedOfficersTab from 'components/OfficerPage/RelatedOfficersTab.react';
import RelatedOfficerItem from 'components/OfficerPage/RelatedOfficersTab/RelatedOfficerItem.react';
import NoRelatedOfficer from 'components/OfficerPage/RelatedOfficersTab/NoRelatedOfficer.react';
import CoAccusedOfficerFactory from 'factories/OfficerFactory';


import f from 'utils/tests/f';


describe('RelatedOfficersTabComponent', () => {
  it('should be renderable', () => {
    RelatedOfficersTab.should.be.renderable();
  });

  it('should render `RelatedOfficerItem` as its sub-components with correct data', () => {
    const coAccusedOfficer = f.create('CoAccusedOfficer');

    const relatedOfficersTab = renderIntoDocument(
      <RelatedOfficersTab coAccused={ [coAccusedOfficer] } />
    );

    relatedOfficersTab.should.renderWithProps(RelatedOfficerItem, {
      'officer': coAccusedOfficer,
      'type': 'Co-accused'
    });
  });

  it('should render `NoRelatedOfficer` if therethere\'s no co-accused officer supplied as props', () => {
    const relatedOfficersTab = renderIntoDocument(
      <RelatedOfficersTab />
    );

    relatedOfficersTab.should.render([NoRelatedOfficer]);
  });
});
