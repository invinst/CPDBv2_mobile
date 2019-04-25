import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import cx from 'classnames';

import styles from './pinboard-page.sass';
import PinnedSection from './pinned-section';
import SearchBar from './search-bar';
import Header from './header';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';


export default class PinboardPage extends Component {
  constructor(props) {
    super(props);
    this.fetchPinboardData = this.fetchPinboardData.bind(this);
  }

  componentDidMount() {
    const { pinboard, fetchPinboard, params } = this.props;
    const idOnPath = params.pinboardId;
    const idInStore = pinboard.id;

    fetchPinboard(idOnPath);
    if (idOnPath === idInStore) {
      this.fetchPinboardData(idOnPath);
    }
  }

  componentDidUpdate(prevProps) {
    const prevID = prevProps.pinboard.id;
    const currID = this.props.pinboard.id;

    if (prevID !== currID) {
      browserHistory.replace(`/pinboard/${currID}/`);
      this.fetchPinboardData(currID);
    }
  }

  fetchPinboardData(id) {
    const {
      fetchPinboardComplaints,
      fetchPinboardOfficers,
      fetchPinboardTRRs,
      fetchPinboardSocialGraph,
      fetchPinboardGeographicData,
    } = this.props;
    fetchPinboardComplaints(id);
    fetchPinboardOfficers(id);
    fetchPinboardTRRs(id);
    fetchPinboardSocialGraph(id);
    fetchPinboardGeographicData(id);
  }

  render() {
    const {
      pinboard,
      changePinboardTab,
      currentTab,
      hasMapMarker,
      itemsByTypes,
      removeItemInPinboardPage,
    } = this.props;
    return (
      <div className={ cx(styles.pinboardPage, 'pinboard-page') }>
        <Header />
        <SearchBar />
        <div className='pinboard-info'>
          <div className='pinboard-title'>{ pinboard.title }</div>
          <div className='pinboard-description'>{ pinboard.description }</div>
        </div>
        <div className='data-visualizations'>
          <PinboardPaneSection
            changePinboardTab={ changePinboardTab }
            currentTab={ currentTab }
            hasMapMarker={ hasMapMarker }
          />
        </div>
        <PinnedSection
          itemsByTypes={ itemsByTypes }
          removeItemInPinboardPage={ removeItemInPinboardPage }/>
      </div>
    );
  }
}

PinboardPage.propTypes = {
  params: PropTypes.object,
  pinboard: PropTypes.object,
  itemsByTypes: PropTypes.object,
  fetchPinboard: PropTypes.func,
  fetchPinboardComplaints: PropTypes.func,
  fetchPinboardOfficers: PropTypes.func,
  fetchPinboardTRRs: PropTypes.func,
  removeItemInPinboardPage: PropTypes.func,
  fetchPinboardSocialGraph: PropTypes.func,
  fetchPinboardGeographicData: PropTypes.func,
  changePinboardTab: PropTypes.func,
  currentTab: PropTypes.string,
  hasMapMarker: PropTypes.bool,
};

PinboardPage.defaultProps = {
  itemsByTypes: {},
  fetchPinboard: () => {},
  fetchPinboardComplaints: () => {},
  fetchPinboardOfficers: () => {},
  fetchPinboardTRRs: () => {},
  fetchPinboardSocialGraph: () => {},
  fetchPinboardGeographicData: () => {},
};
