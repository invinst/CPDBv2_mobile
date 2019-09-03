import React, { PropTypes } from 'react';
import { Link } from 'react-router';


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
