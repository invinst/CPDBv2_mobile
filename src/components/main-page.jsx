import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import style from './main-page.sass';


class MainPage extends Component {
  componentDidMount() {
    const { routeChanged, location } = this.props;
    routeChanged({ from: '', to: location.pathname });
  }

  componentDidUpdate(prevProps) {
    const { location, routeChanged } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      routeChanged({ from: prevProps.location.pathname, to: location.pathname });
    }
  }

  render() {
    return (
      <div className={ cx('content', style.mainPage) }>
        { this.props.children }
      </div>
    );
  }
}

MainPage.propTypes = {
  query: PropTypes.string,
  urlQuery: PropTypes.string,
  children: PropTypes.object,
  location: PropTypes.object,
  routeChanged: PropTypes.func,
};

MainPage.defaultProps = {
  query: '',
  urlQuery: '',
  location: {
    pathname: '',
  },
  routeChanged: () => {},
};

export default MainPage;
