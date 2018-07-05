import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import constants from 'constants';
import style from './landing-page.sass';


export default class LandingPage extends Component {
  componentDidMount() {
    const {
      requestLandingPage, pushBreadcrumbs, location, routes, params
    } = this.props;
    pushBreadcrumbs({ location, routes, params });
    requestLandingPage();
  }

  componentWillReceiveProps(nextProps) {
    const { location, params, routes, pushBreadcrumbs } = nextProps;
    if (location !== this.props.location) {
      pushBreadcrumbs({ location, params, routes });
    }
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
  requestLandingPage: () => {},
  pushBreadcrumbs: () => {}
};

LandingPage.propTypes = {
  pushBreadcrumbs: PropTypes.func,
  requestLandingPage: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
};
