import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import Footer from 'components/footer';
import style from './main-page.sass';


class MainPage extends Component {
  componentDidMount() {
    const { fetchSuggestedSearchItems, routeChanged, location } = this.props;
    fetchSuggestedSearchItems();
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
        <Footer />
      </div>
    );
  }
}

MainPage.propTypes = {
  fetchSuggestedSearchItems: PropTypes.func.isRequired,
  query: PropTypes.string,
  urlQuery: PropTypes.string,
  children: PropTypes.object,
  location: PropTypes.object,
  routeChanged: PropTypes.func
};

MainPage.defaultProps = {
  query: '',
  urlQuery: '',
  location: {
    pathname: ''
  },
  routeChanged: () => {},
  fetchSuggestedSearchItems: () => {}
};

export default MainPage;
