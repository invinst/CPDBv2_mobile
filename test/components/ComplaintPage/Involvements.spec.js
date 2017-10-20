import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';
import constants from 'constants';

import Involvements from 'components/ComplaintPage/Involvements';

describe('<Involvements />', function () {
  it('should render null if involvements array is empty', function () {
    let wrapper = shallow(<Involvements involvements={ [] } />);
    should(wrapper.getNode()).be.null();
  });

  it('should render PeopleList with correct props', function () {
    const involvements = [{
      'involvedType': 'Complainant',
      'officers': [{
        'abbrName': 'H. Lodding',
        'extraInfo': 'male, white',
        'id': 21483
      }]
    }];
    let wrapper = shallow(<Involvements involvements={ involvements } />);
    const peopleList = wrapper.find('PeopleList');
    peopleList.prop('title').should.eql('Complainant');
    peopleList.prop('people').should.eql(
      [{
        content: 'H. Lodding',
        subcontent: 'male, white',
        url: `${constants.OFFICER_PATH}21483/`
      }]
    );
  });
});
