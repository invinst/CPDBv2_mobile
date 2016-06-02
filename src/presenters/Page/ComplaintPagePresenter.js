import u from 'utils/HelperUtil';
import HashUtil from 'utils/HashUtil';
import CollectionUtil from 'utils/CollectionUtil';


const ComplaintPagePresenter = (data, categoryHashId) => {
  const categoryId = CollectionUtil.first(HashUtil.decode(categoryHashId));

  const officerAllegations = () => {
    const officerAllegations = u.fetch(data, 'allegation.officer_allegation_set', []);
    officerAllegations.sort((a, b) => b.officer['allegations_count'] - a.officer['allegations_count']);

    return officerAllegations;
  };

  const getAgainstOfficerAllegations = () => officerAllegations().filter(officerAllegation =>
    u.fetch(officerAllegation, 'cat.id', 0) == categoryId);

  const getAccompliceOfficerAllegations = () => officerAllegations().filter(officerAllegation =>
    u.fetch(officerAllegation, 'cat.id', 0) != categoryId);

  const currentOfficerAllegation = () => {
    const againstOfficerAllegations = getAgainstOfficerAllegations();
    return againstOfficerAllegations && againstOfficerAllegations[0];
  };

  const numberOfOfficerAllegations = () => Object.keys(CollectionUtil.groupBy(officerAllegations(),
    officerAllegation => u.fetch(officerAllegation, 'cat.id'))).length;

  return {
    accompliceOfficerAllegation: getAccompliceOfficerAllegations(),
    againstOfficerAllegations: getAgainstOfficerAllegations(),
    allegation: u.fetch(data, 'allegation', {}),
    complainingWitnesses: u.fetch(data, 'complaining_witnesses'),
    currentOfficerAllegation: currentOfficerAllegation(),
    officerAllegations: officerAllegations(),
    isInvalidCategory: !currentOfficerAllegation(),
    numberOfOfficerAllegations: numberOfOfficerAllegations()
  };
};

export default ComplaintPagePresenter;
