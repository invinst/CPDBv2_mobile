import React from 'react';
import cx from 'classnames';
import objectAssign from 'object-assign';
import Base from 'components/Base.react';
import SuggestionAPI from 'utils/SuggestionAPI';
import SearchBarActions from 'actions/MainPage/SearchBarActions';
import SearchBarStore from 'stores/MainPage/SearchBarStore';


const SearchBar = React.createClass(objectAssign(Base(SearchBarStore), {
  getInitialState() {
    return {
      'status': 'blank',
      'term': ''
    };
  },

  _onInputChange(event) {
    const term = event.currentTarget.value;
    SearchBarActions.changed(term);
    SuggestionAPI.get(term);
  },

  _onFocus() {
    SearchBarActions.focus();
  },

  _onBlur() {
    if (!this.state.term) {
      SearchBarActions.blur();
    }
  },

  _onSearchIconClick() {
    SearchBarActions.clear();
  },

  componentDidMount() {
    const term = this.props.term || '';
    if (term) {
      SuggestionAPI.get(term);
    }
    SearchBarStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SearchBarStore.removeChangeListener(this._onChange);
    SearchBarStore.recycle();
  },

  render() {
    const status = this.state.status;
    const iconClassName = cx('icon', {
      'icon-search': status == 'blank',
      'icon-close': status == 'focus'
    });
    return (
      <div className='search-bar animation'>
        <input className='input-text' placeholder='Search officers or complaints'
          onChange={ this._onInputChange }
          onFocus={ this._onFocus }
          value={ this.state.term }
          onBlur={ this._onBlur }/>
        <span className={ iconClassName } onClick={ this._onSearchIconClick }></span>
      </div>
    );
  }
}));

export default SearchBar;
