import React, { Component, PropTypes } from 'react';
import style from 'styles/LandingPage.sass';
import { Link } from 'react-router';
import constants from 'constants';


export default class LandingPage extends Component {

  componentDidMount() {
    this.props.requestLandingPage();
  }

  render() {
    return (
      <div className={ style.landingPage }>
        <div className='full-height-wrapper'>
          <div className='title'>Citizens Police Data Project</div>
          <Link className='search-bar' to={ constants.SEARCH_PATH }>
            Search
          </Link>
        </div>
      </div>
    );
  }
}

LandingPage.defaultProps = {
  requestLandingPage: () => {}
};

LandingPage.propTypes = {
  requestLandingPage: PropTypes.func,
};
