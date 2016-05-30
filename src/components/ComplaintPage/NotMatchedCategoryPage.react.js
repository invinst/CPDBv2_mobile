import React from 'react';
import SearchablePage from 'components/Shared/SearchablePage.react';


const NotMatchedCategoryPage = React.createClass({
  render() {
    return (
      <SearchablePage>
        <div className='not-matched-category-page container content'>
          <h3 className='message-title'>
            Invalid page!
          </h3>
          <div className='message-content'>
            The complaint with this category is not recorded in our database. Please use search box for new search
            session.
          </div>
        </div>
      </SearchablePage>
    );
  }
});

export default NotMatchedCategoryPage;
