import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import Breadcrumbs from 'redux-breadcrumb-trail';
import cx from 'classnames';
import { get, includes } from 'lodash';

import style from './header.sass';


const Header = ({ location, routes, params }) => {
  const separatorRenderer = () => <li className='separator'><img src='/img/disclosure-indicator.svg' /></li>;
  const breadcrumbsItemRenderer = (properties) => {
    const autoWidth = includes(get(properties, 'children.props.to'), '/pinboard/');
    return <li className={ cx('breadcrumb-item-wrapper', { 'auto-width': autoWidth }) }>{ properties.children }</li>;
  };

  return (
    <div className={ style.header }>
      <Breadcrumbs
        className='breadcrumbs'
        routes={ routes }
        params={ params }
        location={ location }
        separatorRenderer={ separatorRenderer }
        itemRenderer={ breadcrumbsItemRenderer } />
    </div>
  );
};

Header.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array
};

export default withRouter(Header);
