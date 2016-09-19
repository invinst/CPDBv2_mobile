import Hashids from 'hashids';
import AppConstants from 'constants';
export default new Hashids(AppConstants.SALT, 8);
