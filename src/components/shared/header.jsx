import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { Sticky, StickyContainer } from 'react-sticky';
import Breadcrumbs from 'redux-breadcrumb-trail';
import cx from 'classnames';
import { get, includes } from 'lodash';

import styles from './header.sass';
import IOSPeek from 'components/common/ios-peek';


const WithHeader = ({ router, location, routes, params, children, ...rest }) => {
  const separatorRenderer = () => <li className='separator'><img src='/img/disclosure-indicator.svg' /></li>;
  const breadcrumbsItemRenderer = (properties) => {
    const autoWidth = includes(get(properties, 'children.props.to'), '/pinboard/');
    return <li className={ cx('breadcrumb-item-wrapper', { 'auto-width': autoWidth }) }>{ properties.children }</li>;
  };

  return (
    <StickyContainer { ...rest }>
      <IOSPeek className={ styles.breadcrumbsIosPeek }/>
      <Sticky className={ styles.header }>
        <Breadcrumbs
          className='breadcrumbs'
          routes={ routes }
          params={ params }
          location={ location }
          separatorRenderer={ separatorRenderer }
          itemRenderer={ breadcrumbsItemRenderer }
        />
      </Sticky>
      { children }
    </StickyContainer>
  );
};

WithHeader.propTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
  children: PropTypes.node,
};

export default withRouter(WithHeader);
