import cx from 'classnames';
import React, { Component } from 'react';
import SearchBarContainer from 'containers/Shared/SearchBarContainer';
import SearchResultsContainer from 'containers/Shared/SearchResultsContainer';
import VFTGContainer from 'containers/MainPage/MainPageContent/VFTGContainer';
import Header from 'components/MainPage/MainPageContent/Header';
import FAQ from 'components/MainPage/MainPageContent/FAQ';
import About from 'components/MainPage/MainPageContent/About';
import Collaborate from 'components/MainPage/MainPageContent/Collaborate';
import Footer from 'components/MainPage/MainPageContent/Footer';
import style from 'styles/MainPage/MainPageContent.sass';


export default class MainPageContent extends Component {

  componentWillMount() {
    this.props.requestLandingPage();
  }

  render() {
    console.log('Main Page', this.props);
    const { topLeft, query, aboutSection, collaborateSection, faqSection } = this.props;
    const searchBarWrapperClassNames = cx('search-wrapper animation', { 'top-left': topLeft });
    const headerClassNames = cx(style.mainPageContent, { 'top-left': topLeft });

    const searchDescriptionClassNames = cx('search-description', { 'hidden': !!query });
    const landingPageHeight = document.documentElement.clientHeight;

    return (
      <div className={ headerClassNames }>
        <div style={ { height: landingPageHeight } }>
          <Header topLeft={ topLeft } />
          <div className='wrapper animation'>
            <div className='holder'>
              <div className={ searchBarWrapperClassNames }>
                <SearchBarContainer />
              </div>
            </div>
            <div
              className={ searchDescriptionClassNames }>Type the name of a police officer, badge number, or CRID number.
            </div>
          </div>
        </div>

        <SearchResultsContainer />
        <FAQ faqSection={ faqSection }/>
        <VFTGContainer />
        <About aboutSection={ aboutSection } />
        <Collaborate collaborateSection={ collaborateSection } />
        <Footer />
      </div>
    );
  }
};

MainPageContent.defaultProps = {
  requestLandingPage: () => {}
};

MainPageContent.propTypes = {
    topLeft: React.PropTypes.number,
    query: React.PropTypes.string,
    aboutSection: React.PropTypes.object,
    collaborateSection: React.PropTypes.object,
    requestLandingPage: React.PropTypes.func
};
