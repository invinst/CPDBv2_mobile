import AppConstants from 'constants/AppConstants';
import S from 'string';
import DateUtil from 'utils/DateUtil';
import HashUtil from 'utils/HashUtil';
import u from 'utils/HelperUtil';


const OfficerAllegationPresenter = officerAllegation => {
  const finalFinding = () => {
    const abbrFinalFinding = u.fetch(officerAllegation, 'final_finding', '').toLowerCase();
    const finalFinding = u.fetch(AppConstants.FINAL_FINDINGS, abbrFinalFinding, 'Unknown');

    return finalFinding;
  };

  const finalStatus = () => {
    const closedStatus = u.format('Investigation Closed ({finalFinding})', {'finalFinding': finalFinding()});
    return isOpenInvestigation() ? 'Open Investigation' : closedStatus;
  };

  const startDate = () => DateUtil.sanitizeDate(u.fetch(officerAllegation, 'start_date', ''));

  const endDate = () => DateUtil.sanitizeDate(u.fetch(officerAllegation, 'end_date', ''));

  const startDateDisplay = () => {
    const start = startDate();
    return start ? start.format(AppConstants.SIMPLE_DATE_FORMAT) : '';
  };

  const endDateDisplay = () => {
    const end = endDate();
    return end ? end.format(AppConstants.SIMPLE_DATE_FORMAT) : '';
  };

  var isOpenInvestigation = () => u.fetch(officerAllegation, 'final_outcome_class', '') == 'open-investigation';

  const startInvestigatingAt = incidentDate => {
    const start = startDate();

    return start && start.isSame(incidentDate, 'day');
  };

  const haveEnoughDataForTimeline = incidentDate => !!(startDate() || incidentDate);

  const allegationNameForUrl = () => u.fetch(officerAllegation, 'cat.allegation_name', 'No category');

  const url = crid => u.format('/complaint/{crid}/{slugifiedCategory}/{categoryHashId}', {
    'crid': crid,
    'slugifiedCategory': S(allegationNameForUrl()).slugify().s,
    'categoryHashId': HashUtil.encode(u.fetch(officerAllegation, 'cat.id', 0))
  });

  return {
    allegationName: u.fetch(officerAllegation, 'cat.allegation_name', ''),
    category: u.fetch(officerAllegation, 'cat.category', 'Unknown'),
    endDateDisplay: endDateDisplay(),
    finalFinding: finalFinding(),
    finalStatus: finalStatus(),
    haveEnoughDataForTimeline,
    isOpenInvestigation: isOpenInvestigation(),
    startDateDisplay: startDateDisplay(),
    startInvestigatingAt,
    url
  };
};

export default OfficerAllegationPresenter;

