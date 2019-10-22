import { createSelector } from 'reselect';
import { compact, get } from 'lodash';


export const breadcrumbSelector = state => get(state, 'breadcrumb', { breadcrumbs: [] });

const getBreadcrumbItemKey = (state, props) => {
  const urlSegments = compact(props.url.split('/'));
  if (urlSegments[0] === 'officer') {
    return `/${urlSegments.slice(0, 3).join('/')}/`;
  }
  if (urlSegments[0] === 'pinboard') {
    return `/${urlSegments.slice(0, 2).join('/')}/`;
  }
  return props.url;
};
const getBreadcrumbMapping = state => state.breadcrumbMapping;

export const breadcrumbTextSelector = createSelector(
  getBreadcrumbItemKey,
  getBreadcrumbMapping,
  (breadcrumbItemKey, mapping) => mapping[breadcrumbItemKey]
);
