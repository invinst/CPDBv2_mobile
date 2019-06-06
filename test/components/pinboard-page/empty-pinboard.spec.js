import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router';

import config from 'config';
import EmptyPinboard from 'components/pinboard-page/empty-pinboard';


describe('EmptyPinboard element', function () {
  it('should have enough contents', function () {
    function TestComponent() {
      return EmptyPinboard;
    }

    const wrapper = mount(
      <TestComponent/>
    );

    wrapper.find('.empty-pinboard-title').text().should.equal('Add');
    wrapper.find('.empty-pinboard-description').text().should.containEql(
      'Add officers, or complaint records through search.'
    ).and.containEql('Or use an example pinboard as a baseline to get started.');

    const links = wrapper.find(Link);
    links.should.have.length(2);

    links.at(0).prop('className').should.equal('helper-row');
    links.at(0).prop('to').should.equal(`/pinboard/${config.WattsCrewPinboardId}/`);
    links.at(0).find('.helper-header').text().should.equal('Repeaters');
    links.at(0).find('.helper-text').text().should.equal(
      'Officers with at least 10 complaints against them generate 64% of all complaints.'
    );
    links.at(0).find('.helper-arrow').exists().should.be.true();

    links.at(1).prop('className').should.equal('helper-row');
    links.at(1).prop('to').should.equal(`/pinboard/${config.SkullcapCrewPinboardId}/`);
    links.at(1).find('.helper-header').text().should.equal('Skullcap crew');
    links.at(1).find('.helper-text').text().should.equal(
      'Dogged by allegations of abuse, members of the group have been named in more than 20 federal lawsuits – yet h…'
    );
    links.at(1).find('.helper-arrow').exists().should.be.true();

    wrapper.find('.arrow-head').exists().should.be.true();
    wrapper.find('.arrow-shaft').exists().should.be.true();
  });
});
