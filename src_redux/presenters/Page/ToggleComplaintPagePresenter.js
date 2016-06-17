import u from 'utils/HelperUtil';
import CollectionUtil from 'utils/CollectionUtil';


const ToggleComplaintPagePresenter = officerAllegations => {
  const officerAllegationList = officerAllegations || [];

  const groupByCategory = () => CollectionUtil.groupBy(officerAllegationList, officerAllegation =>
    u.fetch(officerAllegation, 'cat.id', 0));

  return {
    groupByCategory: groupByCategory()
  };
};


export default ToggleComplaintPagePresenter;
