import React, { PropTypes } from 'react';

const BreadcrumbItem = ({ label }) => (
  <span>{ label }</span>
);

BreadcrumbItem.propTypes = {
  label: PropTypes.string
};

export default BreadcrumbItem;
