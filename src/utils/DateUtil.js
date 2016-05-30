import moment from 'moment';
import AppConstants from 'constants/AppConstants';


const DateUtil = {
  sanitizeDate(date, inputFormat) {
    let momentDate;
    inputFormat = inputFormat || AppConstants.SIMPLE_SERVER_DATE_FORMAT;

    momentDate = moment(date, inputFormat);

    return momentDate.isValid() ? momentDate : null;
  }
};

export default DateUtil;
