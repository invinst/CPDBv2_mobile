import { Factory } from 'rosie';


/* istanbul ignore next */
export const PinboardFactory = Factory.define('pinboard')
  .attr('id', null)
  .attr('title', () => '')
  .attr('officer_ids', () => [])
  .attr('crids', () => [])
  .attr('trr_ids', () => [])
  .attr('description', '')
  .attr('crItems', () => [])
  .attr('officerItems', () => [])
  .attr('trrItems', () => [])
  .attr('saving', () => false)
  .attr('isPinboardRestored', () => false)
  .attr('needRefreshData', () => false)
  .attr('example_pinboards', () => undefined);
