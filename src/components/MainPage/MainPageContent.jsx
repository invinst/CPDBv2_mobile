import cx from 'classnames';
import React, { Component } from 'react';
import SearchBarContainer from 'containers/Shared/SearchBarContainer';
import SearchResultsContainer from 'containers/Shared/SearchResultsContainer';
import Header from 'components/MainPage/MainPageContent/Header';
import VFTGContainer from 'containers/MainPage/MainPageContent/VFTGContainer';
import style from 'styles/MainPage/MainPageContent.sass';


export default class MainPageContent extends Component {
  render() {
    const { topLeft, query } = this.props;
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
        <VFTGContainer />
      </div>
    );
  }
};

MainPageContent.propTypes = {
    topLeft: React.PropTypes.number,
    query: React.PropTypes.string,
};
