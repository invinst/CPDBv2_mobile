import { find } from 'lodash';
import moment from 'moment';


export const getRichTextValueAsArray = (data, fieldName) => {
  const field = find(data.fields, { 'type': 'rich_text', 'name': fieldName });
  if (!field) {
    return [];
  }
  return field.value.blocks.map((block) => block.text);
};


export const getStringValue = (data, fieldName) => {
  const field = find(data.fields, { 'type': 'string', 'name': fieldName });
  if (!field) {
    return '';
  }
  return field.value;
};


export const getDateValueAsString = (data, fieldName) => {
  const field = find(data.fields, { 'type': 'date', 'name': fieldName });
  if (!field) {
    return '';
  }
  return moment(field.value).format('MMM D, YYYY');
};
