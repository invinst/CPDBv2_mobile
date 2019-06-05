import React, { Component, PropTypes } from 'react';
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
  changePinboardTab: PropTypes.func,
  updatePinboardInfo: PropTypes.func,
  currentTab: PropTypes.string,
  hasMapMarker: PropTypes.bool,
  isEmptyPinboard: PropTypes.bool,
};

PinboardPage.defaultProps = {
  itemsByTypes: {},
  pushBreadcrumbs: () => {},
};
