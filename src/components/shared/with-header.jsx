import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Breadcrumbs from 'redux-breadcrumb-trail';
import cx from 'classnames';
import { get, includes } from 'lodash';

import styles from './with-header.sass';
import IOSPeek from 'components/common/ios-peek';


const WithHeader = ({ router, location, routes, params, children, className, ...rest }) => {
  const separatorRenderer = () => <li className='separator'><img src='/img/disclosure-indicator.svg' /></li>;
  const breadcrumbsItemRenderer = (properties) => {
    const autoWidth = includes(get(properties, 'children.props.to'), '/pinboard/');
    return <li className={ cx('breadcrumb-item-wrapper', { 'auto-width': autoWidth }) }>{ properties.children }</li>;
  };

  return (
    <React.Fragment>
      <IOSPeek className={ styles.breadcrumbsIosPeek }/>
      <div className={ cx(styles.header, styles.sticky) }>
        <Breadcrumbs
          className='breadcrumbs'
          routes={ routes }
          params={ params }
          location={ location }
          separatorRenderer={ separatorRenderer }
          itemRenderer={ breadcrumbsItemRenderer }
        />
      </div>
      <div className={ cx(styles.stickyContent, className) } { ...rest }>
        { children }
      </div>
    </React.Fragment>
  );
};

WithHeader.propTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default withRouter(WithHeader);
