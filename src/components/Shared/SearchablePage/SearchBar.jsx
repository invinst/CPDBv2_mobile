import React, { PropTypes } from 'react';
import cx from 'classnames';

import style from 'styles/Shared/SearchablePage/SearchBar.sass';
import searchIcon from 'img/ic-audio.svg';


const SearchBar = React.createClass({
  propTypes: {
    focus: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    inputChanged: PropTypes.func.isRequired,
    suggestTerm: PropTypes.func.isRequired,
    isSearchFocused: PropTypes.number,
    query: PropTypes.string,
  },

  onInputChange(event) {
    const { suggestTerm, inputChanged } = this.props;
    const query = event.currentTarget.value;
    suggestTerm({ 'query': query });
    inputChanged(query);
  },

  onFocus() {
    this.props.focus();
  },

  onBlur() {
    const { query, blur } = this.props;
    if (!query) {
      blur();
    }
  },

  onSearchIconClick() {
    this.props.clear();
  },

  render() {
    const { isSearchFocused, query } = this.props;
    const iconClassName = cx('search-icon', {
      'hidden': !isSearchFocused
    });

    return (
      <div className={ cx(style.searchBar, 'search-bar animation') }>
        <img src={ searchIcon } className={ iconClassName } onClick={ this.onSearchIconClick } />
        <input
          className='input-text'
          placeholder='Search'
          ref='input'
          onChange={ this.onInputChange }
          onFocus={ this.onFocus }
          value={ query }
          onBlur={ this.onBlur }/>
      </div>
    );
  }
});

export default SearchBar;
