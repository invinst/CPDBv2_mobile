import { find } from 'lodash';
import moment from 'moment';


export const getRichTextValueAsArray = (report, fieldName) => {
  const field = find(report.fields, { 'type': 'rich_text', 'name': fieldName });
  if (!field) {
    return [];
  }
  return field.value.blocks.map((block) => block.text);
};


export const getStringValue = (report, fieldName) => {
  const field = find(report.fields, { 'type': 'string', 'name': fieldName });
  if (!field) {
    return '';
  }
  return field.value;
};


export const getDateValueAsString = (report, fieldName) => {
  const field = find(report.fields, { 'type': 'date', 'name': fieldName });
  if (!field) {
    return '';
  }
  return moment(field.value).format('MMM D, YYYY');
};
