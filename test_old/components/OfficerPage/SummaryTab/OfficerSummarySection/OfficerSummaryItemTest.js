import React from 'react';
import should from 'should';
import sinon from 'sinon';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import shouldReact from 'utils/tests/should/React';
import OfficerSummaryItem from 'components/OfficerPage/SummaryTab/OfficerSummarySection/OfficerSummaryItem.react';
import OfficerFactory from 'factories/OfficerFactory';
import OfficerPresenter from 'presenters/OfficerPresenter';
import f from 'utils/tests/f';


describe('OfficerSummaryItemComponent', () => {
  it('should be renderable', () => {
    OfficerSummaryItem.should.be.renderable();
  });

  it('should render nothing if officer does not have data', () => {
    const officerSummaryItem = renderIntoDocument(
      <OfficerSummaryItem />
    );

    officerSummaryItem.should.renderNothing();
  });

  it('should render officer data', () => {
    const officer = f.create('Officer', {
      'race': 'Black'
    });

    const officerSummaryItem = renderIntoDocument(
      <OfficerSummaryItem officer={ officer } label='Race' data='Black' />
    );

    findRenderedDOMComponentWithClass(officerSummaryItem, 'label').textContent.should.containEql('Race');
    findRenderedDOMComponentWithClass(officerSummaryItem, 'value').textContent.should.containEql('Black');
  });
});
