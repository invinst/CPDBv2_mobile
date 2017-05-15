import { Children } from 'react';

export function hasGrandchildren(component) {
  let result = false;
  Children.forEach(component.props.children, (child) => {
    if (Children.count(child.props.children) > 0) {
      result = true;
    }
  });
  return result;
}

export function hasChildren(component) {
  return Children.count(component.props.children) > 0;
}
