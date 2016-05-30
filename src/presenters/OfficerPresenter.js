import pluralize from 'pluralize';
import S from 'string';
import AppConstants from 'constants/AppConstants';
import u from 'utils/HelperUtil';
import CollectionUtil from 'utils/CollectionUtil';
import GenderPresenter from 'presenters/GenderPresenter';


const OfficerPresenter = officer => {
  const displayName = () => {
    const officerFirst = u.fetch(officer, 'officer_first', '');
    const officerLast = u.fetch(officer, 'officer_last', '');

    return [officerFirst, officerLast].join(' ');
  };

  const id = () => u.fetch(officer, 'id', '').toString();

  const race = () => u.fetch(officer, 'race', 'Race unknown');

  const gender = () => GenderPresenter(u.fetch(officer, 'gender')).humanReadable;

  const description = () => u.format('{gender} ({race})', {'gender': gender(), 'race': race()});

  const badge = () => u.fetch(officer, 'star', 'Unknown');

  const unit = () => {
    const unitCode = u.fetch(officer, 'unit', '');
    return u.fetch(AppConstants.UNITS, unitCode, 'Unknown');
  };

  const rank = () => {
    const rankCode = u.fetch(officer, 'rank', '');
    return u.fetch(AppConstants.RANKS, rankCode, 'Unknown');
  };

  const joinedDate = () => u.fetch(officer, 'appt_date', 'Unknown');

  const allegationsCount = () => u.fetch(officer, 'allegations_count', -1);

  const has = (officer, field) => !!u.fetch(officer, field, false);

  const hasDataIn = (officer, field, collection) => {
    const datum = u.fetch(officer, field, false);
    return (collection.indexOf(datum) > 0);
    return (collection.indexOf(datum) > 0);
  };

  const hasData = label => {
    const field = AppConstants.OFFICER_SUMMARY_MAP[label];
    const checkers = {
      'race': has(officer, field),
      'unit': hasDataIn(officer, field, Object.keys(AppConstants.UNITS)),
      'rank': has(officer, field),
      'appt_date': has(officer, field),
      'gender': has(officer, field)
    };

    return checkers[field];
  };

  const hasSummarySection = () => {
    const labels = Object.keys(AppConstants.OFFICER_SUMMARY_MAP);
    const summarySectionData = labels.map(label => hasData(label));
    return CollectionUtil.any(summarySectionData);
  };

  const coAccusedWith = numberOfCoAccusedOfficers => {
    const theOthers = pluralize('other', numberOfCoAccusedOfficers, true);
    const withSomeOfficers = u.format(' and {theOthers}', {'theOthers': theOthers});
    const withNoOfficer = '';

    const coAccusedInformation = numberOfCoAccusedOfficers ? withSomeOfficers : withNoOfficer;

    return u.format('{officerName} {coAccusedInformation}',
      {
        'officerName': displayName(),
        'coAccusedInformation': coAccusedInformation
      }).trim();
  };

  const url = () => {
    const template = '/officer/{slug}/{pk}';

    return u.format(template, {
      'slug': S(displayName()).slugify().s,
      'pk': id()
    });
  };

  return {
    id: id(),
    badge: badge(),
    displayName: displayName(),
    description: description(),
    gender: gender(),
    race: race(),
    unit: unit(),
    rank: rank(),
    joinedDate: joinedDate(),
    allegationsCount: allegationsCount(),
    hasData,
    hasSummarySection: hasSummarySection(),
    coAccusedWith,
    url: url()
  };
};

export default OfficerPresenter;
