import React, {
  Component,
  PropTypes
} from 'react';
import cx from 'classnames';
import style from 'styles/MainPage.sass';

import MainPageContentContainer from 'containers/MainPage/MainPageContentContainer';
import BottomSheetContainer from 'containers/BottomSheetContainer';
import { instantScrollToTop } from 'utils/NavigationUtil';


class MainPage extends Component {
  componentDidMount() {
    this.props.fetchSuggestedSearchItems();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      instantScrollToTop();
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
        <MainPageContentContainer topLeft={ isSearchFocused } query={ query } />
        <BottomSheetContainer location={ this.props.location }>
          {
            children && React.cloneElement(children, {
              key: location.pathname
            })
          }
        </BottomSheetContainer>
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
  location: PropTypes.object
};

MainPage.defaultProps = {
  isSearchFocused: false,
  query: '',
  urlQuery: '',
  location: {
    pathname: ''
  }
};

export default MainPage;
