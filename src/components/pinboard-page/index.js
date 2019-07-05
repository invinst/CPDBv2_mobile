import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import TrackVisibility from 'react-on-screen';

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
  componentDidMount() {
    const { params, pushBreadcrumbs, location, routes } = this.props;
    pushBreadcrumbs({ location, routes, params });
  }

  renderContent() {
    const {
      changePinboardTab,
      currentTab,
      hasMapMarker,
      params,
      initialRequested,
      isEmptyPinboard,
      examplePinboards,
    } = this.props;

    if (!initialRequested) {
      return null;
    }

    if (isEmptyPinboard) {
      return <EmptyPinboard examplePinboards={ examplePinboards } />;
    }

    return (
      <div className='pinboard-content'>
        <PinboardInfoContainer />
        <div className='data-visualizations'>
          <TrackVisibility partialVisibility={ true }>
            <PinboardPaneSection
              changePinboardTab={ changePinboardTab }
              currentTab={ currentTab }
              hasMapMarker={ hasMapMarker }
            />
          </TrackVisibility>
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
  changePinboardTab: PropTypes.func,
  currentTab: PropTypes.string,
  hasMapMarker: PropTypes.bool,
  initialRequested: PropTypes.bool,
  isEmptyPinboard: PropTypes.bool,
  examplePinboards: PropTypes.array,
};

PinboardPage.defaultProps = {
  itemsByTypes: {},
  pushBreadcrumbs: () => {},
  initialRequested: true,
};
