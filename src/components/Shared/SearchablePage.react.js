import cx from 'classnames';
import objectAssign from 'object-assign';
import React from 'react';
import Base from 'components/Base.react';
import SearchBar from 'components/Shared/SearchablePage/SearchBar.react';
import SearchablePageStore from 'stores/Shared/SearchablePageStore';
import SearchResults from 'components/Shared/SearchablePage/SearchResults.react';

import style from 'styles/Shared/SearchablePage.sass';

const SearchablePage = React.createClass(objectAssign(Base(SearchablePageStore, 'SearchablePage'), {
  getInitialState() {
    return {
      'focus': 0
    };
  },

  render() {
    const focus = this.state.focus;
    const childrenClassName = cx('child-content', { 'invisible': focus });
    const searchResultClassName = cx('result-content', { 'invisible': !focus });

    return (
      <div className={ style.searchablePage }>
        <SearchBar />
        <div className={ searchResultClassName }>
          <SearchResults />
        </div>
        <div className={ childrenClassName }>
          { this.props.children }
        </div>
      </div>
    );
  }
}));

export default SearchablePage;
