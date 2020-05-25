/* istanbul ignore file */
import { Factory } from 'rosie';
import { internet, name, random } from 'faker';


export const RawOfficerCardFactory = Factory.define('RawOfficerCardFactory')
  .sequence('id')
  .attr('full_name', name.findName)
  .attr('complaint_count', random.number)
  .attr('visual_token_background_color', internet.color)
  .attr('percentile_allegation', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_trr', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation_civilian', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation_internal', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('percentile_allegation', () => (random.number({ min: 10, max: 1000 }) / 10.0))
  .attr('kind', 'single_officer');
