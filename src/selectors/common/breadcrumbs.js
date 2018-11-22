import { createSelector } from 'reselect';
import { compact } from 'lodash';


export const breadcrumbSelector = state => state.breadcrumb;

const getBreadcrumbItemKey = (state, props) => {
  const urlSegments = compact(props.url.split('/'));
  if (urlSegments[0] === 'officer') {
    return urlSegments.slice(0, 3).join('/') + '/';
  }
  return props.url;
};
const getBreadcrumbMapping = state => state.breadcrumbMapping;

export const breadcrumbTextSelector = createSelector(
  getBreadcrumbItemKey,
  getBreadcrumbMapping,
  (breadcrumbItemKey, mapping) => mapping[breadcrumbItemKey]
);
