import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import should from 'should';
import sinon from 'sinon';

import f from 'utils/tests/f';
import GaUtil from 'utils/GaUtil';
import HashUtil from'utils/HashUtil';
import MapFacade from 'utils/MapFacade';
import sharedExample from 'utils/tests/should/SharedExample';
import loadablePageSharedExample from 'examples/components/LoadablePage';
import searchablePageSharedExample from 'examples/components/SearchablePage';
import shouldReact from 'utils/tests/should/React';

import AccompliceOfficerSection from 'components/ComplaintPage/AccompliceOfficerSection.react';
import AgainstSection from 'components/ComplaintPage/AgainstSection.react';
import AllegationResourceUtil from 'utils/AllegationResourceUtil';
import ComplainingWitness from 'components/ComplaintPage/ComplainingWitness.react';
import ComplaintPage from 'components/ComplaintPage.react';
import ComplaintPageStore from 'stores/ComplaintPage/ComplaintPageStore';
import DocumentSection from 'components/ComplaintPage/DocumentSection.react';
import InvestigatorSection from 'components/ComplaintPage/InvestigatorSection.react';
import Location from 'components/ComplaintPage/Location.react';
import OfficerAllegationDetail from 'components/ComplaintPage/OfficerAllegationDetail.react';
import SearchablePage from 'components/Shared/SearchablePage.react';
import InterfaceTextResourceUtil from 'utils/InterfaceTextResourceUtil';


function stubForComplaintPage() {
  sinon.stub(GaUtil, 'track');
  sinon.stub(AllegationResourceUtil, 'get');
  sinon.stub(MapFacade, 'initialize');
  sinon.stub(MapFacade, 'addAccidentPlaceMarker');
  sinon.stub(MapFacade, 'addNoAddressPopup');
  sinon.stub(InterfaceTextResourceUtil, 'get', () => {});
}

function restoreForComplaintPage() {
  if (MapFacade.initialize.restore) {
    MapFacade.initialize.restore();
  }

  if (MapFacade.addAccidentPlaceMarker.restore) {
    MapFacade.addAccidentPlaceMarker.restore();
  }

  if (MapFacade.addNoAddressPopup.restore) {
    MapFacade.addNoAddressPopup.restore();
  }

  if (GaUtil.track.restore) {
    GaUtil.track.restore();
  }

  if (AllegationResourceUtil.get.restore) {
    AllegationResourceUtil.get.restore();
  }

  if (InterfaceTextResourceUtil.get.restore) {
    InterfaceTextResourceUtil.get.restore();
  }
}

describe('ComplaintPageComponent', () => {
  let complaintPage;

  beforeEach(() => {
    stubForComplaintPage();
  });

  afterEach(() => {
    if (ComplaintPageStore.getState.restore) {
      ComplaintPageStore.getState.restore();
    }

    if (complaintPage && complaintPage.isMounted()) {
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(complaintPage).parentNode);
    }

    restoreForComplaintPage();
  });

  it('should be renderable', () => {
    ComplaintPage.should.be.renderable();
  });

  it('should be tracked by google analytics', () => {
    restoreForComplaintPage();
    const mock = sinon.mock(GaUtil);
    sinon.stub(AllegationResourceUtil, 'get', () => {
    });

    mock.expects('track').once().withArgs('event', 'allegation', 'view_detail', sinon.match.any).returns('anything');

    complaintPage = ReactTestUtils.renderIntoDocument(
      <ComplaintPage />
    );

    mock.verify();

    mock.restore();
    AllegationResourceUtil.get.restore();
  });

  describe('have enough data to render properly', () => {
    let data, officerAllegation, params, category, allegation;

    beforeEach(() => {
      const categoryId = 123;
      category = f.create('Category', {'id': categoryId});

      officerAllegation = f.create('OfficerAllegation', {'cat': category});
      allegation = f.create('Allegation', {'officer_allegation_set': [officerAllegation]});
      data = f.create('ComplaintPageData', {'allegation': allegation});
      params = {
        'categoryHashId': HashUtil.encode(categoryId)
      };

      complaintPage = ReactTestUtils.renderIntoDocument(
        <ComplaintPage params={ params }/>
      );

      complaintPage.setState({'loading': false, 'found': true, 'data': data});
    });

    it('should render a list of sub-component', () => {

      complaintPage.should.render([SearchablePage, OfficerAllegationDetail, AgainstSection, ComplainingWitness,
        Location, AccompliceOfficerSection, InvestigatorSection, DocumentSection]);
    });

    it('should render component with correct data for `AgainstSection` and `AccompliceOfficerSection`', () => {
      const otherCategory = f.create('Category', {'id': 456});
      const otherOfficerAllegation = f.create('OfficerAllegation', {'cat': otherCategory});
      allegation = f.create('Allegation', {'officer_allegation_set': [officerAllegation, otherOfficerAllegation]});
      data = f.create('ComplaintPageData', {'allegation': allegation});

      complaintPage = ReactTestUtils.renderIntoDocument(
        <ComplaintPage params={ params }/>
      );

      complaintPage.setState({'loading': false, 'found': true, 'data': data});
      complaintPage.should.renderWithProps(AgainstSection, {'officerAllegations': [officerAllegation]});
      complaintPage.should.renderWithProps(AccompliceOfficerSection, {'officerAllegations': [otherOfficerAllegation]});
    });

    it('should render component with sorted data for `AccompliceOfficerSection`', () => {
      const otherCategory = f.create('Category', {'id': 456});

      const officer1 = f.create('Officer', {'allegations_count': 1});
      const officer2 = f.create('Officer', {'allegations_count': 2});
      const officer3 = f.create('Officer', {'allegations_count': 3});

      const officerAllegation1 = f.create('OfficerAllegation', {'cat': otherCategory, 'officer': officer1});
      const officerAllegation2 = f.create('OfficerAllegation', {'cat': otherCategory, 'officer': officer2});
      const officerAllegation3 = f.create('OfficerAllegation', {'cat': otherCategory, 'officer': officer3});
      allegation = f.create('Allegation', {
        'officer_allegation_set': [officerAllegation, officerAllegation3,
          officerAllegation1, officerAllegation2]
      });

      data = f.create('ComplaintPageData', {
        'allegation': allegation
      });

      complaintPage = ReactTestUtils.renderIntoDocument(
        <ComplaintPage params={ params }/>
      );

      complaintPage.setState({'loading': false, 'found': true, 'data': data});
      complaintPage.should.renderWithProps(AgainstSection, {'officerAllegations': [officerAllegation]});
      complaintPage.should.renderWithProps(AccompliceOfficerSection, {
        'officerAllegations': [officerAllegation3,
          officerAllegation2, officerAllegation1]
      });
    });

    it('should render component with sorted data for `AgainstOfficerSection`', () => {
      const otherCategory = f.create('Category', {'id': 456});

      const officer1 = f.create('Officer', {'allegations_count': 1});
      const officer2 = f.create('Officer', {'allegations_count': 2});
      const officer3 = f.create('Officer', {'allegations_count': 3});

      const officerAllegation1 = f.create('OfficerAllegation', {'cat': category, 'officer': officer1});
      const officerAllegation2 = f.create('OfficerAllegation', {'cat': category, 'officer': officer2});
      const officerAllegation3 = f.create('OfficerAllegation', {'cat': category, 'officer': officer3});

      const otherOfficerAllegation = f.create('OfficerAllegation', {'cat': otherCategory, 'officer': officer3});
      allegation = f.create('Allegation', {
        'officer_allegation_set': [otherOfficerAllegation, officerAllegation3,
          officerAllegation1, officerAllegation2]
      });
      data = f.create('ComplaintPageData', {
        'allegation': allegation
      });

      complaintPage = ReactTestUtils.renderIntoDocument(
        <ComplaintPage params={ params }/>
      );

      complaintPage.setState({'loading': false, 'found': true, 'data': data});
      complaintPage.should.renderWithProps(AccompliceOfficerSection, {'officerAllegations': [otherOfficerAllegation]});
      complaintPage.should.renderWithProps(AgainstSection, {
        'officerAllegations': [officerAllegation3,
          officerAllegation2, officerAllegation1]
      });
    });

    it('should show ToggleComplaintPage if toggle is enable', () => {
      complaintPage = ReactTestUtils.renderIntoDocument(
        <ComplaintPage params={ params }/>
      );

      complaintPage.setState({'loading': false, 'found': true, 'toggle': true, 'data': data});
      ReactTestUtils.scryRenderedDOMComponentsWithClass(complaintPage, 'toggle-page content').should.have.length(1);
      ReactTestUtils.scryRenderedComponentsWithType(complaintPage, SearchablePage).should.have.length(0);
    });

    it('should hide ToggleComplaintPage if toggle is disable', () => {
      complaintPage = ReactTestUtils.renderIntoDocument(
        <ComplaintPage params={ params }/>
      );

      complaintPage.setState({'loading': false, 'found': true, 'toggle': false, 'data': data});
      ReactTestUtils.scryRenderedDOMComponentsWithClass(complaintPage, 'toggle-page content').should.have.length(0);
      ReactTestUtils.scryRenderedComponentsWithType(complaintPage, SearchablePage).should.have.length(1);
    });

    describe('should act like a searchable page', () => {
      (() => {
        complaintPage = ReactTestUtils.renderIntoDocument(
          <ComplaintPage params={ params }/>
        );
        complaintPage.setState({'loading': false, 'found': true, 'toggle': false});
        return complaintPage;
      }).should.behaveLike('a searchable page');
    });
  });

  ComplaintPage.should.behaveLike('a loadable page');
});
