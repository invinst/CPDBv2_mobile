import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import style from './main-page.sass';
import 'styles/toast.sass';
import { getPageRoot } from 'utils/url-util';

toast.configure();

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
  fetchSuggestedSearchItems: PropTypes.func.isRequired,
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
  fetchSuggestedSearchItems: () => {},
};

export default MainPage;
