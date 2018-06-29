import moment from 'moment';
import config from 'config';


const getThisYear = () => {
  if (config.appEnv === 'test') {
    return 2017;
  }
  /* istanbul ignore next */
  return (new Date()).getFullYear();
};

export const formatDate = (str) => {
  let date = moment(str);
  return date.isValid() ? date.format('ll').toUpperCase() : null;
};

const formatCareerDate = inputDate => moment(inputDate).format('ll').toUpperCase();

export const getCareerDuration = (dateOfAppt, dateOfResignation) => {
  if (!dateOfAppt && !dateOfResignation) {
    return '';
  }

  const careerStart = formatCareerDate(dateOfAppt);
  const careerEnd = dateOfResignation ? formatCareerDate(dateOfResignation) : 'Present';
  return `${careerStart} — ${careerEnd}`;
};

export const getCurrentAge = (birthYear) => (birthYear ? getThisYear() - birthYear : null);
