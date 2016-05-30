import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import HashUtil from 'utils/HashUtil';
import f from 'utils/tests/f';
import u from 'utils/HelperUtil';
import AppHistory from 'utils/History';
import OfficerAllegationItem from 'components/Shared/OfficerAllegationItem.react';
import ComplaintPageActions from 'actions/ComplaintPage/ComplaintPageActions';


describe('OfficerAllegationItemComponent', () => {
  it('should show correct information', () => {
    const crid = 1234;
    const date = '2012-01-19T09:11:00';
    const expectedDate = 'Jan 19, 2012';
    const category = f.create('Category', {'category': 'cat 1', 'allegation_name': 'allegation name'});

    const allegation = f.create('Allegation', {'crid': crid, 'incident_date': date});
    const officer = f.create('Officer', {'officer_first': 'John', 'officer_last': 'Terry'});
    // sorry for laziness
    const officerAllegations = f.createBatch(2, 'OfficerAllegation', {
      'officer': officer,
      'final_finding': 'un',
      'cat': category
    });
    const firstOfficerAllegation = officerAllegations[0];

    var officerAllegationItem = ReactTestUtils.renderIntoDocument(
    var officerAllegationItem = ReactTestUtils.renderIntoDocument(
      <OfficerAllegationItem officerAllegation={ firstOfficerAllegation }
        allegation={ allegation } officerAllegations={ officerAllegations }/>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(officerAllegationItem, 'crid-number')
      .textContent.should.containEql(crid);
    ReactTestUtils.findRenderedDOMComponentWithClass(officerAllegationItem, 'final-finding')
      .textContent.should.containEql('Unfounded');
    ReactTestUtils.findRenderedDOMComponentWithClass(officerAllegationItem, 'category')
      .textContent.should.containEql('cat 1');
    ReactTestUtils.findRenderedDOMComponentWithClass(officerAllegationItem, 'sub-category')
      .textContent.should.containEql('allegation name');
    ReactTestUtils.findRenderedDOMComponentWithClass(officerAllegationItem, 'related-info')
      .textContent.should.containEql(expectedDate);
    ReactTestUtils.findRenderedDOMComponentWithClass(officerAllegationItem, 'related-info')
      .textContent.should.containEql('John Terry');
    ReactTestUtils.findRenderedDOMComponentWithClass(officerAllegationItem, 'related-info')
      .textContent.should.containEql('and 1 other');
  });

  it('should push url to `AppHistory` and trigger toggle close when clicking', () => {
    let officerAllegationItem, node;
    const crid = 1234;
    const categoryHashId = HashUtil.encode(1);
    const category = f.create('Category', {id: 1, 'allegation_name': 'category name'});

    const expectedUrl = u.format('/complaint/1234/category-name/{categoryHash}', {'categoryHash': categoryHashId});
    const allegation = f.create('Allegation', {'crid': crid});
    const officerAllegation = f.create('OfficerAllegation', {'cat': category});

    const mockAppHistory = sinon.mock(AppHistory);
    const mockComplaintPageAction = sinon.mock(ComplaintPageActions);

    mockAppHistory.expects('pushState').once().withArgs(null, expectedUrl).returns(null);
    mockComplaintPageAction.expects('resetState').once().returns(null);

    officerAllegationItem = ReactTestUtils.renderIntoDocument(
    officerAllegationItem = ReactTestUtils.renderIntoDocument(
      <OfficerAllegationItem officerAllegation={ officerAllegation } allegation={ allegation }
        officerAllegations={ [officerAllegation] }/>
    );
    node = ReactTestUtils.findRenderedDOMComponentWithClass(officerAllegationItem, 'officer-complaint-item');

    ReactTestUtils.Simulate.click(node);

    mockAppHistory.verify();
    mockComplaintPageAction.verify();

    mockAppHistory.restore();
    mockComplaintPageAction.restore();
  });
});
