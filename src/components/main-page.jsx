import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import config from 'config';
import style from './main-page.sass';
import 'styles/toast.sass';
import { getPageRoot } from 'utils/url-util';
import App from 'components/app';

toast.configure();

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
    const { location } = this.props;
    const { pinboard: enablePinboardFeature } = config.enableFeatures;

    return (
      <div className={ cx('content', style.mainPage, { 'pinboard-disabled': !enablePinboardFeature }) }>
        <App location={ location }/>
        <ToastContainer
          pauseOnFocusLoss={ false }
          closeButton={ false }
          hideProgressBar={ true }
          autoClose={ 3000 }
          className={ getPageRoot(location.pathname) }
        />
      </div>
    );
  }
}

MainPage.propTypes = {
  query: PropTypes.string,
  children: PropTypes.object,
  location: PropTypes.object,
  routeChanged: PropTypes.func,
};

MainPage.defaultProps = {
  query: '',
  location: {
    pathname: '',
  },
  routeChanged: () => {},
};

export default MainPage;
