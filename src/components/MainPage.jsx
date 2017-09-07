import React, {
  Component,
  PropTypes
} from 'react';
import cx from 'classnames';
import style from 'styles/MainPage.sass';

import MainPageContentContainer from 'containers/MainPage/MainPageContentContainer';
import BottomSheetContainer from 'containers/BottomSheetContainer';


class MainPage extends Component {
  componentDidMount() {
    const { fetchSuggestedSearchItems, routeChanged, location } = this.props;
    fetchSuggestedSearchItems();
    routeChanged(location.pathname);
  }

  componentDidUpdate(prevProps) {
    const { location, routeChanged } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      routeChanged(location.pathname);
    }
  }

  render() {
    const { isSearchFocused, query, children } = this.props;

    let bottomPaddingElement = null;
    if (this.props.location.pathname === '/') {
      bottomPaddingElement = <div className='bottom-padding'></div>;
    }

    return (
      <div className={ cx('content', style.mainPage, { gray: isSearchFocused }) }>
        { this.props.children }
        { bottomPaddingElement }
      </div>
    );
  }
}

MainPage.propTypes = {
  fetchSuggestedSearchItems: PropTypes.func.isRequired,
  query: PropTypes.string,
  urlQuery: PropTypes.string,
  children: PropTypes.object,
  isSearchFocused: PropTypes.number,
  location: PropTypes.object,
  routeChanged: PropTypes.func
};

MainPage.defaultProps = {
  isSearchFocused: false,
  query: '',
  urlQuery: '',
  location: {
    pathname: ''
  },
  routeChanged: () => {},
  fetchSuggestedSearchItems: () => {}
};

export default MainPage;
