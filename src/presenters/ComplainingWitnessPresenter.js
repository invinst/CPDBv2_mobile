import HelperUtil from 'utils/HelperUtil';
import GenderPresenter from 'presenters/GenderPresenter';


const ComplainingWitnessPresenter = complainingWitness => {
  const description = () => {
    const age = HelperUtil.fetch(complainingWitness, 'age', 'unknown');
    const ageDisplay = HelperUtil.format('Age {age}', {'age': age});
    const gender = GenderPresenter(complainingWitness['gender']).humanReadable;
    const race = HelperUtil.fetch(complainingWitness, 'race', 'Race unknown');

    return [gender, race, ageDisplay].join(', ');
  };

  return {
    description: description()
  };
};

export default ComplainingWitnessPresenter;
