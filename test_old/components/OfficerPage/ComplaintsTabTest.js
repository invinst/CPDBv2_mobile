import React from 'react';
import should from 'should';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import shouldReact from 'utils/tests/should/React';
import ComplaintsTab from 'components/OfficerPage/ComplaintsTab.react';
import OfficerAllegationItem from 'components/Shared/OfficerAllegationItem.react';
import AllegationFactory from 'factories/AllegationFactory';
import OfficerAllegationFactory from 'factories/OfficerAllegationFactory';

import f from 'utils/tests/f';


describe('ComplaintsTabComponent', () => {
  it('should be renderable', () => {
    ComplaintsTab.should.be.renderable();
  });

  it('should render `OfficerAllegationItem` as its subcomponents with correct data', () => {
    const officer = f.create('Officer');
    const officerAllegation = f.create('OfficerAllegation', { 'officer': officer });
    const otherOfficerAllegation = f.create('OfficerAllegation');

    const allegations = f.create('Allegation', {
      'officer_allegation_set': [officerAllegation, otherOfficerAllegation]
    });
    const complaintsTab = renderIntoDocument(
      <ComplaintsTab complaints={ [allegations] } officer={ officer } />
    );

    complaintsTab.should.renderWithProps(OfficerAllegationItem, {
      'officerAllegations': [officerAllegation, otherOfficerAllegation],
      'officerAllegation': officerAllegation
    });
  });
});
