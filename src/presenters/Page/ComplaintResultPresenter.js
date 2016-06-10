import u from 'utils/HelperUtil';
import CollectionUtil from 'utils/CollectionUtil';

const ComplaintResultPresenter = meta => {
  const groupByCategory = () => {
    const officerAllegationList = u.fetch(meta, 'officer_allegations', []);
    return CollectionUtil.groupBy(officerAllegationList, officerAllegation => u.fetch(officerAllegation, 'cat.id', 0));
  };

  return {
    'groupByCategory': groupByCategory()
  };
};

export default ComplaintResultPresenter;
