import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';
import { noop } from 'lodash';

import App from 'components/app';
import browserHistory from 'utils/history';
import RootReducer from 'reducers/root-reducer';
import LandingPage from 'components/landing-page';
import TopOfficersByAllegation from 'components/landing-page/top-officers-by-allegation';
import RecentActivities from 'components/landing-page/recent-activities';
import NewDocumentAllegations from 'components/landing-page/new-document-allegations';
import ComplaintSummaries from 'components/landing-page/complaint-summaries';
import SearchPage from 'components/search-page';
import OfficerPage from 'components/officer-page';
import ComplaintPage from 'components/complaint-page';
import TRRPage from 'components/trr-page';
import PinboardPage from 'components/pinboard-page';
import Officers from 'components/embed/officers';


const renderRouter = (initialEntry) => {
  const store = createStore(RootReducer(browserHistory));
  return mount(
    <Provider store={ store }>
      <MemoryRouter initialEntries={ [initialEntry] } initialIndex={ 0 }>
        <App location={ { pathname: initialEntry } }/>
      </MemoryRouter>
    </Provider>
  );
};

describe('App', function () {
  it('should render LandingPage when visit /', function () {
    sinon.stub(LandingPage.prototype, 'componentDidMount').returns(noop);
    sinon.stub(TopOfficersByAllegation.prototype, 'componentDidMount').returns(noop);
    sinon.stub(RecentActivities.prototype, 'componentDidMount').returns(noop);
    sinon.stub(NewDocumentAllegations.prototype, 'componentDidMount').returns(noop);
    sinon.stub(ComplaintSummaries.prototype, 'componentDidMount').returns(noop);
    renderRouter('/').find(LandingPage).exists().should.be.true();
  });

  it('should render SearchPage when visit /search/', function () {
    sinon.stub(SearchPage.prototype, 'componentDidMount').returns(noop);
    renderRouter('/search/').find(SearchPage).exists().should.be.true();
  });

  it('should render OfficerPage when visit /officer/123/', function () {
    sinon.stub(OfficerPage.prototype, 'componentDidMount').returns(noop);
    renderRouter('/officer/123').find(OfficerPage).exists().should.be.true();
  });

  it('should render ComplaintPage when visit /complaint/123/', function () {
    sinon.stub(ComplaintPage.prototype, 'componentDidMount').returns(noop);
    renderRouter('/complaint/123/').find(ComplaintPage).exists().should.be.true();
  });

  it('should render TRRPage when visit /trr/123/', function () {
    sinon.stub(TRRPage.prototype, 'componentDidMount').returns(noop);
    renderRouter('/trr/123').find(TRRPage).exists().should.be.true();
  });

  it('should render PinboardPage when visit /pinboard/123/pinboard-title/', function () {
    sinon.stub(PinboardPage.prototype, 'componentDidMount').returns(noop);
    renderRouter('/pinboard/123/pinboard-title/').find(PinboardPage).exists().should.be.true();
  });

  it('should render TopOfficersByAllegation when visit /embed/top-officers-page', function () {
    sinon.stub(TopOfficersByAllegation.prototype, 'componentDidMount').returns(noop);
    renderRouter('/embed/top-officers-page/').find(TopOfficersByAllegation).exists().should.be.true();
  });

  it('should render Officers when visit /embed/officers/', function () {
    sinon.stub(Officers.prototype, 'componentDidMount').returns(noop);
    renderRouter('/embed/officers/').find(Officers).exists().should.be.true();
  });
});
