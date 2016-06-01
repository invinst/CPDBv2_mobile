import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import should from 'should';

import shouldReact from 'utils/tests/should/React';
import f from 'utils/tests/f';

import InvestigatorSection from 'components/ComplaintPage/InvestigatorSection.react';


describe('InvestigatorSection component', () => {
  let investigatorSection;

  it('should be renderable', () => {
    InvestigatorSection.should.be.renderable();
  });

  it('should show investigator', () => {
    const investigator = f.create('Investigator');
    const allegation = f.create('Allegation', {'investigator' : investigator});

    investigatorSection = ReactTestUtils.renderIntoDocument(
      <InvestigatorSection allegation={ allegation }/>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(investigatorSection, 'investigator-card').should.be.ok;
  });

  it('should not show anything if there is no investigator', () => {

    investigatorSection = ReactTestUtils.renderIntoDocument(
      <InvestigatorSection />
    );

    investigatorSection.should.renderNothing();
  });

  it('should show investigator name and current rank', () => {
    const investigator = f.create('Investigator', {'name': 'John', 'current_rank': 'SERGEANT OF POLICE'});
    const allegation = f.create('Allegation', {'investigator' : investigator});

    investigatorSection = ReactTestUtils.renderIntoDocument(
      <InvestigatorSection allegation={ allegation }/>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(investigatorSection, 'name bold')
      .textContent.should.containEql(investigator.name);
    ReactTestUtils.findRenderedDOMComponentWithClass(investigatorSection, 'rank')
      .textContent.should.containEql(investigator.current_rank);
  });

  it('should show current rank `Rank unknown` if current rank is empty', () => {
    const investigator = f.create('Investigator', {'current_rank': ''});
    const allegation = f.create('Allegation', {'investigator' : investigator});

    investigatorSection = ReactTestUtils.renderIntoDocument(
      <InvestigatorSection allegation={ allegation }/>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(investigatorSection, 'rank')
      .textContent.should.containEql('Rank unknown');
  });
});

