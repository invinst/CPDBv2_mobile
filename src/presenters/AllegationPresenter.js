import u from 'utils/HelperUtil';
import DateUtil from 'utils/DateUtil';
import AppConstants from 'constants/AppConstants';


const AllegationPresenter = complaint => {
  const incidentDate = () => DateUtil.sanitizeDate(u.fetch(complaint, 'incident_date', ''));

  const incidentDateDisplay = () => {
    const date = incidentDate();
    return date ? date.format(AppConstants.SIMPLE_DATE_FORMAT) : 'Unknown date';
  };

  const add1 = () => u.fetch(complaint, 'add1', '');

  const add2 = () => u.fetch(complaint, 'add2', '');

  const crid = () => u.fetch(complaint, 'crid', 'Unknown');

  const address = () => [add1(), add2()].join(' ').trim();

  const locationType = () => u.fetch(complaint, 'location', '');

  const url = () => u.format('/complaint/{crid}', { 'crid': crid() });

  const hasLocation = () => u.hasAnyProperties(complaint, ['beat', 'location', 'add1', 'add2', 'city', 'point']);

  const hasFullAddress = () => !!(add1() && add2());

  const documents = () => u.fetch(complaint, 'documents', []);

  return {
    crid: crid(),
    incidentDate: incidentDate(),
    incidentDateDisplay: incidentDateDisplay(),
    address: address(),
    city: u.fetch(complaint, 'city', ''),
    locationType: locationType(),
    beat: u.fetch(complaint, 'beat.name', ''),
    documents: documents(),
    hasLocation: hasLocation(),
    hasFullAddress: hasFullAddress(),
    url: url()
  };
};

export default AllegationPresenter;
