import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';

import config from 'config';
import style from './app.sass';
import 'styles/toast.sass';
import { getPageRoot } from 'utils/url-util';
import RouterRoot from 'components/router-root';

toast.configure();
Modal.setAppElement('body');

class App extends Component {
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
      <div className={ cx('content', style.app, { 'pinboard-disabled': !enablePinboardFeature }) }>
        <RouterRoot location={ location }/>
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

App.propTypes = {
  query: PropTypes.string,
  children: PropTypes.object,
  location: PropTypes.object,
  routeChanged: PropTypes.func,
};

App.defaultProps = {
  query: '',
  location: {
    pathname: '',
  },
  routeChanged: () => {},
};

export default App;
