import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import should from 'should';

import f from 'utils/tests/f';
import shouldReact from 'utils/tests/should/React';

import AccompliceOfficerSection from 'components/ComplaintPage/AccompliceOfficerSection.react';
import OfficerCard from 'components/Shared/OfficerCard.react';
import AppHistory from 'utils/History';


describe('AccompliceOfficerSectionComponent', () => {
  let accompliceOfficerSection;

  it('should be renderable', () => {
    AccompliceOfficerSection.should.be.renderable();
  });

  it('should be render OfficerCard as sub-component', () => {
    const officerAllegations = f.createBatch(2, 'OfficerAllegation');

    accompliceOfficerSection = ReactTestUtils.renderIntoDocument(
      <AccompliceOfficerSection officerAllegations={ officerAllegations } />
    );

    ReactTestUtils.scryRenderedComponentsWithType(accompliceOfficerSection, OfficerCard).length.should.be.equal(2);
  });

  it('should show officer name, description if any', () => {
    let component;
    const officer = f.create('Officer', {
      'gender': 'M',
      'race': 'Black',
      'officer_first': 'John',
      'officer_last': 'Henry'
    });
    const displayName = 'John Henry';
    const description = 'Male (Black)';
    const officerAllegation = f.create('OfficerAllegation', { 'officer': officer });

    accompliceOfficerSection = ReactTestUtils.renderIntoDocument(
      <AccompliceOfficerSection officerAllegations={ [officerAllegation] } />
    );

    component = ReactTestUtils.findRenderedDOMComponentWithClass(accompliceOfficerSection,
      'accomplice-officer-section');
    component.textContent.should.containEql(displayName);
    component.textContent.should.containEql(description);
  });

  it('should show `Gender unknown` and `Race unknown` if they are empty', () => {
    let component;
    const officer = f.create('Officer', {
      'gender': '',
      'race': ''
    });
    const officerAllegation = f.create('OfficerAllegation', { 'officer': officer });

    accompliceOfficerSection = ReactTestUtils.renderIntoDocument(
      <AccompliceOfficerSection officerAllegations={ [officerAllegation] } />
    );

    component = ReactTestUtils.findRenderedDOMComponentWithClass(accompliceOfficerSection,
      'accomplice-officer-section');
    component.textContent.should.containEql('Gender unknown');
    component.textContent.should.containEql('Race unknown');
  });

  it('should push officerUrl to AppHistory', () => {
    const officer = f.create('Officer', { 'officer_first': 'first', 'officer_last': 'last' });
    const officerAllegation = f.create('OfficerAllegation', { 'officer': officer });
    const expectedUrl = `/officer/first-last/${officerAllegation.officer.id}`;
    let OfficerNode;

    const mock = sinon.mock(AppHistory);
    mock.expects('push').once().withArgs(expectedUrl).returns(null);

    accompliceOfficerSection = ReactTestUtils.renderIntoDocument(
      <AccompliceOfficerSection officerAllegations={ [officerAllegation] } />
    );

    OfficerNode = ReactTestUtils.scryRenderedComponentsWithType(accompliceOfficerSection, OfficerCard)[0];

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(OfficerNode));

    mock.verify();
    mock.restore();
  });

  it('should be hidden when there\'s no officer allegations', () => {
    accompliceOfficerSection = ReactTestUtils.renderIntoDocument(
      <AccompliceOfficerSection />
    );

    accompliceOfficerSection.should.renderNothing();
  });
});
