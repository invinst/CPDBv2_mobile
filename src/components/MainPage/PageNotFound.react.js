import cx from 'classnames';
import React from 'react';


const PageNotFound = React.createClass({
  propTypes: {
    topLeft: React.PropTypes.bool
  },

  render() {
    const classNames = cx('animation', 'pad', {'top-left': this.props.topLeft});

    return (
      <div id='page-not-found' className={ classNames }>
        <div className='page-not-found-header'>
          Sorry, page not found!
        </div>
        <div className='page-not-found-description'>
          <div>
            The link you entered isn’t recorded in our database. Please start a new search by entering in keywords
            below.
          </div>
        </div>
      </div>
    );
  }
});

export default PageNotFound;
