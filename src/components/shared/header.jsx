import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import Breadcrumbs from 'redux-breadcrumb-trail';

import separatorImg from 'img/disclosure-indicator.svg';
import style from './header.sass';


const Header = ({ location, routes, params }) => {
  const separatorRenderer = () => <li className='separator'><img src={ separatorImg } /></li>;
  const breadcrumbsItemRenderer = (properties) => <li className='breadcrumb-item-wrapper'>{ properties.children }</li>;

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
  routes: PropTypes.array,
};

export default withRouter(Header);
