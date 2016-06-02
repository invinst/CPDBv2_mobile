import React from 'react';
import should from 'should';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import shouldReact from 'utils/tests/should/React';
import OfficerHeader from 'components/OfficerPage/OfficerHeader.react';
import OfficerFactory from 'factories/OfficerFactory';
import f from 'utils/tests/f';


describe('OfficerHeaderComponent', () => {
  it('should be renderable', () => {
    OfficerHeader.should.be.renderable();
  });

  it('should render officer badge number and officer name', () => {
    const badgeNumber = 123;
    const officer = f.create('Officer', {'star': badgeNumber, 'officer_first': 'first', 'officer_last': 'last'});
    const fullName = 'first last';
    const officerHeader = renderIntoDocument(
      <OfficerHeader officer={ officer } />
    );
    const badgeNode = findRenderedDOMComponentWithClass(officerHeader, 'badge-value');
    const nameNode = findRenderedDOMComponentWithClass(officerHeader, 'name');

    badgeNode.textContent.should.containEql(badgeNumber);
    nameNode.textContent.should.containEql(fullName);
  });
});
