import React from 'react';
import cx from 'classnames';

import SearchablePageContainer from 'containers/Shared/SearchablePageContainer';
import style from 'styles/ComplaintPage/NotMatchedCategoryPage.sass';


const NotMatchedCategoryPage = React.createClass({
  render() {
    return (
      <SearchablePageContainer>
        <div className={ cx(style.notMatchedCategoryPage, 'container content') }>
          <h3 className='message-title'>
            Invalid page!
          </h3>
          <div className='message-content'>
            The complaint with this category is not recorded in our database. Please use search box for new search
            session.
          </div>
        </div>
      </SearchablePageContainer>
    );
  }
});

export default NotMatchedCategoryPage;
