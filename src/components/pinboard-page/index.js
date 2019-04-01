import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './pinboard-page.sass';
import AnimatedSocialGraph from 'components/common/animated-social-graph';


export default class PinboardPage extends Component {
  componentDidMount() {
    const { fetchPinboard, fetchPinboardSocialGraph } = this.props;
    const pinboardID = this.props.params.pinboardId;
    fetchPinboard(pinboardID);
    fetchPinboardSocialGraph(pinboardID);
  }

  render() {
    const { pinboard, graphData } = this.props;
    return (
      <div className={ styles.pinboardPage }>
        <Link to='/search/'>Back to search page</Link>
        <div className='pinboard-info'>
          <div className='pinboard-title'>{ pinboard.title }</div>
          <div className='pinboard-description'>{ pinboard.description }</div>
        </div>
        <div className='data-visualizations'>
          <div className='pinboard-social-graph'>
            <AnimatedSocialGraph
              officers={ graphData.officers }
              coaccusedData={ graphData.coaccusedData }
              listEvent={ graphData.listEvent }
            />
          </div>
        </div>
      </div>
    );
  }
}

PinboardPage.propTypes = {
  pinboard: PropTypes.object,
  graphData: PropTypes.object,
  params: PropTypes.object,
  fetchPinboard: PropTypes.func,
  fetchPinboardSocialGraph: PropTypes.func,
};

PinboardPage.defaultProps = {
  fetchPinboard: () => {},
  fetchPinboardSocialGraph: () => {},
};
