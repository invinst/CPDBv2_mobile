import React, {
  Component,
  PropTypes
} from 'react';
import cx from 'classnames';
import style from 'styles/MainPage.sass';

import MainPageContent from 'components/MainPage/MainPageContent';
import About from 'components/Shared/About';


class MainPage extends Component {
  componentDidMount() {
    const { suggestTerm, query } = this.props;
    const sanitizedQuery = query.replace(/\+|\-|\_/g, ' ');

    if (sanitizedQuery) {
      suggestTerm({ query: sanitizedQuery });
    }
  }

  render() {
    const { isSearchFocused } = this.props;

    return (
      <div className={ cx('content', style.mainPage) }>
        <MainPageContent topLeft={ isSearchFocused }/>
        <About topLeft={ isSearchFocused }/>
      </div>
    );
  }
}

MainPage.propTypes = {
  suggestTerm: PropTypes.func.isRequired,
  query: PropTypes.string,
  isSearchFocused: PropTypes.bool
};

MainPage.defaultProps = {
  isSearchFocused: false,
  query: ''
};

export default MainPage;
