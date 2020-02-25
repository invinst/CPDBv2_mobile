import React from 'react';
import PropTypes from 'prop-types';

const BreadcrumbItem = ({ label }) => (
  <span>{ label }</span>
);

BreadcrumbItem.propTypes = {
  label: PropTypes.string,
};

export default BreadcrumbItem;
