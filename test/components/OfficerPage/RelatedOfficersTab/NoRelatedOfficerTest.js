import React from 'react';
import should from 'should';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import shouldReact from 'utils/tests/should/React';
import NoRelatedOfficer from 'components/OfficerPage/RelatedOfficersTab/NoRelatedOfficer.react';


describe('NoRelatedOfficerComponent', () => {
  it('should be renderable', () => {
    NoRelatedOfficer.should.be.renderable();
  });

  it('should render `No any officer related to this officer` as its content', () => {
    const noRelatedOfficer = renderIntoDocument(
      <NoRelatedOfficer />
    );

    findRenderedDOMComponentWithClass(noRelatedOfficer, 'no-related-officer').textContent.should.containEql(
      'No any officer related to this officer'
    );
  });
});
