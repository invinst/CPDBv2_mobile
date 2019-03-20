import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


export default class PinboardPage extends Component {
  componentDidMount() {
    const { fetchPinboard } = this.props;
    const pinboardID = this.props.params.pinboardId;
    fetchPinboard(pinboardID);
  }

  render() {
    const { pinboard } = this.props;
    return (
      <div>
        <Link to='/search/'>Back to search page</Link>
        <div>
          { JSON.stringify(pinboard) }
        </div>
      </div>
    );
  }
}

PinboardPage.propTypes = {
  pinboard: PropTypes.object,
  params: PropTypes.object,
  fetchPinboard: PropTypes.func,
};
