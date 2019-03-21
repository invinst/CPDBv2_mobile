import { Factory } from 'rosie';


/* istanbul ignore next */
export const PinboardFactory = Factory.define('pinboard')
  .attr('id', null)
  .attr('title', () => '')
  .attr('officer_ids', () => [])
  .attr('crids', () => [])
  .attr('description', '');

/* istanbul ignore next */
export const OwnedPinboardFactory = Factory.define('pinboard')
  .attr('id', null)
  .attr('title', () => '')
  .attr('officer_ids', () => [])
  .attr('crids', () => [])
  .attr('description', '')
  .attr('ownedByCurrentUser', false);
