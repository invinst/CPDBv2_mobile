import Hashids from 'hashids';
import AppConstants from 'constants/AppConstants';
export default new Hashids(AppConstants.SALT, 8);
