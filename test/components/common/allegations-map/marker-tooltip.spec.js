import React from 'react';
import { mount } from 'enzyme';

import MarkerTooltip from 'components/common/allegations-map/marker-tooltip';


describe('MarkerTooltip component', function () {
  let wrapper;
  const victims = [{
    'gender': 'male',
    'race': 'White',
    'age': 35
  }, {
    'gender': 'female',
    'race': 'Black',
    'age': 42
  }];

  it('should render marker tooltip correctly', function () {
    wrapper = mount(
      <MarkerTooltip
        kind={ 'CR' }
        id={ '12345' }
        category={ 'test category' }
        coaccused={ 5 }
        victims={ victims }
      />
    );
    const tooltipKindId = wrapper.find('.marker-tooltip-title').at(0);
    const tooltipCategory = wrapper.find('.marker-tooltip-category').at(0);
    const tooltipCoaccused = wrapper.find('.marker-tooltip-footer').at(0);
    const tooltipVictims = wrapper.find('.test--marker-tooltip-victim');

    tooltipKindId.text().should.eql('CR 12345');
    tooltipCategory.text().should.eql('test category');
    tooltipCoaccused.text().should.eql('Accused with 5 others');
    tooltipVictims.at(0).text().should.eql('White male age 35');
    tooltipVictims.at(1).text().should.eql('Black female age 42');
  });

  it('should not render age and race of victim if they are null', function () {
    wrapper = mount(
      <MarkerTooltip
        victims={ [{
          'gender': 'male',
          'race': 'Unknown',
          'age': 35
        }, {
          'gender': 'female',
          'race': 'Black',
          'age': null
        }] }
      />
    );
    const tooltipVictims = wrapper.find('.test--marker-tooltip-victim');

    tooltipVictims.at(0).text().should.eql('male age 35');
    tooltipVictims.at(1).text().should.eql('Black female ');
  });

  it('should not render victim if there are no victims', function () {
    wrapper = mount(<MarkerTooltip victims={ [] } />);
    const tooltipVictims = wrapper.find('.test--marker-tooltip-victim');
    tooltipVictims.should.have.length(0);
  });

  it('should go to CR detail page when clicking on', function () {
    wrapper = mount(<MarkerTooltip victims={ victims } id='123456' url='/complaint/123456/' />);
    wrapper.find('.test--marker-tooltip').at(0).node.href.should.containEql('/complaint/123456/');
  });
});
