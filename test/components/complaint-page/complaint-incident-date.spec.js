import React from 'react';
import { shallow } from 'enzyme';

import ComplaintIncidentDate from 'components/complaint-page/complaint-incident-date';

describe('ComplaintIncidentDate component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(
      <ComplaintIncidentDate incidentDate='Dec 5, 2012' />
    );
    const incidentDate = wrapper.find('.incident-date-value');

    incidentDate.text().should.equal('Dec 5, 2012');
  });

  it('should render nothing if incident date is not present', function () {
    const wrapper = shallow(
      <ComplaintIncidentDate />
    );

    wrapper.find('.incident-date-value').exists().should.be.false();
  });
});
