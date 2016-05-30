import objectAssign from 'object-assign';
import React from 'react';
import Base from 'components/Base.react';
import About from 'components/Shared/About.react';
import MainPageContent from 'components/MainPage/MainPageContent.react';
import MainPageStore from 'stores/MainPageStore';
import HelperUtil from 'utils/HelperUtil';
import SuggestionAPI from 'utils/SuggestionAPI';


const MainPage = React.createClass(objectAssign(Base(MainPageStore), {
  getInitialState() {
    return {
      'isSearchFocused': 0
    };
  },

  componentDidMount() {
    const term = HelperUtil.fetch(this, 'props.params.query', '');
    const santinizedTerm = term.replace(/\+|\-|\_/g, ' ');

    MainPageStore.addChangeListener(this._onChange);

    if (santinizedTerm) {
      SuggestionAPI.get(santinizedTerm);
    }
  },

  render() {
    const isSearchFocused = this.state.isSearchFocused;

    return (
      <div className='main-page content'>
        <MainPageContent topLeft={ isSearchFocused } />
        <About topLeft={ isSearchFocused }/>
      </div>
    );
  }
}));

export default MainPage;
