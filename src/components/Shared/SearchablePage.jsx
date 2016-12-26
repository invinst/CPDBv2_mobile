import cx from 'classnames';
import React from 'react';

import SearchBarContainer from 'containers/Shared/SearchBarContainer';
import SearchResultsContainer from 'containers/Shared/SearchResultsContainer';

import style from 'styles/Shared/SearchablePage.sass';


const SearchablePage = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    focus: React.PropTypes.number
  },

  render() {
    const { focus } = this.props;
    const childrenClassName = cx('child-content', { 'invisible': focus });
    const searchResultClassName = cx('result-content', { 'invisible': !focus });

    return (
      <div className={ style.searchablePage }>
        <SearchBarContainer />
        <div className={ searchResultClassName }>
          <SearchResultsContainer />
        </div>
        <div className={ childrenClassName }>
          { this.props.children }
        </div>
      </div>
    );
  }
});

export default SearchablePage;
