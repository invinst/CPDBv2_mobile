import cx from 'classnames';
import React from 'react';
import SearchBar from 'components/Shared/SearchablePage/SearchBar.react';
import SearchResults from 'components/Shared/SearchablePage/SearchResults.react';
import ProjectSummary from 'components/MainPage/ProjectSummary.react';


const MainPageContent = React.createClass({
  propTypes: {
    topLeft: React.PropTypes.number
  },

  render() {
    const topLeft = this.props.topLeft;
    const searchBarWrapperClassNames = cx('search-wrapper animation', {'top-left': topLeft});
    const projectSummaryClassNames = cx('main-page-content', {'top-left': topLeft});

    return (
      <div className={ projectSummaryClassNames }>
        <ProjectSummary topLeft={ topLeft } />
        <div className={ searchBarWrapperClassNames }>
          <SearchBar />
        </div>
        <SearchResults />
      </div>
    );
  }
});

export default MainPageContent;
