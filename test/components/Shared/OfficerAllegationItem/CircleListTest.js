import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import should from 'should';
import shouldReact from 'utils/tests/should/React';

import CircleList from 'components/Shared/OfficerAllegationItem/CircleList';


describe('CircleListComponent', () => {
  it('should be renderable', () => {
    CircleList.should.be.renderable();
  });

  it('should render nothing if allegationCountList is empty', () => {
    var circleList = ReactTestUtils.renderIntoDocument(
      <CircleList />
    );
    circleList.should.renderNothing();
  });

  it('should render circle list sorted by descending order of allegation count', () => {
    const allegationCounts = [1, 10, 5];
    const expectedRenderedClasses = ['circle circle-1', 'circle circle-2', 'circle circle-4'];
    var circleList = ReactTestUtils.renderIntoDocument(
      <CircleList allegationCountList={ allegationCounts } />
    );

    const circleDoms = ReactTestUtils.scryRenderedDOMComponentsWithClass(circleList, 'circle');
    const renderedClasses = circleDoms.map(circleDom => circleDom.getAttribute('class'));

    renderedClasses.should.be.eql(expectedRenderedClasses);
  });
});
