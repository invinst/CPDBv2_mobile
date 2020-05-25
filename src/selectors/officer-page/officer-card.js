import { extractLatestPercentile } from 'selectors/common/percentile';


export const officerCardTransform = card => ({
  id: card['id'],
  officerId: card['id'],
  fullName: card['full_name'],
  percentile: extractLatestPercentile(card),
  rank: card['rank'],
});
