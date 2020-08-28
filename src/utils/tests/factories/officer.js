import { Factory } from 'rosie';
import { lorem, random } from 'faker';

Factory.define('BaseOfficerFactory')
  .sequence('id')
  .attr('rank', 'Officer')
  .attr('fullname', () => `${name.firstName} ${name.lastName}`)
  .attr('complaintCount', () => random.number())
  .attr('sustainedCount', () => random.number())
  .attr('finding', () => lorem.word())
  .attr('outcome', () => lorem.word())
  .attr('recommendedOutcome', () => lorem.word())
  .attr('allegationPercentile', 99)
  .attr('birthYear', 1970)
  .attr('race', 'white')
  .attr('percentile', () => ({
    items: [
      { axis: 'Use of Force Reports', value: Math.random() * 100 },
      { axis: 'Officer Allegations', value: Math.random() * 100 },
      { axis: 'Civilian Allegations', value: Math.random() * 100 },
    ],
    visualTokenBackground: '#f5f4f4',
    textColor: '#231F20',
  }));

export const InvolvedOfficerFactory = Factory.define('InvolvedOfficerFactory')
  .extend('BaseOfficerFactory')
  .attr('totalLawsuitSettlements', () => random.number())
  .attr('lawsuitCount', () => random.number());
