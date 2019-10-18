/* istanbul ignore file */
import { date, random } from 'faker';
import moment from 'moment';


export const dateGenerator = () => (moment(date.past()).format('YYYY-MM-DD'));
export const percentileGenerator = () => (random.number({ min: 10, max: 1000 }) / 10.0);
