import { combineReducers } from 'redux';

import aboutSection from './about-section';
import collaborateSection from './collaborate-section';
import faqSection from './faq-section';

export default combineReducers({
  aboutSection,
  collaborateSection,
  faqSection
});
