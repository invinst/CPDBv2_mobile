import React, { Component } from 'react';

import EmptyPinboard from 'components/pinboard-page/empty-pinboard';
import { shallow } from 'enzyme/build';

describe('EmptyPinboard element', function () {
  it('should have enough contents', function () {
    class TestComponent extends Component {
      render() {
        return EmptyPinboard;
      }
    }

    const wrapper = shallow(
      <TestComponent/>
    );

    wrapper.getDOMNode().className.should.containEql('responsive-container');

    wrapper.find('.empty-pinboard-title').text().should.equal('Add');
    wrapper.find('.empty-pinboard-description').text().should.containEql(
      'Add officers, or complaint records through search.'
    ).and.containEql('Or use an example pinboard as a baseline to get started.');

    wrapper.find('.helper-row').should.have.length(2);
    const helperHeaders = wrapper.find('.helper-header');
    const helperTexts = wrapper.find('.helper-text');
    const helperArrows = wrapper.find('.helper-arrow');
    helperHeaders.should.have.length(2);
    helperTexts.should.have.length(2);
    helperArrows.should.have.length(2);

    helperHeaders.at(0).text().should.equal('Repeaters');
    helperHeaders.at(1).text().should.equal('Skullcap crew');
    helperTexts.at(0).text().should.equal(
      'Officers with at least 10 complaints against them generate 64% of all complaints.'
    );
    helperTexts.at(1).text().should.equal(
      'Dogged by allegations of abuse, members of the group have been named in more than 20 federal lawsuits – yet h…'
    );

    wrapper.find('.arrow-head').exists().should.be.true();
    wrapper.find('.arrow-shaft').exists().should.be.true();
  });
});
