import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import SearchBar from './search-bar';
import Header from './header';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import Footer from 'components/footer';
import EmptyPinboardContainer from 'containers/pinboard-page/empty-pinboard-container';
import PinboardInfoContainer from 'containers/pinboard-page/pinboard-info';
import styles from './pinboard-page.sass';
import LoadingSpinner from 'components/common/loading-spinner';


export default class PinboardPage extends Component {
  componentDidMount() {
    const { params, pushBreadcrumbs, location, routes, requestCMS, hasCMS } = this.props;
    pushBreadcrumbs({ location, routes, params });

    hasCMS || requestCMS();
  }

  componentDidUpdate() {
    const { params, pushBreadcrumbs, location, routes } = this.props;
    pushBreadcrumbs({ location, routes, params });
  }

  renderContent() {
    const {
      hasMapMarker,
      params,
      initialRequested,
      isEmptyPinboard,
      pinboardPageLoading,
    } = this.props;

    if (!initialRequested) {
      return null;
    }

    if (pinboardPageLoading) {
      return <LoadingSpinner className={ styles.pinboardLoading } />;
    }

    if (isEmptyPinboard) {
      return <EmptyPinboardContainer />;
    }

    return (
      <div className='pinboard-content'>
        <PinboardInfoContainer />
        <div className='data-visualizations'>
          <PinboardPaneSection hasMapMarker={ hasMapMarker }/>
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
  hasMapMarker: PropTypes.bool,
  initialRequested: PropTypes.bool,
  pinboardPageLoading: PropTypes.bool,
  isEmptyPinboard: PropTypes.bool,
  hasCMS: PropTypes.bool,
  requestCMS: PropTypes.func,
};

PinboardPage.defaultProps = {
  itemsByTypes: {},
  pushBreadcrumbs: () => {},
  initialRequested: true,
  requestCMS: () => {},
};
