let f, ToggleComplaintPage, OfficerAllegationItem, ComplaintPageActions;
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
require('should');

f = require('utils/tests/f');
require('utils/tests/should/React');

ToggleComplaintPage = require('components/ComplaintPage/ToggleComplaintPage.react');
OfficerAllegationItem = require('components/Shared/OfficerAllegationItem.react');
ComplaintPageActions = require('actions/ComplaintPage/ComplaintPageActions');


describe('ToggleComplaintPageComponent', () => {
  it('should be renderable', () => {
    ToggleComplaintPage.should.be.renderable();
  });

  it('should render `OfficerAllegationItem` as sub-component', () => {
    const officerAllegations = f.createBatch(2, 'OfficerAllegation');

    var toggleComplaintPage = ReactTestUtils.renderIntoDocument(
    var toggleComplaintPage = ReactTestUtils.renderIntoDocument(
      <ToggleComplaintPage officerAllegations={ officerAllegations }/>
    );

    toggleComplaintPage.should.render([OfficerAllegationItem]);
  });

  it('should render `OfficerAllegationItem` with correct officer allegation group', () => {
    const cat1 = f.create('Category', {'id': 123});
    const cat2 = f.create('Category', {'id': 456});
    const officerAllegations = f.createBatch(2, 'OfficerAllegation', {'cat': cat1});
    const otherOfficerAllegations = f.createBatch(1, 'OfficerAllegation', {'cat': cat2});

    var toggleComplaintPage = ReactTestUtils.renderIntoDocument(
    var toggleComplaintPage = ReactTestUtils.renderIntoDocument(
      <ToggleComplaintPage officerAllegations={ officerAllegations.concat(otherOfficerAllegations) }/>
    );

    ReactTestUtils.scryRenderedComponentsWithType(toggleComplaintPage, OfficerAllegationItem).should.have.length(2);
  });

  it('should trigger close action if clicking on close icon', () => {
    let node, toggleComplaintPage;
    const officerAllegations = f.createBatch(1, 'OfficerAllegation');

    const mock = sinon.mock(ComplaintPageActions);
    mock.expects('toggleClose').once().returns(null);

    toggleComplaintPage = ReactTestUtils.renderIntoDocument(
    toggleComplaintPage = ReactTestUtils.renderIntoDocument(
      <ToggleComplaintPage officerAllegations={ officerAllegations }/>
    );

    node = ReactTestUtils.findRenderedDOMComponentWithClass(toggleComplaintPage, 'icon-close');
    ReactTestUtils.Simulate.click(node);

    mock.verify();
    mock.restore();
  });

  it('should show crid and number of allegation on header', () => {
    const numberOfAllegations = 3;
    const crid = 123;
    const allegation = f.create('Allegation', {'crid': crid});
    var toggleComplaintPage = ReactTestUtils.renderIntoDocument(
    var toggleComplaintPage = ReactTestUtils.renderIntoDocument(
      <ToggleComplaintPage numberOfAllegations={ numberOfAllegations } allegation={ allegation }/>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(toggleComplaintPage, 'number-of-allegations')
      .textContent.should.containEql(numberOfAllegations);
    ReactTestUtils.findRenderedDOMComponentWithClass(toggleComplaintPage, 'crid-number')
      .textContent.should.containEql(crid);
  });
});
