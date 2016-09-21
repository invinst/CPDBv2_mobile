import cx from 'classnames';
import React from 'react';
import SearchBarContainer from 'containers/Shared/SearchBarContainer';
import SearchResultsContainer from 'containers/Shared/SearchResultsContainer';
import Header from 'components/MainPage/MainPageContent/Header';
import style from 'styles/MainPage/MainPageContent.sass';


const MainPageContent = React.createClass({
  propTypes: {
    topLeft: React.PropTypes.number,
    query: React.PropTypes.string,
  },

  render() {
    const { topLeft, query } = this.props;
    const searchBarWrapperClassNames = cx('search-wrapper animation', { 'top-left': topLeft });
    const headerClassNames = cx(style.mainPageContent, { 'top-left': topLeft });
    const searchDescriptionClassNames = cx('search-description', { 'hidden': !!query });

    return (
      <div className={ headerClassNames }>
        <Header topLeft={ topLeft } />
        <div className='wrapper animation'>
          <div className='holder'>
            <div className={ searchBarWrapperClassNames }>
              <SearchBarContainer />
            </div>
          </div>
          <div className={ searchDescriptionClassNames }>Type the name of a police officer, badge number, or CRID number.</div>
        </div>

        <SearchResultsContainer />
      </div>
    );
  }
});

export default MainPageContent;
