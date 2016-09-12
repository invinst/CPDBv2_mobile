import React from 'react';
import { shallow } from 'enzyme';

import InvestigationTimeline from 'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline';
import ThreeNodesTimeline from
  'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline/ThreeNodesTimeline';
import TwoNodesTimeline from
  'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline/TwoNodesTimeline';
import f from 'utils/tests/f';


describe('InvestigationTimeline component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<InvestigationTimeline />);
    wrapper.should.be.ok();
  });

  it('should render TwoNodesTimeline if startInvestigatingAtIncidentDate is true', function () {
    const date = '2012-01-19';
    const officerAllegation = f.create('OfficerAllegation', { 'start_date': date });
    const allegation = f.create('Allegation', { 'incident_date': date });

    const wrapper = shallow(<InvestigationTimeline officerAllegation={ officerAllegation } allegation={ allegation }/>);
    wrapper.find(TwoNodesTimeline).should.have.length(1);
  });

  it('should render ThreeNodesTimeline if startInvestigatingAtIncidentDate is false', function () {
    const officerAllegation = f.create('OfficerAllegation', { 'start_date': '2012-01-19' });
    const allegation = f.create('Allegation', { 'incident_date': '2012-01-20' });

    const wrapper = shallow(<InvestigationTimeline officerAllegation={ officerAllegation } allegation={ allegation }/>);
    wrapper.find(ThreeNodesTimeline).should.have.length(1);
  });
});
