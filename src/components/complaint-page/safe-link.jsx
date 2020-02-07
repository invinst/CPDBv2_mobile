import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const SafeLink = ({ to='', children, ...rest }) => {
  if (to) {
    return (
      <Link to={ to } { ...rest } >
        { children }
      </Link>
    );
  }

  return (
    <div { ...rest }>{children}</div>
  );
};

SafeLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

export default SafeLink;
