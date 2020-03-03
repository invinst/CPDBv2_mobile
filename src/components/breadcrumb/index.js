import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { includes } from 'lodash';

import styles from './breadcrumb.sass';

const Breadcrumb = ({ breadcrumbItems }) => {
  return (
    <div className={ styles.breadcrumb }>
      <Link to={ '/' } className='breadcrumb-item'>cpdp</Link>
      {
        breadcrumbItems.map(({ path, text, isCurrent }) => {
          const autoWidth = includes(path, '/pinboard/');
          const breadcrumbItemClassName = autoWidth ? cx('breadcrumb-item', 'auto-width') : 'breadcrumb-item';
          return (
            <React.Fragment key={ path }>
              <li className='shareable-header-breadcrumb-separator'/>
              {
                isCurrent ?
                  <span className={ breadcrumbItemClassName }>{ text }</span> :
                  <Link to={ path } className={ breadcrumbItemClassName }>{ text }</Link>
              }
            </React.Fragment>
          );
        })
      }
    </div>
  );
};

Breadcrumb.propTypes = {
  breadcrumbItems: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    text: PropTypes.string,
    isCurrent: PropTypes.bool,
  })),
};

export default Breadcrumb;
