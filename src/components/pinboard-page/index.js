import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import cx from 'classnames';

import styles from './pinboard-page.sass';
import SearchBar from './search-bar';
import Header from './header';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import Footer from 'components/footer';
import EmptyPinboard from './empty-pinboard';
import PinboardInfoContainer from 'containers/pinboard-page/pinboard-info';


export default class PinboardPage extends Component {
  constructor(props) {
    super(props);
    this.fetchPinboardData = this.fetchPinboardData.bind(this);
  }

  componentDidMount() {
    const { pinboard, fetchPinboard, params, pushBreadcrumbs, location, routes } = this.props;
    pushBreadcrumbs({ location, routes, params });

    const idOnPath = params.pinboardId;
    const idInStore = pinboard.id;

    fetchPinboard(idOnPath);
    if (idOnPath === idInStore) {
      this.fetchPinboardData(idOnPath);
    }
  }

  componentDidUpdate(prevProps) {
    const prevPinboard = prevProps.pinboard;
    const { pinboard } = this.props;

    if (prevPinboard.id !== pinboard.id) {
      this.fetchPinboardData(pinboard.id);
    }

    if (prevPinboard.url !== pinboard.url) {
      browserHistory.replace(pinboard.url);
    }
  }

  fetchPinboardData(id) {
    const {
      fetchPinboardComplaints,
      fetchPinboardOfficers,
      fetchPinboardTRRs,
      fetchPinboardSocialGraph,
      fetchPinboardGeographicData,
      fetchPinboardRelevantDocuments,
      fetchPinboardRelevantCoaccusals,
      fetchPinboardRelevantComplaints,
    } = this.props;
    fetchPinboardComplaints(id);
    fetchPinboardOfficers(id);
    fetchPinboardTRRs(id);
    fetchPinboardSocialGraph(id);
    fetchPinboardGeographicData(id);
    fetchPinboardRelevantDocuments(id);
    fetchPinboardRelevantCoaccusals(id);
    fetchPinboardRelevantComplaints(id);
  }

  renderContent() {
    const {
      changePinboardTab,
      currentTab,
      hasMapMarker,
      params,
      isEmptyPinboard,
    } = this.props;

    if (isEmptyPinboard) {
      return EmptyPinboard;
    }

    return (
      <div>
        <PinboardInfoContainer />
        <div className='data-visualizations'>
          <PinboardPaneSection
            changePinboardTab={ changePinboardTab }
            currentTab={ currentTab }
            hasMapMarker={ hasMapMarker }
          />
        </div>
        <div className='pinned-section'>
          <PinnedOfficersContainer/>
          <PinnedCRsContainer/>
          <PinnedTRRsContainer/>
        </div>
        <RelevantSectionContainer pinboardId={ params.pinboardId }/>
      </div>
    );
  }

  render() {
    const { isEmptyPinboard } = this.props;

    return (
      <div className={ cx(styles.pinboardPage, 'pinboard-page', { 'empty': isEmptyPinboard }) }>
        <Header />
        <SearchBar />
        { this.renderContent() }
        <Footer />
      </div>
    );
  }
}

PinboardPage.propTypes = {
  params: PropTypes.object,
  routes: PropTypes.array,
  pushBreadcrumbs: PropTypes.func,
  location: PropTypes.object,
  pinboard: PropTypes.object,
  fetchPinboard: PropTypes.func,
  fetchPinboardComplaints: PropTypes.func,
  fetchPinboardOfficers: PropTypes.func,
  fetchPinboardTRRs: PropTypes.func,
  fetchPinboardSocialGraph: PropTypes.func,
  fetchPinboardGeographicData: PropTypes.func,
  fetchPinboardRelevantDocuments: PropTypes.func,
  fetchPinboardRelevantCoaccusals: PropTypes.func,
  fetchPinboardRelevantComplaints: PropTypes.func,
  changePinboardTab: PropTypes.func,
  updatePinboardInfo: PropTypes.func,
  currentTab: PropTypes.string,
  hasMapMarker: PropTypes.bool,
  isEmptyPinboard: PropTypes.bool,
};

PinboardPage.defaultProps = {
  itemsByTypes: {},
  fetchPinboard: () => {},
  fetchPinboardComplaints: () => {},
  fetchPinboardOfficers: () => {},
  fetchPinboardTRRs: () => {},
  fetchPinboardSocialGraph: () => {},
  fetchPinboardGeographicData: () => {},
  fetchPinboardRelevantDocuments: () => {},
  fetchPinboardRelevantCoaccusals: () => {},
  fetchPinboardRelevantComplaints: () => {},
  pushBreadcrumbs: () => {},
};
