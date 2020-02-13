import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';

import styles from './with-header.sass';
import IOSPeek from 'components/common/ios-peek';
import BreadcrumbContainer from 'containers/breadcrumb';


const WithHeader = ({ router, location, routes, params, children, className, ...rest }) => {
  return (
    <React.Fragment>
      <IOSPeek className={ styles.breadcrumbsIosPeek }/>
      <div className={ cx(styles.header) }>
        <BreadcrumbContainer />
      </div>
      <div className={ cx(styles.content, className) } { ...rest }>
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
