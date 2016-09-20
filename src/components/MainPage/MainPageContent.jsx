import cx from 'classnames';
import React from 'react';
import SearchBarContainer from 'containers/Shared/SearchBarContainer';
import SearchResultsContainer from 'containers/Shared/SearchResultsContainer';
import Header from 'components/MainPage/MainPageContent/Header';
import VFTG from 'components/MainPage/MainPageContent/VFTG';
import style from 'styles/MainPage/MainPageContent.sass';


const MainPageContent = React.createClass({
  propTypes: {
    topLeft: React.PropTypes.number
  },

  render() {
    const topLeft = this.props.topLeft;
    const searchBarWrapperClassNames = cx('search-wrapper animation', { 'top-left': topLeft });
    const headerClassNames = cx(style.mainPageContent, { 'top-left': topLeft });

    return (
      <div className={ headerClassNames }>
        <Header topLeft={ topLeft } />
        <div className='wrapper animation'>
          <div className='holder'>
            <div className={ searchBarWrapperClassNames }>
              <SearchBarContainer />
            </div>
          </div>
          <div className='search-description'>Type the name of a police officer, badge number, or CRID number.</div>
        </div>

        <SearchResultsContainer />
        <VFTG topLeft={ topLeft } />
      </div>
    );
  }
});

export default MainPageContent;
