import { combineReducers } from 'redux';

import vftgSection from './vftg-section';
import aboutSection from './about-section';
import collaborateSection from './collaborate-section';

export default combineReducers({
  vftgSection,
  aboutSection,
  collaborateSection
});
