import cx from 'classnames';
import React from 'react';
import SearchBarContainer from 'containers/Shared/SearchBarContainer';
import SearchResultsContainer from 'containers/Shared/SearchResultsContainer';
import ProjectSummary from 'components/MainPage/MainPageContent/ProjectSummary';
import style from 'styles/MainPage/MainPageContent.sass';


const MainPageContent = React.createClass({
  propTypes: {
    topLeft: React.PropTypes.number
  },

  render() {
    const topLeft = this.props.topLeft;
    const searchBarWrapperClassNames = cx('search-wrapper animation', { 'top-left': topLeft });
    const projectSummaryClassNames = cx(style.mainPageContent, { 'top-left': topLeft });

    return (
      <div className={ projectSummaryClassNames }>
        <ProjectSummary topLeft={ topLeft } />
        <div className='holder'>
          <div className={ searchBarWrapperClassNames }>
            <SearchBarContainer />
          </div>
        </div>
        <SearchResultsContainer />
      </div>
    );
  }
});

export default MainPageContent;
