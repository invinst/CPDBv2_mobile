import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import should from 'should';

import f from 'utils/tests/f';

import AgainstCard from 'components/ComplaintPage/AgainstSection/AgainstCard.react';
import AppHistory from 'utils/History';
import InvestigationTimeline from 'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline.react';
import OfficerCard from 'components/Shared/OfficerCard.react';


describe('AgainstCardComponent', () => {
  let againstCard;

  it('should be renderable', () => {
    againstCard = ReactTestUtils.renderIntoDocument(
      <AgainstCard />
    );

    againstCard.should.be.ok;
  });

  it('should render `OfficerCard` as sub-component', () => {
    const officerAllegation = f.create('OfficerAllegation');

    againstCard = ReactTestUtils.renderIntoDocument(
      <AgainstCard officerAllegation={ officerAllegation } />
    );

    ReactTestUtils.findRenderedComponentWithType(againstCard, OfficerCard).should.be.ok;
  });

  it('should render `InvestigationTimeline` as sub-component if useSameTimeline by default', () => {
    const officerAllegation = f.create('OfficerAllegation');

    againstCard = ReactTestUtils.renderIntoDocument(
      <AgainstCard officerAllegation={ officerAllegation } />
    );

    againstCard.should.render([InvestigationTimeline]);
  });

  it('should not render `InvestigationTimeline` as sub-component if useSameTimeline is true', () => {
    const officerAllegation = f.create('OfficerAllegation');

    againstCard = ReactTestUtils.renderIntoDocument(
      <AgainstCard officerAllegation={ officerAllegation } shouldRenderTimelineOutside={ true } />
    );

    againstCard.should.not.render([InvestigationTimeline]);
  });

  it('should show `Gender unknown` and `Race unknown` if they are empty', () => {
    let component;
    const officer = f.create('Officer', {
      'gender': '',
      'race': ''
    });
    const officerAllegation = f.create('OfficerAllegation', { 'officer': officer });

    againstCard = ReactTestUtils.renderIntoDocument(
      <AgainstCard officerAllegations={ officerAllegation } />
    );

    component = ReactTestUtils.findRenderedDOMComponentWithClass(againstCard, 'against-card');
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

    againstCard = ReactTestUtils.renderIntoDocument(
      <AgainstCard officerAllegation={ officerAllegation } />
    );

    OfficerNode = ReactTestUtils.scryRenderedComponentsWithType(againstCard, OfficerCard)[0];

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(OfficerNode));

    mock.verify();
    mock.restore();
  });

});
