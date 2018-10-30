import { createSelector } from 'reselect';


export const breadcrumbSelector = state => state.breadcrumb;

const getBreadcrumbItemKey = (state, props) => props.url;
const getBreadcrumbMapping = state => state.breadcrumbMapping;

export const breadcrumbTextSelector = createSelector(
  getBreadcrumbItemKey,
  getBreadcrumbMapping,
  (breadcrumbItemKey, mapping) => mapping[breadcrumbItemKey]
);
