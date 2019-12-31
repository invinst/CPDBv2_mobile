import { extractPercentile } from 'selectors/common/percentile';
import { getCurrentAge } from 'utils/date';


export const officerCardTransform = card => {
  const age = card['birth_year'] ? getCurrentAge(card['birth_year']) : 'N/A';
  return {
    id: card['id'],
    officerId: card['id'],
    fullName: card['full_name'],
    complaintCount: card['complaint_count'],
    sustainedCount: card['sustained_count'],
    age: age,
    race: card['race'],
    gender: card['gender'],
    percentile: extractPercentile(card['percentile']),
    rank: card['rank'],
  };
};
