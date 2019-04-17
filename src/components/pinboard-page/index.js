import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import PinnedSection from './pinned-section';


export default class PinboardPage extends Component {
  constructor(props) {
    super(props);
    this.fetchPinboardData = this.fetchPinboardData.bind(this);
  }

  componentDidMount() {
    this.fetchPinboardData(this.props.params.pinboardId);
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
      fetchPinboard,
      fetchPinboardComplaints,
      fetchPinboardOfficers,
      fetchPinboardTRRs,
    } = this.props;
    fetchPinboard(id);
    fetchPinboardComplaints(id);
    fetchPinboardOfficers(id);
    fetchPinboardTRRs(id);
  }

  render() {
    const { itemsByTypes, removeItemInPinboardPage } = this.props;
    return (
      <div>
        <Link to='/search/'>Back to search page</Link>
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
};

PinboardPage.defaultProps = {
  itemsByTypes: {},
  fetchPinboard: () => {},
  fetchPinboardComplaints: () => {},
  fetchPinboardOfficers: () => {},
  fetchPinboardTRRs: () => {},
};
