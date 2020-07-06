import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import SearchBar from './search-bar';
import Header from './header';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import Footer from 'components/footer';
import EmptyPinboardContainer from 'containers/pinboard-page/empty-pinboard-container';
import PinboardInfoContainer from 'containers/pinboard-page/pinboard-info';
import styles from './pinboard-page.sass';
import LoadingSpinner from 'components/common/loading-spinner';
import PinboardDataVisualizationContainer from 'containers/pinboard-page/pinboard-data-visualization-container';


export default class PinboardPage extends Component {
  componentDidMount() {
    const { requestCMS, hasCMS } = this.props;

    hasCMS || requestCMS();
  }

  renderContent() {
    const {
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
        <PinboardDataVisualizationContainer />
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
    const { isEmptyPinboard, isShownPinboardsList, hideShowPinboardsList } = this.props;

    return (
      <div className={ cx(
        styles.pinboardPage,
        'pinboard-page',
        { 'empty': isEmptyPinboard, 'display-pinboards-list': isShownPinboardsList }
      ) }>
        <Header />
        <SearchBar hideShowPinboardsList={ hideShowPinboardsList } isShownPinboardsList={ isShownPinboardsList } />
        { this.renderContent() }
        <Footer />
      </div>
    );
  }
}

PinboardPage.propTypes = {
  params: PropTypes.object,
  initialRequested: PropTypes.bool,
  pinboardPageLoading: PropTypes.bool,
  isEmptyPinboard: PropTypes.bool,
  hasCMS: PropTypes.bool,
  requestCMS: PropTypes.func,
  isShownPinboardsList: PropTypes.bool,
  hideShowPinboardsList: PropTypes.func,
};

PinboardPage.defaultProps = {
  itemsByTypes: {},
  initialRequested: true,
  requestCMS: () => {},
};
