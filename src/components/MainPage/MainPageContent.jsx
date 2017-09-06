import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import Header from 'components/MainPage/MainPageContent/Header';
import Footer from 'components/MainPage/MainPageContent/Footer';
import style from 'styles/MainPage/MainPageContent.sass';
import { Link } from 'react-router';
import constants from 'constants';


export default class MainPageContent extends Component {
  componentWillMount() {
    this.props.requestLandingPage();
    this.height = window.innerHeight;
  }

  render() {
    const { topLeft, query, reportSection, children } = this.props;
    const headerClassNames = cx(style.mainPageContent, { 'top-left': topLeft });

    const searchDescriptionClassNames = cx('search-description', { 'hidden': !!query });

    return (
      <div className={ headerClassNames }>
        <div className='full-height-wrapper' style={ { height: `${this.height}px` } }>
          <Header topLeft={ topLeft } />
          <div className='wrapper animation'>
            <div className='holder'>
              <Link className='search-bar' to={ constants.SEARCH_PATH }>
                Search
              </Link>
            </div>
            <div
              className={ searchDescriptionClassNames }>Type the name of a police officer, badge number, or CRID number.
            </div>
            <Footer isSearchFocused={ topLeft } reportSection={ reportSection } />
          </div>

        </div>

        { children }

      </div>
    );
  }
}

MainPageContent.defaultProps = {
  requestLandingPage: () => {}
};

MainPageContent.propTypes = {
  topLeft: PropTypes.number,
  query: PropTypes.string,
  aboutSection: PropTypes.object,
  collaborateSection: PropTypes.object,
  requestLandingPage: PropTypes.func,
  faqSection: PropTypes.object,
  reportSection: PropTypes.object,
  children: PropTypes.array
};
