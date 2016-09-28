import { combineReducers } from 'redux';

import vftgSection from './vftg-section';
import aboutSection from './about-section';
import collaborateSection from './collaborate-section';
import faqSection from './faq-section';

export default combineReducers({
  vftgSection,
  aboutSection,
  collaborateSection,
  faqSection
});
