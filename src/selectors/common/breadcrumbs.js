import { createSelector } from 'reselect';


const getBreadcrumbItemKey = (state, props) => {
  return props.url;
};
const getBreadcrumbMapping = state => state.breadcrumbMapping;

export const breadcrumbTextSelector = createSelector(
  getBreadcrumbItemKey,
  getBreadcrumbMapping,
  (breadcrumbItemKey, mapping) => mapping[breadcrumbItemKey]
);
